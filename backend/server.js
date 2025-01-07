import express from "express";
import cors from 'cors'
import  dotenv from "dotenv";
import connectDB  from "./Config/Db.js";
import foodRouter from "./routes/foodRout.js";
import userRouter from "./routes/userRout.js";
import cookieParser from 'cookie-parser';
import cartRouter from "./routes/cartRout.js";
// import orderRouter from "./routes/orderRout.js"  
import contactUsRouter from "./routes/contactusRout.js"

dotenv.config();

const app=express();

app.use(express.json());
app.use(cookieParser());  

// app.use(
//     cors({
//       origin: '*' , // Allow only your frontend origin
//       credentials: true, // Allow sending credentials (cookies, authorization headers)
//     })
//   );

 /*The cors middleware is used to enable CORS (Cross-Origin Resource Sharing) in the server. 
   By default, browsers block requests from different origins 
   unless the server explicitly allows them.*/

//This array lists the origins (domains and ports) allowed to make requests to the server.
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];


app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman)

    /*If the request has no origin (ex: requests from Postman, mobile apps, or scripts not running in a browser), 
    it automatically allows the request. */
    if (!origin) return callback(null, true); 

    // Check that the origin is in the allowed list
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow sending credentials (cookies, authorization headers)
}));
  
  
// Api endpoint
app.use('/api/food',foodRouter);
app.use("/image",express.static('uploads'))
app.use("/user",userRouter);
app.use("/cart",cartRouter);
// app.use("/order",orderRouter);
app.use('/api/contact', contactUsRouter); 


app.get('/',(req,res)=>{
    res.send("hello world");
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 5000,
               console.log("server is  running ....."));
}) 
.catch((err)=>{
    console.log("Error connecting to database !!!",err)
})
