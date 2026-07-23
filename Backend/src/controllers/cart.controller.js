import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";
import { stockOfVariant } from "../dao/product.dao.js";
import mongoose from "mongoose";


export async function addToCart(req, res) {
  const { productId, variantId } = req.params;
  const { quantity = 1 } = req.body;

  const product = await productModel.findById({
    _id: productId,
    "variant._id": variantId,
  });

  if (!product) {
    return res.status(400).json({
      message: "product or variant not found ",
      sucess: false,
    });
  }

  const stock = await stockOfVariant(productId, variantId);
 
  if (!req.user || !req.user._id) {
  throw new Error("User not authenticated");
}

  const cart = await cartModel.findOne({ user: new mongoose.Types.ObjectId(req.user._id) }) 
           || await cartModel.create({ user: new mongoose.Types.ObjectId(req.user._id) });


  const isProductAlreadyInCart = cart.items.some(
    (item) =>
      item.product.toString() === productId &&
      item.variant?.toString() === variantId,
  );

  if (isProductAlreadyInCart) {
    const quantityInCart = cart.items.find(
      (item) =>
        item.product.toString() === productId &&
        item.variant.toString() === variantId,
    ).quantity;

    if(quantityInCart + quantity > stock){
        return res.status(404).json({
            message: `only ${stock} left in stock. in your cart already ${quantityInCart} item in your cart `,
            sucess: false
        })
    }
    
    await cartModel.findOneAndUpdate(
      {user: req.user._id , "items.product": productId, "items.variant": variantId},
      {$inc: {"items.$.quantity": quantity}},
      {new : true }
    )
    
    return res.status(200).json({
      message: "cart update sucessfully",
      sucess: true 
    })
    
  }
  if(quantity > stock){
     return res.status(400).json({
        message :`only ${stock} is left  in stock`,
     sucess: false
    })
  }

  cart.items.push({
    product:productId,
    variant: variantId,
    quantity,
    price: product.price 
  })

  await cart.save()

   return res.status(200).json({
    message: "product add in cart sucessfully ",
    sucess: true 
  })
}


