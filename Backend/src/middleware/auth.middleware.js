import jwt from "jsonwebtoken"
import userModel from "../models/user.model.js"
import {config} from "../config/config.js"

export const authenticateSeller = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    console.log(token)
    return res.status(401).json({ message: "Unauthorized  not get token " });
  }

  try {
    const decoded = await jwt.verify(token, config.JWT_SECRET);
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (user.role !== "seller") {
      return res.status(403).json({ message: "Forbidden" });
    }

    console.log("authenticate seller work properly");
    req.user = user;
    console.log(user);

    next(); // ✅ continue to next middleware
  } catch (error) {
    console.log(error); // ✅ use correct variable
    return res.status(401).json({ message: "Unauthorized  error from catch ...." });
  }
};
