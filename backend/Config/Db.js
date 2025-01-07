import mongoose from "mongoose";
import dotenv from 'dotenv'
import {DB_NAME} from "../constant.js"

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log(`connected to mongodb ${conn}`);
    } catch (error) { 
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;