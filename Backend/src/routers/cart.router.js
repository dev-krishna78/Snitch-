import express from "express"
import { authenticateUser } from "../middleware/auth.middleware.js";
import { validateAddToCart } from "../validators/cart.validate.js";
import { addToCart } from "../controllers/cart.controller.js";
const router = express.Router()

/**
 * @route /api/cart/add/:productId/variantId
 * @description Add item in the cart 
 * @access  Private 
 * @argument ProductId id of the product
 * @argument variantId id of the variant 
 *  */ 
router.post("/:productId/:variantId",authenticateUser,validateAddToCart,addToCart)

export default router;