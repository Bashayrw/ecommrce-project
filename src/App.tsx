import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Home } from "./pages/home"


import "./App.css"

import { ProductDetails } from "./pages/productDetails"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/products/:id ",
    element: <ProductDetails />
  }
])


// create a roiuter for product detail page 
// /products/:productId 
// in Home page, in the Button View Details, should apply Link to go the products/productId page
// inside productDetails, apply useParams() to get productId 


function App() {
 
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
