import express from "express"
import { addItemToCart,removeItemFromCart,getCart } from "../controlers/cartControler.js"
import {verifyJWT} from "../middleware/auth.middleware.js"

const cartRouter=express.Router();

cartRouter.post("/add",verifyJWT,addItemToCart);
cartRouter.post("/remove",verifyJWT,removeItemFromCart);
cartRouter.post("/get",verifyJWT,getCart);

export default cartRouter; 