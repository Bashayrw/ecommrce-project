import jwt from "jwt-decode"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import api from "@/api"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { EditDialog } from "@/components/ui/editDialog"
import { Input } from "@/components/ui/input"
import { NavBar } from "@/components/ui/navbar"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Category, Product, User } from "@/types"
import { Link, useNavigate } from "react-router-dom"
import { Footer } from "@/components/component/footer"
import { BellIcon, Package2Icon, PackageIcon, UsersIcon } from "lucide-react"

export function Dashboard() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [product, setProduct] = useState({
    name: "",
    categoryId: "",
    image: "",
    price: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProduct({
      ...product,
      [name]: value
    })
  }

  const postProduct = async () => {
    try {
      const res = await api.post("/products", product)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const deleteProduct = async (productId: string) => {
    try {
      const res = await api.delete(`/products/${productId}`)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const handleDeleteProduct = async (productId: string) => {
    await deleteProduct(productId)
    queryClient.invalidateQueries({ queryKey: ["products"] })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await postProduct()
    queryClient.invalidateQueries({ queryKey: ["products"] })
  }

  const getProducts = async () => {
    try {
      const res = await api.get("/products")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const getCategories = async () => {
    try {
      const res = await api.get("/categorys")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const getUsers = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await api.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  // Queries
  const {
    isPending: userPending,
    data: users,
    error: userError
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers
  })
  const {
    isPending: catPending,
    data: categories,
    error: catError
  } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategories
  })
  const {
    isPending,
    data: products,
    error
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts
  })
  if (isPending) {
    return <p>Data is fetching ....</p>
  }

  const productWithCat = products?.map((product) => {
    const category = categories?.find((cat) => cat.id === product.categoryId)

    if (category) {
      return {
        ...product,
        categoryId: category.name
      }
    }
    return product
  })

  const handleSelect = (e: any) => {
    setProduct({
      ...product,
      categoryId: e.target.value
    })
  }

  return (
    <>
      <NavBar />
      <div className="flex-1" />
    
      <form className="mt-20 w-1/3 mx-auto" onSubmit={handleSubmit}>
       
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Add new product</h3>
        <Input
          name="name"
          className="mt-4"
          type="text"
          placeholder="Name"
          onChange={handleChange}
        />
        <select name="cats" onChange={handleSelect} className="mt-7 w-60 mx-auto p-2">
          {categories?.map((cat) => {
            return (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            )
          })}
        </select>
        <Input
          name="image"
          className="mt-4"
          type="text"
          placeholder="Image"
          onChange={handleChange}
        />
        <Input
          name="price"
          className="mt-4"
          type="text"
          placeholder="Price"
          onChange={handleChange}
        />
        <div className="flex justify-between">
          <Button className="mt-4" type="submit">
            enter product
          </Button>
          <Button className="mt-4" variant={"outline"} type="reset">
            reset
          </Button>
        </div>
      </form>
      <div>
        <h1 className="mt-10 mb-10">Products</h1>
        <Table>
          <TableCaption>A list of your recent products</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]"></TableHead>
              <TableHead className="text-center">Name</TableHead>
              <TableHead className="text-center">CategoryId</TableHead>
              <TableHead className="text-center">Image</TableHead>
              <TableHead className="text-center">Price</TableHead>
              <TableHead className="text-center"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productWithCat?.map((product) => (
              <TableRow key={product.stockId}>
                <TableCell className="font-medium"></TableCell>
                <TableCell className="text-center">{product.name}</TableCell>
                <TableCell className="text-center">{product.categoryId}</TableCell>
                <TableCell className="text-center">{product.image}</TableCell>
                <TableCell className="text-center">{product.price}</TableCell>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <div className="flex flex gap-4  p-4">
                      <Button variant="destructive" className="mt-auto h-auto">
                        X
                      </Button>
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure you want to delete {product.name}?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your product and
                        remove your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDeleteProduct(product.id)}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <TableCell />
                <TableCell className="text-left">
                  <EditDialog product={product} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Footer />
    </>
  )
}
