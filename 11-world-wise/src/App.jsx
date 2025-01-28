import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import AppLayout from "./page/AppLayout"
import HomePage from "./page/Homepage"
import Pricing from "./page/Pricing"
import Product from "./page/Product"
import Login from "./page/Login"
import PageNotFound from "./page/PageNotFound"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<HomePage />}></Route>
        <Route path="pricing" element={<Pricing />}></Route>
        <Route path="Product" element={<Product />}></Route>
        <Route path="Login" element={<Login />}></Route>
        <Route path="app" element={<AppLayout />}>
          <Route index element={<p>List of cities</p>}></Route>
          <Route path="cities" element={<p>List of cities</p>}></Route>
          <Route path="countries" element={<p>Countries</p>}></Route>
          <Route path="form" element={<p>Form</p>}></Route>
        </Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </Router>
  )
}
