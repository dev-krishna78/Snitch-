import { RouterProvider } from "react-router"
import { routes } from "./app.router"

function App() {

  return (
    <>
     <RouterProvider router={routes}/>
    </>
  )
}

export default App
