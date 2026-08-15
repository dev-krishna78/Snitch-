import express from "express"
import { authenticateUser } from "../middleware/auth.middleware.js";
import { validateAddToCart , validateIncrementCartItemQuantity } from "../validators/cart.validate.js";
import { addToCart , removeFromCart,getCart ,incrementCartItem } from "../controllers/cart.controller.js";
const router = express.Router()

/**
 * @route /api/cart/add/:productId/variantId
 * @description Add item in the cart 
 * @access  Private 
 * @argument ProductId id of the product
 * @argument variantId id of the variant 
 *  */ 
router.post("/incrementCartProduct/:productId/:variantId",authenticateUser,validateAddToCart,addToCart)

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

/**
 * @route GET /api/cart
 * @desc Get user's cart
 * @access Private
 */
router.post("/quantity/increment/:productId/:variantId", authenticateUser, validateIncrementCartItemQuantity, incrementCartItem)

export default router;