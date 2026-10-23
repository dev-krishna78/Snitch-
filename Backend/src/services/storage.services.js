import ImageKit from '@imagekit/nodejs';
import { config } from '../config/config.js';
import sharp from "sharp";
import crypto from "crypto";

const client = new ImageKit({
  privateKey: config.IMAGEKIT_PRIVATE_KEY
});

// Single image upload - Snitch product ke liye
export async function uploadFile({ buffer, fileName, folder = "/snitch/products" }) {
  try {
    // Step 1: Sharp se optimize - WebP me convert
    const optimized = await sharp(buffer)
      .resize({
        width: 1000,
        height: 1200,
        fit: "inside",
        withoutEnlargement: true
      })
      .webp({ quality: 80 })
      .withMetadata(false)
      .toBuffer();

    // Step 2: Unique name taaki overwrite na ho
    const uniqueName = Date.now() + "-" + crypto.randomBytes(4).toString("hex") + "-" + fileName;

    // Step 3: ImageKit pe upload - base64 me
    const result = await client.files.upload({
      file: optimized.toString("base64"),
      fileName: uniqueName,
      folder: folder,
      tags: ["snitch", "product"]
    });

    return result;

  } catch (err) {
    console.error("Image upload failed:", err.message);
    throw new Error("Image upload failed");
  }
}

// Multiple variant images ke liye - 5x fast
export async function uploadMultipleFiles(files) {
  const tasks = files.map((file) => {
    return uploadFile({
      buffer: file.buffer,
      fileName: file.originalname
    });
  });
  const results = await Promise.all(tasks);
  return results;
}