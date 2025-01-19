import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import HomePage from "./page/HomePage"
import Pricing from "./page/Pricing"
import Product from "./page/Product"
import PageNotFound from "./page/PageNotFound"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="pricing" element={<Pricing />}></Route>
        <Route path="Product" element={<Product />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </Router>
  )
}
