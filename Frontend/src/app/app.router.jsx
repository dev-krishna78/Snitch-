import {createBrowserRouter} from "react-router"
import Register from "../feature/auth/page/Register"
import Login from "../feature/auth/page/Login"

export const routes = createBrowserRouter([{
   path: "/register",
   element: <Register/>

},{
   path: "/login",
   element: <Login/>
}])