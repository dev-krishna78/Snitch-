import express from "express"
import morgan from "morgan";
import cookieParser from "cookie-parser"
import authRouter from "./routers/auth.router.js"
import productRouter from "./routers/product.router.js"
import cartRouter from "./routers/cart.router.js"
import passport from 'passport'
import { Strategy as GoogleStrategy} from "passport-google-oauth20"
import {config} from "./config/config.js"
const app = express()


app.use(passport.initialize())
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}))


passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}))

app.get("/",(_req,res) => {
     res.status(200).json({
        message: "server is running "
     });
});

app.use("/api/auth", authRouter)
app.use("/api/product", productRouter)
app.use("/api/cart", cartRouter)
export default app;
