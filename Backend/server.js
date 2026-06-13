import dotenv from "dotenv";
dotenv.config();
import app from "./src/app.js";
import connetDB from "./src/config/db.js";

const PORT = process.env.PORT || 8000;



const startServer = async() =>{

    try{
        await connetDB();

        app.listen(PORT, () =>  {
        console.log(`server is runing on port ${PORT}`);
});
}
    catch(error){
     console.error("Failed to start server:",error.message);
     process.exit(1);
    }
}

startServer();






