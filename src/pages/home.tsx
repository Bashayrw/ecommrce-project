import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useContext, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import api from "@/api"

import * as React from "react"
import { Product } from "@/types"
import { NavBar } from "@/components/ui/navbar"
import { GlobalContext } from "@/App"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Home() {
  const [searchParams, setSerachParams] = useSearchParams()
  const defualtSearch = searchParams.get("searchBy") || ""

  const [searchBy, setSearchBy] = useState(defualtSearch)
  const queryClient = useQueryClient()

  const context = useContext(GlobalContext)
  if (!context) throw Error("context is missing ")
  const { handleAddToCart } = context

  const getProducts = async () => {
    try {
      const res = await api.get(`/products?searchBy=${searchBy}`)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  // Queries
  const { isPending, data, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts
  })
  if (isPending) {
    return <p>Data is fetching ....</p>
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchBy(value)
    setSerachParams({
      ...searchParams,
      searchBy: value
    })
  }
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    queryClient.invalidateQueries({ queryKey: ["products"] })
  }
  return (
    <>
      <NavBar></NavBar>
      <div>
        <form onSubmit={handleSearch} className="flex gap-4 w-full md:w-1/2 mx-auto mb-10">
          <Input
            type="search"
            placeholder="Search for a product"
            onChange={handleChange}
            value={searchBy}
          />
          <Button type="submit">Search</Button>
        </form>
      </div>
      <h1 className="text-2xl uppercase mb-10">Products</h1>
      <section className="flex flex-wrap flex-col md:flex-row gap-4 justify-between max-w-6xl mx-auto">
        {data?.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-sm mx-auto"
          >
            <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
              <img
                alt="Product Image"
                className="object-cover w-full h-full object-contain"
                height="300"
                src={product.image} //"/placeholder.svg"
                style={{
                  aspectRatio: "400/300",
                  objectFit: "cover"
                }}
                width="400"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <div className="flex items-center mb-2">
                <span className="text-2xl font-bold mr-2">{product.price}</span>
                <span className="text-gray-500 text-sm line-through">$149.99</span>
              </div>
              <p className="text-gray-600 mb-4">details</p>
              <Button className="w-full" onClick={() => handleAddToCart(product)}>
                Add to cart
              </Button>
              <Link to={`products/${product.id}`}>View Details</Link>
            </div>
          </div>
        ))}
      </section>
      {error && <p className="text-red-500">{error.message}</p>}
    </>
  )
}

// use Link in react router dom
// useParams() to get the id of product
