import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./App.css"

import { Home } from "./pages/home"
import { ProductDetails } from "./pages/productDetails"
import { Dashboard } from "./pages/dashboard"
import { createContext, useEffect, useState } from "react"
import { DecodedUser, Product } from "./types"
import { LogIn } from "lucide-react"
import { Login } from "./pages/login"
import { Signup } from "./pages/signup"
import { PrivateRoute } from "./components/component/privateRoute"

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
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    )
  }
])
type GlobalContextType = {
  state: GlobalState
  handleAddToCart: (product: Product) => void
  handleDeleteFromCart: (id: string) => void
  handleStoreUser: (user: DecodedUser) => void
  handleRemoveUser: () => void
}
type GlobalState = {
  cart: Product[]
  user: DecodedUser | null
}
export const GlobalContext = createContext<GlobalContextType | null>(null)

function App() {
  const [state, setState] = useState<GlobalState>({
    cart: [],
    user: null
  })

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user) {
      const decodedUser = JSON.parse(user)
      setState({
        ...state,
        user: decodedUser
      })
    }
  }, [])

  const handleDeleteFromCart = (id: string) => {
    const cart = state.cart
    const index = state.cart.findIndex((item) => item.id === id)
    cart.splice(index, 1)

    setState({
      ...state,
      cart: cart
    })
  }

  const handleStoreUser = (user: DecodedUser) => {
    setState({
      ...state,
      user: user
    })
  }
  const handleRemoveUser = () => {
    setState({
      ...state,
      user: null
    })
  }

  const handleAddToCart = (product: Product) => {
    setState({
      ...state,
      cart: [...state.cart, product]
    })
  }
  return (
    <div className="App">
      <GlobalContext.Provider
        value={{ state, handleAddToCart, handleDeleteFromCart, handleStoreUser, handleRemoveUser }}
      >
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
