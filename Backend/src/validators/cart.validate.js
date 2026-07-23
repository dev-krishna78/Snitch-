import {param , body , validationResult} from "express-validator"

const validateRequest = async(req,res, next)=>{

   const errors = validationResult(req);
   if(!errors.isEmpty()){
       return res.status(400).json({errors: error.array()})
   }

   next();
}

export const validateAddToCart =[
    param("productId").isMongoId().withMessage("Invalid product id "),
    param("variantId").optional().isMongoId().withMessage("Invalid variant id"),
    body("quantity").optional().isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
    validateRequest
];

export const validateIncrementCartItemQuantity = [
    param("productId").isMongoId().withMessage("Invalid product ID"),
    param("variantId").optional().isMongoId().withMessage("Invalid variant ID"),
    validateRequest
];

