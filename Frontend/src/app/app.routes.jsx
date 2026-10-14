import { createBrowserRouter } from "react-router";
import Register from "../feature/auth/pages/Register";
import Login from "../feature/auth/pages/Login";
import CreateProduct from "../feature/products/pages/CreateProduct";
import Dashboard from "../feature/products/pages/Dashboard";
import Protected from "../feature/auth/components/Protected";
import Home from "../feature/products/pages/Home";
import ProductDetail from "../feature/products/pages/ProductDetailed";
import SellerProductDetails from "../feature/products/pages/SellerProductDetails";
import Cart from "../feature/cart/pages/Cart";
import AppLayout from "./Applayout";
import OrderSuccess from "../feature/cart/pages/OrderSucess";

export const routes = createBrowserRouter([

    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/product/:productId",
                element: <ProductDetail />
            },
            {
                path: "/cart",
                element: <Protected> <Cart /></Protected>
            },
            {
                path: "/order-success",
                element: <OrderSuccess />
            },
            {
                path: "/seller",
                children: [
                    {
                        path: "/seller/create-product",

                        element: <Protected role="seller" >
                            <CreateProduct />
                        </Protected>
                    },
                    {
                        path: "/seller/dashboard",
                        element: <Protected role="seller" >
                            <Dashboard />
                        </Protected>
                    },
                    {
                        path: "/seller/product/:productId",
                        element: <Protected role="seller" >
                            <SellerProductDetails />
                        </Protected>
                    }
                ]
            }
        ]
    }


])