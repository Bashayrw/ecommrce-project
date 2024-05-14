import api from "@/api"
import { NavBar } from "@/components/ui/navbar"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import * as React from "react"
import { Product } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"


export function Home() {
  const getProducts = async () => {
    try {
      const res = await api.get("/products")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  // Queries
  const {isPending,  data, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts
  })
  if(isPending)
    {
        return <p>Data is fetching ....</p>
    }
  return (
    <>
      <NavBar></NavBar>
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
                className="object-cover w-full h-full"
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
              <Link to={`products/${product.id}`} >View Details</Link>
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
