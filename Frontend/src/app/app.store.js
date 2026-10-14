import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/auth/state/auth.slice.js"
import productReducer from "../feature/products/state/product.slice.js"
import cartReducer from "../feature/cart/state/cart.slice.js"


export const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
        cart: cartReducer
    }
})