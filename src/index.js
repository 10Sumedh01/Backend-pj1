import dotenv from "dotenv"; // to load .env file at the first to let other files to use it 
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
     path: "./env"
 });

const port = process.env.PORT || 8000;

connectDB()
.then((res)=>{
    app.on('error',(err)=>{
        console.log("Error: ", err);
        throw err;
    })
    
    app.listen(port, ()=>{
        console.log( `Server is running at ${port}`);
    })
})
.catch((err)=>{
    console.log("MongoDB connection failed: " + err);
})
