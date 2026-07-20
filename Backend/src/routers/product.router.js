import express from "express";
import { authenticateSeller } from "../middleware/auth.middleware.js";
import { createProductValidator } from "../validators/product.validator.js";
import {
  createProduct,
  getsellerProducts,
  getAllData,
  getProductDetails,
  addProductVariant
} from "../controllers/product.controller.js";
import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, //5mb
  },
});

const router = express.Router();

router.post(
  "/",
  authenticateSeller,
  upload.array("images", 7), // First parse multipart/form-data
  createProductValidator, // Then validate
  createProduct,
);

router.get("/seller", authenticateSeller, getsellerProducts);

router.get("/", getAllData);

 /**
 * @route GET /api/products/detail/:id
 * @description Get product details by ID
 * @access Public
 */

 // Support both route param and query param forms:
 // - /api/product/detail/:id
 // - /api/product/detail?id=<id>
 // - malformed clients that send '?:id=<id>' will also work
 router.get("/detail", getProductDetails)
 router.get("/detail/:id", getProductDetails)


 /**
 * @route post /api/products/:productId/variants
 * @description Add a new variant to a product
 * @access Private (Seller only)
 */



 router.post("/:productId/variants",authenticateSeller, upload.array("images",7),addProductVariant)
export default router;
