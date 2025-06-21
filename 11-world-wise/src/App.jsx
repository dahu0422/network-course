import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import ProtectedRoute from "@/pages/ProtectedRoute"
import SpinnerFullPage from "@/components/SpinnerFullPage"
import { CitiesProvider } from "@/contexts/CitiesContext"
import { AuthProvider } from "@/contexts/FakeAuthContext"

// import Homepage from "@/pages/Homepage"
// import AppLayout from "@/pages/AppLayout"
// import Product from "@/pages/Product"
// import Pricing from "@/pages/Pricing"
// import Login from "@/pages/Login"
// import PageNotFound from "@/pages/PageNotFound"

// dist/index.html                   0.45 kB │ gzip:   0.28 kB
// dist/assets/index-Bhx5s-hJ.css   30.23 kB │ gzip:   5.03 kB
// dist/assets/index-BCvm0uVU.js   413.51 kB │ gzip: 122.33 kB

const Homepage = lazy(() => import("@/pages/Homepage"))
const AppLayout = lazy(() => import("@/pages/AppLayout"))
const Product = lazy(() => import("@/pages/Product"))
const Pricing = lazy(() => import("@/pages/Pricing"))
const Login = lazy(() => import("@/pages/Login"))
const PageNotFound = lazy(() => import("@/pages/PageNotFound"))

// dist/index.html                           0.45 kB │ gzip:   0.28 kB
// dist/assets/Logo-BYigXoGP.css             0.03 kB │ gzip:   0.05 kB
// dist/assets/Login-B5O0XBJ4.css            0.35 kB │ gzip:   0.22 kB
// dist/assets/Product-ftt4lYil.css          0.47 kB │ gzip:   0.27 kB
// dist/assets/Homepage-DU-CjQIG.css         0.50 kB │ gzip:   0.30 kB
// dist/assets/PageNav-CcPXYRy9.css          0.51 kB │ gzip:   0.28 kB
// dist/assets/AppLayout-BONGKfg9.css        1.91 kB │ gzip:   0.70 kB
// dist/assets/index-Bhlkpiiv.css           26.58 kB │ gzip:   4.35 kB
// dist/assets/Product.module-Be8LLB42.js    0.06 kB │ gzip:   0.07 kB
// dist/assets/PageNotFound-DdtK8Cf2.js      0.15 kB │ gzip:   0.15 kB
// dist/assets/Logo-B9gGMidO.js              0.21 kB │ gzip:   0.19 kB
// dist/assets/PageNav-BOboahe4.js           0.49 kB │ gzip:   0.27 kB
// dist/assets/Pricing-C0vKSzTA.js           0.65 kB │ gzip:   0.42 kB
// dist/assets/Homepage-4hNHsQ9A.js          0.66 kB │ gzip:   0.42 kB
// dist/assets/Product-Dwif7N_0.js           0.85 kB │ gzip:   0.48 kB
// dist/assets/Login-CJuZzPTI.js             1.01 kB │ gzip:   0.54 kB
// dist/assets/AppLayout-rJoV66SU.js         7.47 kB │ gzip:   2.89 kB
// dist/assets/index-CA7xi9iE.js           405.20 kB │ gzip: 119.62 kB

import CityList from "@/components/CityList"
import City from "@/components/City"
import CountryList from "@/components/CountryList"
import Form from "@/components/Form"

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="/product" element={<Product />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  )
}

export default App
