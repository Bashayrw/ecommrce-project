import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./App.css"

import { Home } from "./pages/home"
import { ProductDetails } from "./pages/productDetails"
import { Dashboard } from "./pages/dashboard"
import { createContext, useState } from "react"
import { Product } from "./types"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/products/:id",
    element: <ProductDetails />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  }
])
type GlobalContextType = {
  state: GlobalState
  handleAddToCart: (product: Product) => void
  handleDeleteFromCart: (id: string) => void
}
type GlobalState = {
  cart: Product[]
}
export const GlobalContext = createContext<GlobalContextType | null>(null)

function App() {
  const [state, setState] = useState<GlobalState>({
    cart: []
  })

  const handleDeleteFromCart = (id: string) => {
    const filteredCart = state.cart.filter((item) => item.id !== id)

    setState({
      ...state,
      cart: filteredCart
    })
  }

  const handleAddToCart = (product: Product) => {
    const isDuplicated = state.cart.find((cartItem) => cartItem.id === product.id)
    if (isDuplicated) return

    setState({
      ...state,
      cart: [...state.cart, product]
    })
  }
  return (
    <div className="App">
      <GlobalContext.Provider value={{ state, handleAddToCart, handleDeleteFromCart }}>
        <RouterProvider router={router} />
      </GlobalContext.Provider>
    </div>
  )
}

export default App

// create a roiuter for product detail page
// /products/:productId
// in Home page, in the Button View Details, should apply Link to go the products/productId page
// inside productDetails, apply useParams() to get productId
