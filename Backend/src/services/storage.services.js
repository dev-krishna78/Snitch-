import ImageKit from '@imagekit/nodejs';
import {config} from '../config/config.js';
import sharp from "sharp";

const client = new ImageKit({
    privateKey: config.IMAGEKIT_PRIVATE_KEY
});


export async function uploadFile({ buffer, fileName, folder = "snitch" }) {
  try {
    // ✅ Step 1: Resize + Compress using sharp
    const optimizedBuffer = await sharp(buffer)
      .resize({ width: 1000 }) // best size for product images
      .jpeg({ quality: 80 })   // compress to ~80% quality
      .toBuffer();

    // ✅ Step 2: Upload to ImageKit
    const result = await client.files.upload({
      file: optimizedBuffer,   // optimized buffer
      fileName,
      folder
    });

    return result;
  } catch (err) {
    console.error("Image upload failed:", err);
    throw err;
  }
}