import generateToken from "../Config/generateToken.js"
import User from "../models/userModel.js"
import expressAsyncHandler from "express-async-handler"
import ApiError from "../utils/ApiErrors.js"
import ApiResponce from "../utils/ApiResponce.js"
// import uploadOnCloudinary from "../utils/coudinary.js"


/*The express-async-handler package is a utility that simplifies
the process of handling asynchronous code in Express.js route handlers. 
It helps catch errors in asynchronous functions and automatically passes them 
to the Express error-handling middleware, avoiding the need for repetitive try-catch blocks. */

const regi_Controller = expressAsyncHandler(async (req, res) => {
         
        // Getting name, email, and password from frontend
        const { name, email, password} = req.body;

        // Validation: check if all fields are present and valid
        if (!name || !email || !password) {
            throw new ApiError(400, "Please fill all fields.");
        }

        //chack user alredy exist or not 
        const userExist = await User.findOne({ 
          $or:[{name},{ email }]
        });
        if (userExist) {
          throw new ApiError( 409 ," user already exist ");
        }

        // //chack for dp path
        // if (!req.file) {
        //   throw new ApiError(400, "Please upload your profile photo");
        // }
        // const dpLocalPath = req.file.path;
          
        //   if(!dpLocalPath){
        //    throw new ApiError(400, "no path  dp available");
        //    }
        //  //upload dp on cloudinary
        // const dpUrl = await uploadOnCloudinary(dpLocalPath);
        // if (!dpUrl) {
        //   throw new ApiError(400, "please upload your profile photo");
        // }
        //  //create an entry in the database
        //  const user = await User.create({ name, email, password,  dp: dpUrl });
        

        
        //create an entry in the database
        const user = await User.create({ name, email, password,isAdmin: false});
        if (user) {
          res.status(201).json(
            new ApiResponce(201,"user created successfully",{
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
          }));
        }
         else {
          throw new ApiError(500,"Invalid user data");
        }
});

const gen_access_refresh_tokens = async (userId) =>{
  try{

  //get user
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  //generate tokens
  const accessToken= user.generate_access_token();
  const refreshToken= user.generate_refresh_token();

  //save refresh token in database
  user.accessToken=accessToken;
  user.refreshToken=refreshToken;
  await user.save({validateBeforeSave:false});

  //return access and refresh token
  return {accessToken,refreshToken}
  }
  catch(error){
    console.error("Error generating tokens:", error.message);
    throw new ApiError(500,"somethig went wrong while generaing tokens");
  }
}


const login_Controller = expressAsyncHandler(async (req, res) => {
        
        //take data from req body from input
        const { name, password } = req.body;

        if ( !name || !password ) {
          throw new ApiError(400,"plz fill username and password fields");
        }
        //check if user exist
        const user = await User.findOne({ name });

        if (!user || !(await user.matchPassword(password))) {
          throw new ApiError(404,"Invalid user data of login");
        }

        // check passwork is match or not
       if (   user && ( await user.matchPassword(password) )  ) {
          console.log("password matched");
             
        //now we have  valideted user called "user"
        //password and username is valid 
        // now generate access and refresh token for user session

      const {accessToken,refreshToken}=await gen_access_refresh_tokens(user._id) ;
      console.log({accessToken,refreshToken});
      const logeduser=  await  User.findById(user._id).select("-password -refreshToken");
    
        //send cookies with tokens
        res
        .status(200)
        .cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // Set secure flag only in production
          sameSite: "Strict", // Protects against CSRF attacks
        })
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Strict",
        })
        .json(
          new ApiResponce(200, "Login successful", { user: logeduser, accessToken, refreshToken })
        );
        console.log(res.getHeaders());
      }
});



const logout_Controller = expressAsyncHandler(async (req, res)=>{
 // to logout the user we need to clear the user cookie and also to clear user refresh tokens
 //  firstly we need user's id  to find users data
 //   we will add user in request object( go at auth middleware to see this  process) so it will accessible  in this function 
 //then set refresheTOken undefind and clear cookie
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {   //mongoDb Operator
      $unset: { refreshToken: "" } // Remove refreshToken from DB
    },
    { new: true }
  );

  res
    .status(200)
    .clearCookie("accessToken", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "Strict" })
    .clearCookie("refreshToken", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "Strict" })
    .json(new ApiResponce(200, "Logout successful", user));
});

export  { regi_Controller,login_Controller,logout_Controller };
