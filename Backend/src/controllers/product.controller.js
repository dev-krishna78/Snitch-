import productModel from "../models/product.model";
import {uploadFile} from "../ser"

export async function createProduct(req,res){

    const {title , description , priceCurrency} = req.body;
    const seller = req.user;

    const image = await Promise.all(req.files.map(async(file)=>{
        return await uploadFile({
            buffer: file.buffer,
            fileName: file.originalname 
        })
    }))
 
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
  
    res.status(201).json({
        message: 'Product created successfully',
        success: true,
        product
    })

}