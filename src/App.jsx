import { 
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements
 } from "react-router-dom"
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>

    </Route>
  )
)
function App() {
  <>
    <RouterProvider router={router} />
  </>
}

export default App
