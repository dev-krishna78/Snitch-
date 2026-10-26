import productModel from "../models/product.model.js";
import { uploadFile } from "../services/storage.services.js";


export async function createProduct(req, res) {
    try {
        const { title, description, priceAmount, priceCurrency, stock } = req.body;
        const seller = req.user;

        // 1. Images upload - tumhara same code
        const images = await Promise.all(req.files.map(async (file) => {
            return await uploadFile({
                buffer: file.buffer,
                fileName: file.originalname
            })
        }))

        // 2. Default Variant banao - YEHI SOLUTION 2 KA LOGIC HAI
        const defaultVariant = {
            images: images, // product ki main images ko hi variant ki image bana di
            price: {
                amount: Number(priceAmount),
                currency: priceCurrency || "INR"
            },
            stock: Number(stock) || 50, // agar stock nahi diya to 50 default
            attributes: {
                size: "M",
                color: "Default",
                note: "auto-created"
            }
        }

        // 3. Product create with default variant inside
        const product = await productModel.create({
            title,
            description,
            price: {
                amount: Number(priceAmount),
                currency: priceCurrency || "INR"
            },
            images,
            seller: seller._id,
            variants: [defaultVariant] // <-- YE LINE SAB KUCH FIX KAR DEGI
        })

        res.status(201).json({
            message: "Product created successfully with default variant",
            success: true,
            product
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Server error",
            success: false
        })
    }
}
export async function getSellerProducts(req, res) {
    const seller = req.user;

    const products = await productModel.find({ seller: seller._id });


    res.status(200).json({
        message: "Products fetched successfully",
        success: true,
        products
    })
}

export async function getAllProducts(req, res) {
    const products = await productModel.find()

    return res.status(200).json({
        message: "Products fetched successfully",
        success: true,
        products
    })
}

export async function getProductDetails(req, res) {
    const { id } = req.params;

    const product = await productModel.findById(id)

    if (!product) {
        return res.status(404).json({
            message: "Product not found",
            success: false
        })
    }

    return res.status(200).json({
        message: "Product details fetched successfully",
        success: true,
        product
    })
}


export async function addProductVariant(req, res) {

    const productId = req.params.productId;

    const product = await productModel.findOne({
        _id: productId,
        seller: req.user._id
    });

    if (!product) {
        return res.status(404).json({
            message: "Product not found",
            success: false
        })
    }

    const files = req.files;
    const images = [];
    if (files || files.length !== 0) {
        (await Promise.all(files.map(async (file) => {
            const image = await uploadFile({
                buffer: file.buffer,
                fileName: file.originalname
            })
            return image
        }))).map(image => images.push(image))
    }

    const price = req.body.priceAmount
    const stock = req.body.stock
    const attributes = JSON.parse(req.body.attributes || "{}")

    console.log(price)

    product.variants.push({
        images,
        price: {
            amount: Number(price) || product.price.amount,
            currency: req.body.priceCurrency || product.price.currency
        },
        stock,
        attributes
    })

    await product.save();

    return res.status(200).json({
        message: "Product variant added successfully",
        success: true,
        product
    })

}