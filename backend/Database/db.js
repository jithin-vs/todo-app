import mongoose from "mongoose";
import dotenv  from "dotenv";
dotenv.config();

async function connectDb(){

    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDb")
    }catch(err){
        console.log("error:",err);
    }
}

export { connectDb } ;