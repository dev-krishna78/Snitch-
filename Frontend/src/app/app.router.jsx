import {createBrowserRouter} from "react-router"
import Register from "../feature/auth/page/Register"
import Login from "../feature/auth/page/Login"
import CreateProduct from "../feature/product/pages/CreateProduct"
import Dashboard from "../feature/product/pages/Dashboard"
import Protected from "../feature/auth/component/Protected"

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
},
   {
      path:"/seller",
      children:[
         {
            path:"/seller/create-product",
            element: <Protected role="seller">
               <CreateProduct/>
            </Protected>

         },{
            path: "/seller/dashboard",
            element: <Protected role="seller">
               <Dashboard/>
            </Protected>
         }
      ]
   }
   ])