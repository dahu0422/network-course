import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import { CitiesProvider } from "../contexts/CitiesContext.jsx"

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

export default function App() {
  return (
    <CitiesProvider>
      <Router>
        <Routes>
          <Route index element={<HomePage />}></Route>
          <Route path="pricing" element={<Pricing />}></Route>
          <Route path="Product" element={<Product />}></Route>
          <Route path="Login" element={<Login />}></Route>
          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate replace to="cities" />}></Route>
            <Route path="cities" element={<CityList />}></Route>
            <Route path="cities/:id" element={<City />} />
            <Route path="countries" element={<CountryList />}></Route>
            <Route path="form" element={<Form />}></Route>
          </Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </Router>
    </CitiesProvider>
  )
}
