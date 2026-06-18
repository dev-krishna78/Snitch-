import express from "express"
import morgan from "morgan";
import cookieParser from "cookie-parser"
import authRouter from "./routers/auth.router.js"

const app = express()



app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}))


app.get("/",(_req,res) => {
     res.status(200).json({
        message: "server is running "
     });
});

app.use("/api/auth", authRouter)

export default app;
