import productModel from "../models/product.model.js";
import {uploadFile} from "../services/storage.services.js"

export async function createProduct(req,res){
   
    const {title , description ,priceCurrency,priceAmount} = req.body;
    const seller = req.user;
    console.log(seller)

    const images = await Promise.all(req.files.map(async(file)=>{
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
            currency: priceCurrency
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

export async function getsellerProducts(req,res){
    
     const seller = req.user

     const products = await productModel.find({seller: seller._id})

     res.status(200).json({
        message: "products fetched sucessfully ",
        success: true,
        products
     })
}


export async function getAllData(req,res){
    const products = await productModel.find()

    res.status(200).json({
        message: "All products fetched successfully",
        success: true,
        products
    })
}