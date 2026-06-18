import { Router } from "express";
import { validateRegisterUser , validateLoginUser} from "../validators/auth.validate.js";
import {register, login} from "../controllers/auth.controller.js"

const router = Router()

router.post("/register",validateRegisterUser,register)

router.post("/login",validateLoginUser, login )

export default router 