import productModel from "../models/product.model.js";
import {uploadFile} from "../services/storage.services.js"

export async function createProduct(req,res){
   
    const {title , description , priceCurrency} = req.body;
    const seller = req.user;
    console.log(seller)

    const image = await Promise.all(req.files.map(async(file)=>{
        return await uploadFile({
            buffer: file.buffer,
            fileName: file.originalname 
        })
    }))

    console.log(image)
 
   const product =  await productModel.create({
        title,
        description,
        price:{
            amount: priceAmount,
            currency: priceCurrency || "INR"
        },
        images,
        seller: seller._id
    })
     console.log(product.title)
    res.status(201).json({
        message: 'Product created successfully',
        success: true,
        product
    })

   
}