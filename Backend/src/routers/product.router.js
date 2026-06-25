import express from 'express'
import { authenticateSeller } from '../middleware/auth.middleware.js';
import { createProductValidator } from '../validators/product.validator.js';
import {createProduct } from '../controllers/product.controller.js' 
import multer from 'multer'


const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 //5mb
    }
})


const router = express.Router();

router.post("/",authenticateSeller, createProductValidator,upload.array('images',7),createProduct)

export default router;