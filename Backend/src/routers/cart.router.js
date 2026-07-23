import express from "express"
import { authenticateUser } from "../middleware/auth.middleware.js";
import { validateAddToCart } from "../validators/cart.validate.js";
import { addToCart , removeFromCart,getCart } from "../controllers/cart.controller.js";
const router = express.Router()

/**
 * @route /api/cart/add/:productId/variantId
 * @description Add item in the cart 
 * @access  Private 
 * @argument ProductId id of the product
 * @argument variantId id of the variant 
 *  */ 
router.post("/add/:productId/:variantId",authenticateUser,validateAddToCart,addToCart)

/**
 * @route /api/cart/remove /:productId/variantId
 * @description remove  item in the cart 
 * @access  Private 
 * @argument ProductId id of the product
 * @argument variantId id of the variant 
 *  */
router.delete("/remove/:productId/:variantId",authenticateUser,validateAddToCart,removeFromCart)

/**
 * @route GET /api/cart
 * @desc Get user's cart
 * @access Private
 */
router.get('/', authenticateUser, getCart)

export default router;