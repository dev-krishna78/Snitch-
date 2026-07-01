import express from 'express'
import { authenticateSeller } from '../middleware/auth.middleware.js';
import { createProductValidator } from '../validators/product.validator.js';
import {createProduct , getsellerProducts,getAllData} from '../controllers/product.controller.js' 
import multer from 'multer'


const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 //5mb
    }
})


const router = express.Router();

router.post(
  "/",
  authenticateSeller,
  upload.array("images", 7),     // First parse multipart/form-data
  createProductValidator,        // Then validate
  createProduct
);

router.get("/seller",authenticateSeller,getsellerProducts)

router.get("/",getAllData)

export default router;