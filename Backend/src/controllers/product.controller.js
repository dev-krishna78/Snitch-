import productModel from "../models/product.model.js";
import { uploadFile } from "../services/storage.services.js";

export async function createProduct(req, res) {
  const { title, description, priceCurrency, priceAmount } = req.body;
  const seller = req.user;
  console.log(seller);

  const images = await Promise.all(
    req.files.map(async (file) => {
      return await uploadFile({
        buffer: file.buffer,
        fileName: file.originalname,
      });
    }),
  );

  const product = await productModel.create({
    title,
    description,
    price: {
      amount: priceAmount,
      currency: priceCurrency,
    },
    images,
    seller: seller._id,
  });
  console.log(product.title);
  res.status(201).json({
    message: "Product created successfully",
    success: true,
    product,
  });
}

export async function getsellerProducts(req, res) {
  const seller = req.user;

  const products = await productModel.find({ seller: seller._id });

  res.status(200).json({
    message: "products fetched sucessfully ",
    success: true,
    products,
  });
}

export async function getAllData(req, res) {
  try {
    const products = await productModel.find();

    return res.status(200).json({
      message: "All products fetched successfully",
      success: true,
      products,
    });
  } catch (error) {
    throw new Error("error is " + { error });
  }
}

export async function getProductDetails(req, res) {
  // support id from route params, query string, or malformed query key like ":id"
  const id = req.params.id || req.query.id || req.query[":id"];

  if (!id) {
    return res.status(400).json({
      message: "Product id is required",
      success: false,
    });
  }

  const product = await productModel.findById(id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
      success: false,
    });
  }

  return res.status(200).json({
    message: "Product details fetched successfully",
    success: true,
    product,
  });
}

export async function addProductVariant(req, res) {
  const productId = req.params.productId;

  const product = await productModel.findOne({
    _id: productId,
    seller: req.user._id,
  });
  if (product) console.log("product mil gaya " + product);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
      success: false,
    });
  }

  const files = req.files;
  let images = [];

  // helper to add a timeout to uploads to avoid hanging requests
  const uploadWithTimeout = (file, timeout = 30000) => {
    return Promise.race([
      uploadFile({ buffer: file.buffer, fileName: file.originalname }),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Upload timeout')), timeout)),
    ]);
  };

  if (files && files.length !== 0) {
    try {
      images = await Promise.all(files.map((file) => uploadWithTimeout(file)));
    } catch (err) {
      console.error('Error uploading variant images:', err);
      return res.status(500).json({ message: 'Failed to upload images', success: false, error: err.message });
    }
  }

  const price = req.body.priceAmount;
  const stock = req.body.stock;
  let attributes = {};
  try {
    attributes = JSON.parse(req.body.attributes || "{}");
  } catch (err) {
    return res.status(400).json({ message: "Invalid attributes JSON" });
  }

  console.log(price);

  const newVariant = {
    images,
    price: {
      amount: Number(price) || product.price.amount,
      currency: req.body.priceCurrency || product.price.currency,
    },
    stock,
    attributes,
  };

  // push to the product instance in-memory and persist via update
  product.variants.push(newVariant);

  try {
    await productModel.updateOne({ _id: productId, seller: req.user._id }, { $push: { variants: newVariant } });
  } catch (err) {
    console.error('Error saving variant to DB:', err);
    return res.status(500).json({ message: 'Failed to save variant', success: false, error: err.message });
  }

  return res.status(200).json({
    message: "Product variant added successfully",
    success: true,
    product,
  });
}
