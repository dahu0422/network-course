import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react"

import AppLayout from "./page/AppLayout"
import HomePage from "./page/Homepage"
import Pricing from "./page/Pricing"
import Product from "./page/Product"
import Login from "./page/Login"
import PageNotFound from "./page/PageNotFound"
import CityList from "./components/CityList"
import CountryList from "./components/CountryList"
import City from "./components/City"
import Form from "./components/Form"

const BASE_URL = "http://localhost:8000"

export default function App() {
  const [cities, setCities] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true)
        const res = await fetch(`${BASE_URL}/cities`)
        const data = await res.json()
        setCities(data)
      } catch {
        alert("There was an error fetching the data")
      } finally {
        setIsLoading(false)
      }
    }
    fetchCities()
  }, [])
  return (
    <Router>
      <Routes>
        <Route index element={<HomePage />}></Route>
        <Route path="pricing" element={<Pricing />}></Route>
        <Route path="Product" element={<Product />}></Route>
        <Route path="Login" element={<Login />}></Route>
        <Route path="app" element={<AppLayout />}>
          <Route
            index
            element={<CityList cities={cities} isLoading={isLoading} />}
          ></Route>
          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          ></Route>
          <Route path="cities/:id" element={<City />} />
          <Route
            path="countries"
            element={<CountryList cities={cities} isLoading={isLoading} />}
          ></Route>
          <Route path="form" element={<Form />}></Route>
        </Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </Router>
  )
}
