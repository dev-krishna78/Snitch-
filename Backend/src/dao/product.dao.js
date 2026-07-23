import productModel from "../models/product.model.js";

export const stockOfVariant = async (productId, variantId) => {
    console.log(" product id to hai ..............."+productId);
    console.log("variant id bhi  hai ........."+variantId)


  const product = await productModel.findOne({
    _id: productId,
    "variants._id": variantId,
  });
  console.log(product);
  if (!product) {
    throw new Error("Product not found");
  }
  const stock = product.variants.find(
    (variant) => variant._id.toString() == variantId,
  ).stock;

  return stock;
};
