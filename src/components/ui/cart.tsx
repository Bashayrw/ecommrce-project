import { GlobalContext } from "@/App"
import { useContext } from "react"

import { Button } from "./button"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { ShoppingCart } from "lucide-react"

export function Cart() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("context is missing ")
  const { state, handleDeleteFromCart } = context
  return (
    <Popover>
      <PopoverTrigger asChild>
        <ShoppingCart className="w-10" />
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div>
          {state.cart.map((product) => {
            return (
              <div className="mb-4 flex items-center gap-4" key={product.id}>
                <img src={product.image} alt={product.name} className="w-10 h-10 object-contain" />
                <h4>{product.name}</h4>
                <span className="font-bold">{product.price}</span>
                <Button
                  variant="outline"
                  className="h-10 px-5 m-2 text-red-100 transition-colors duration-150 bg-red-700 rounded-lg focus:shadow-outline hover:bg-red-800"
                  onClick={() => handleDeleteFromCart(product.id)}
                >
                  X
                </Button>
              </div>
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}
