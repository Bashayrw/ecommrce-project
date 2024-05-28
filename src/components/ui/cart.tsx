import { GlobalContext } from "@/App"
import { useContext } from "react"

import { Button } from "./button"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { ShoppingCart, ShoppingCartIcon } from "lucide-react"
import api from "@/api"

type Items = {
  quantity: number
  stockId: string
}

export function Cart() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("context is missing ")
  const { state, handleDeleteFromCart, handleAddToCart, handleRemoveCart } = context

  const groups = state.cart.reduce((acc, obj) => {
    const key = obj.stockId
    const curGroup = acc[key] ?? []
    return { ...acc, [key]: [...curGroup, obj] }
  }, {})

  const total = state.cart.reduce((acc, curr) => {
    return acc + curr.price
  }, 0)


  const items = []

  Object.keys(groups).forEach((key) => {
    const products = groups[key]

    items.push({
      quantity: products.length,
      stockId: key
    })
  })


  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await api.post("/ordercheckouts/checkout", items, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (res.status === 201) {
        handleRemoveCart()
      }
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  return (
    // <Popover>
    //   <PopoverTrigger asChild>
    //     <div className="flex gap-1">
    //       <ShoppingCart className="w-10" />
    //       <span>({Object.keys(groups).length})</span>
    //     </div>
    //   </PopoverTrigger>
    //   <PopoverContent className="w-90">
    //     <div>
    //       {Object.keys(groups).map((key) => {
    //         const products = groups[key]
    //         const product = products[0]

    //         const total = products.reduce((acc, curr) => {
    //           return acc + curr.price
    //         }, 0)

    //         return (
    //           <div className="mb-4 flex items-center gap-4" key={product.stockId}>
    //             <img src={product.image} alt={product.name} className="w-10 h-10 object-contain" />
    //             <h4>{product.name}</h4>
    //             <span className="font-bold">{total}</span>
    //             <span className="font-bold">({products.length})</span>
    //             <Button variant="ghost" onClick={() => handleDeleteFromCart(product.id)}>
    //               -
    //             </Button>
    //             <Button variant="ghost" onClick={() => handleAddToCart(product)}>
    //               +
    //             </Button>
    //           </div>
    //         )
    //       })}
    //       <span>Total Price: {total}</span>
    //       <Button onClick={handleCheckout}>Checkout order</Button>
    //     </div>
    //   </PopoverContent>
    // </Popover>

    <div className="fixed top-4 right-4 z-50 mt-20 ">
      <Popover>
        <PopoverTrigger asChild>
          <Button className="rounded-full" size="icon" variant="outline">
            <ShoppingCartIcon className="h-6 w-6" />
            <span className="sr-only">Open cart</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-light font-bold">Your Cart</h3>
            <span className="text-gray-500 dark:text-gray-400">3 items</span>
          </div>
          <div className="space-y-4 w-90">
            <div className="grid grid-cols-[64px_1fr_64px] items-center gap-4 w-90">
              <div>
                {Object.keys(groups).map((key) => {
                  const products = groups[key]
                  const product = products[0]

                  const total = products.reduce((acc: any, curr: any) => {
                    return acc + curr.price
                  }, 0)

                  return (
                    <div className="mb-4 flex items-center gap-4" key={product.stockId}>
                      <img
                        alt={product.name}
                        src={product.image}
                        className="w-20 h-20 object-contain"
                      />

                      <Button variant="ghost" onClick={() => handleAddToCart(product)}>
                        +
                      </Button>
                      <span className="font-medium">({products.length})</span>
                      <Button variant="ghost" onClick={() => handleDeleteFromCart(product.id)}>
                        -
                      </Button>
                    </div>
                  )
                })}
              </div>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 font-light font-bold mb-5">
                Total Price: {total}
              </p>
              <Button className="font-medium" onClick={handleCheckout}>
                Checkout Order
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
