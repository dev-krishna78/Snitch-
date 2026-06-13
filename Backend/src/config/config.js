import dotenv from "dotenv"
dotenv.config()

if (!process.env.MONGOOSE_URI){
    throw new Error("Mongo uri is not defiend in the enviroment variable  ");
}

if(!process.env.JWT_SECRET){
    throw new Error("Jwt scret is not defiend in the enviroment variable  ")
}

export const config = {
   MONGOOSE_URI: process.env.MONGOOSE_URI,
   JWT_SECRET: process.env.JWT_SECRET
}