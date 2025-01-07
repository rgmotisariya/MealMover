// import Order from "../models/orderModel.js";
// import User from "../models/userModel.js";
// import 
// export const placeOrder=async(req,res)=>{

//     try {
//         const newOrder=new Order({
//             name:req.body.name,
//             address:req.body.address,
//             amount:req.body.amount,
//             items:req.body.items
//         })

//         await newOrder.save();
//         await User.findByIdAndUpdate(req.user._id,{cartData:{}});

//         const line_items = req.body.items.map((item)=>({
//             name:item.name,
//             amount:item.price,
//             currency:"INR",
//         })) 
// }