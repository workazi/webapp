import { 
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements
 } from "react-router-dom"
import { Suspense, lazy } from "react"
import Contact from "./pages/Contact"

const HomePage = lazy(() => import("./pages/HomePage"))

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<Suspense fallback={<div>Loading...</div>}><HomePage /></Suspense>} />
      <Route path="/contact" element={<Contact />}/>
    </Route>
  )
)

function App() {
  return (
    <div className="font-poppins">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
