import {createBrowserRouter} from "react-router"
import Register from "../feature/auth/page/Register"
import Login from "../feature/auth/page/Login"

export const routes = createBrowserRouter([
   {
      path:"/",
      element: <h1>Hello dahboard </h1>
   },
   {
   path: "/register",
   element: <Register/>

},{
   path: "/login",
   element: <Login/>
}])