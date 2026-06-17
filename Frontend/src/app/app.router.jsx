import {createBrowserRouter} from "react-router"
import Register from "../feature/auth/page/Register"

export const routes = createBrowserRouter([{
   path: "/register",
   element: <Register/>

}])