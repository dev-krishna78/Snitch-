import dotenv from "dotenv"
dotenv.config()

if (!process.env.MONGOOSE_URI){
    throw new Error("Mongo uri is not defiend in the enviroment variable  ");
}

if(!process.env.JWT_SECRET){
    throw new Error("Jwt scret is not defiend in the enviroment variable  ")
}

if(!process.env.GOOGLE_CLIENT_ID){
    throw new Error("GOOGLE CLIENT ID scret is not defiend in the enviroment variable  ")
}

if(!process.env.GOOGLE_CLIENT_SECRET){
    throw new Error("GOOGLE_CLIENT_SECRET scret is not defiend in the enviroment variable  ")
}
if(!process.env.IMAGEKIT_PRIVATE_KEY){
    throw new Error("IMAGEKIT_PRIVATE_KE is not defiend in the enviroment variable  ")
}

if (!process.env.RAZORPAY_KEY_ID) {
  throw new Error("RAZORPAY_KEY_ID is not defined in the environment variables");
}

if (!process.env.RAZORPAY_KEY_SECRET) {
  throw new Error("RAZORPAY_KEY_SECRET is not defined in the environment variables");
}

export const config = {
   MONGOOSE_URI: process.env.MONGOOSE_URI,
   JWT_SECRET: process.env.JWT_SECRET,
   GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
   GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
   NODE_ENV: process.env.NODE_ENV || "development",
   IMAGEKIT_PRIVATE_KEY : process.env.IMAGEKIT_PRIVATE_KEY,
   RAZORPAY_KEY_ID : process.env.RAZORPAY_KEY_ID,
   RAZORPAY_KEY_SECRET : process.env.RAZORPAY_KEY_SECRET
}