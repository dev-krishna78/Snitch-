import { Router } from "express";
import { validateRegisterUser } from "../validators/auth.validate.js";
import {register} from "../controllers/auth.controller.js"

const router = Router()

router.get("/register",validateRegisterUser,register)

export default router 