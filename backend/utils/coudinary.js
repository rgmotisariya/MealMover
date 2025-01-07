import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
import dotenv from 'dotenv';

dotenv.config();

    // Configuration
    cloudinary.config({  
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET,
     
    });
    
    // Upload an image
    const uploadOnCloudinary = async (localFilePath)=>{
        try{
            if(!localFilePath) throw new Error("No file path provided");
          
            // upload the file on cloudnary
            const responce = await cloudinary.uploader.upload(localFilePath, {
                resource_type: "image",
                
            });
            console.log("file is uploaded on cloudinary",responce.url);
            fs.unlinkSync(localFilePath);
            return responce.secure_url;

        } 
        catch(error){
            //remove the locally saved temporary file as the upload operation got faild
            if (fs.existsSync(localFilePath)) {
                fs.unlinkSync(localFilePath);
              }
            console.error("Cloudinary upload failed:", error.message);
            throw new Error("Cloudinary upload failed");
            
        }
    }
export  default  uploadOnCloudinary ;