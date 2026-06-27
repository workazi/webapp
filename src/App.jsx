import { 
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements
 } from "react-router-dom"
import { Suspense, lazy } from "react"
import Registation from "./pages/Registation"

const HomePage = lazy(() => import("./pages/HomePage"))
const Contact = lazy(()=>import( "./pages/Contact") )
const About = lazy(()=>import("./pages/About"))

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<Suspense fallback={<div>Loading...</div>}><HomePage /></Suspense>} />
      <Route path="/contact" element={<Contact />}/>
      <Route path="/about" element={<About />} />
      <Route path="/register" element={<Registation />} />
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
