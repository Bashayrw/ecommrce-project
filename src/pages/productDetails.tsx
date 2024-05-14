import api from "@/api"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

export function ProductDetails() {
  const { id } = useParams<string>()
  console.log("id in product details ", id)

  // const id = useParams().id

  // write a function called getProductById(id)

  const getProductById = async (id: string | undefined) => {
    try {
      const res = await api.get(`/products/${id}`)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const { data, isPending, isError } = useQuery({
    queryKey: ["products", id],
    queryFn: () => getProductById(id)
  })
  console.log("data in product details", data)

  if (isPending) {
    return <p>Loading</p>
  }
  if (isError) {
    return <p>Error happens</p>
  }

  return (
    <div>
      <h1>jfgfn</h1>
    </div>
  )
}
