import expressAsyncHandler from "express-async-handler" 
import User from "../models/userModel.js"
import ApiError from "../utils/ApiErrors.js"
import jwt from "jsonwebtoken"



export const verifyJWT = expressAsyncHandler( async (req,res,next)=>{
//here fist we will find token of alredy loged in user from his cookie or header data 
//then verify that the token maches with the token stored in database(JWT_SECRET)
//if verified then find id and add user in request object
    try {
        console.log("Cookies received:", req.cookies);
        console.log("Authorization header:", req.headers.authorization);
       
        // get token from header or cookie of logedin user
        const token = req.cookies?.accessToken || 
            req.headers.authorization ?.replace("Bearer ", "");

            // if token not available
            if(!token){
                throw new ApiError(401,"token not found");
            }
            // verify token
            const decoded= jwt.verify(token,process.env.JWT_SECRET);

            // if token valid
            const user = await User.findById(decoded.id).select("-password -refreshToken");

            if(!user){
                throw new ApiError(401,"Invelid Access Token");
            }
            req.user = user;

            next();
    }
    catch(error){
        throw new ApiError(401, error.message || "Invelid  Access Token");
   }

});