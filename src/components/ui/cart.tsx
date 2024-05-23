import { GlobalContext } from "@/App"
import { useContext } from "react"

import { Button } from "./button"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { ShoppingCart } from "lucide-react"

export function Cart() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("context is missing ")
  const { state, handleDeleteFromCart, handleAddToCart } = context

  const groups = state.cart.reduce((acc, obj) => {
    const key = obj.id
    const curGroup = acc[key] ?? []
    return { ...acc, [key]: [...curGroup, obj] }
  }, {})

  const total = state.cart.reduce((acc, curr) => {
    return acc + curr.price
  }, 0)

  // "stockId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  // "quantity": 0

  const checkoutOrder = {
    stockId: "",
    quantity: 0
  }
  console.log("ordercheckout:", checkoutOrder)

  // Object.keys(groups).forEach(key=>{
  //   const products = groups[key]
  //   checkoutOrder.items.push({
  //     quantity: products.length,

  //   })

  // })

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex gap-1">
          <ShoppingCart className="w-10" />
          <span>({Object.keys(groups).length})</span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-90">
        <div>
          {Object.keys(groups).map((key) => {
            const products = groups[key]
            const product = products[0]

            const total = products.reduce((acc, curr) => {
              return acc + curr.price
            }, 0)

            return (
              <div className="mb-4 flex items-center gap-4" key={product.id}>
                <img src={product.image} alt={product.name} className="w-10 h-10 object-contain" />
                <h4>{product.name}</h4>
                <span className="font-bold">{total}</span>
                <span className="font-bold">({products.length})</span>
                <Button variant="ghost" onClick={() => handleDeleteFromCart(product.id)}>
                  -
                </Button>
                <Button variant="ghost" onClick={() => handleAddToCart(product)}>
                  +
                </Button>
              </div>
            )
          })}
          <span>Total Price: {total}</span>
        </div>
      </PopoverContent>
    </Popover>
  )
}
