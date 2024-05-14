import api from "@/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export function Dashboard (){
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
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      await postProduct()
      queryClient.invalidateQueries({ queryKey: ["products"] })
    }
    return (
        <form className="mt-20 w-1/3 mx-auto" onSubmit={handleSubmit}>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Add new product</h3>
        <Input
          name="name"
          className="mt-4"
          type="text"
          placeholder="Name"
          onChange={handleChange}
        />
        <Input
          name="categoryId"
          className="mt-4"
          type="text"
          placeholder="Category Id"
          onChange={handleChange}
        />
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
    )
}