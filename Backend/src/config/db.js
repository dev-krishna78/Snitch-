import mongoose from "mongoose";
import { config } from "./config.js";

const connetDB = async () => {
 await mongoose.connect(config.MONGOOSE_URI)
 console.log("Mongooe Connect")
};

export default connetDB;