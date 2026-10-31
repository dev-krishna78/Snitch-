import { Router } from "express";
import { validateRegisterUser , validateLoginUser} from "../validators/auth.validator.js";
import {getMe,googleCallback,register, login} from "../controllers/auth.controller.js"
import  passport  from "passport"
import { config } from "dotenv";
import { authenticateUser } from "../middleware/auth.middleware.js";


const router = Router()

router.post("/register",validateRegisterUser,register)

router.post("/login",validateLoginUser, login )


router.get("/google",passport.authenticate("google",{scope: ["profile","email"]}))

router.get("/google/callback",
passport.authenticate("google",{
    session: false, 
    failureRedirect: `${config.FRONTEND_URL}/login`
}),
googleCallback,
)

/**
 * @route GET /api/auth/me
 * @description Get the authenticated user's profile
 * @access Private
 */
router.get('/me', authenticateUser, getMe)

export default router; 