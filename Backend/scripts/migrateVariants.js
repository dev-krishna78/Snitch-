import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productModel from '../src/models/product.model.js';

// .env load karna taaki DB ka URL mil jaye
dotenv.config({ path: '../.env' });

const migrate = async () => {
  try {
    // 1. DB Connect
    console.log("Connecting to DB...");
    await mongoose.connect(process.env.MONGOOSE_URI);
    console.log("DB Connected");

    // 2. Saare kharab products dhoondo (jinke variants khaali hain)
    const brokenProducts = await productModel.find({
      $or: [
        { variants: { $exists: false } },
        { variants: { $size: 0 } },
        { variants: null }
      ]
    });

    console.log(`Found ${brokenProducts.length} broken products`);

    if (brokenProducts.length === 0) {
      console.log("Koi broken product nahi hai, sab sahi hai.");
      process.exit(0);
    }

    // 3. Har ek kharab product ko loop karke fix karo
    for (const product of brokenProducts) {
      console.log(`Fixing: ${product.title} - ${product._id}`);

      // Default variant banao, usi product ke price/images se
      const defaultVariant = {
        price: product.price, // purana price hi use kar lo
        stock: 50, // default 50 stock de do
        images: product.images || [], // product ki main images hi daal do
        attributes: {
          size: "M",
          color: "Default",
          note: "auto-migrated from script"
        }
      };

      product.variants.push(defaultVariant);
      await product.save(); // DB mein save

      console.log(` -> Fixed with new variant ID: ${product.variants[0]._id}`);
    }

    console.log("Migration Complete!");
    process.exit(0);

  } catch (error) {
    console.error("Migration Failed:", error);
    process.exit(1);
  }
};

migrate();