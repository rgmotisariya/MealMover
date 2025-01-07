import User from "../models/userModel.js";

//add items to user cart
export const addItemToCart = async (req, res) => {
  try {
    let userData = await req.user;
    console.log(userData);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    let cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    await User.findByIdAndUpdate(req.user._id,{cartData});

    res
      .status(200)
      .json({ success: true, message: "Item added to cart", cartData });
    console.log(userData);
  } catch (error) {
    console.log(error);
  }
};

//remove items from user cart
export const removeItemFromCart = async (req, res) => {
  try {
    let userData = await req.user;
    console.log(userData);

    const { itemId } = req.body;

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    
    let cartData = await userData.cartData;
    if (cartData[itemId] === 1) {
      delete cartData[itemId];
    } else {
      cartData[itemId] -= 1;
    }

    await User.findByIdAndUpdate(req.user._id,{cartData});

    res.status(200).json({ message: "Item removed from cart" });

    console.log(userData);
  } catch (error) {
    console.log(error);
    
  }
};

// fatch user cart data
export const getCart = async (req, res) => {
  try{
    let userData = await req.user;
    let cartData = await userData.cartData;
  if (!userData) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ success:true,cartData });
}
catch(error){
  console.log(error);
  res.status(500).json({ success:false,message:"error" });
}
};
