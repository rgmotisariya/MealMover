import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import   rating_starts from "../../assets/rating_starts.png"
function Card({ id, name, description, price,img }) {
  
  const {CartItems,addToCart,removeFromCart,url}=useContext(StoreContext);

  return (
   <div className="w-full h-69 my-2  m-auto rounded-md shadow-[0px_0px_4px_gray]  transition-[0.3s] ">
    
        <div className="grid ">
           <img src={`${url}/image/${img}`} alt="" className=" h-40 w-full rounded-md"/>
        </div> 

        <div className="px-2">
            <div className=" flex  justify-between  font-semibold my-1">
                <p>{name}</p>
                { 
                  !CartItems[id] ?
                    <button className=" bg-secondary text-white rounded-full w-6" onClick={()=>addToCart(id)} >+</button>:

                    <div className=" flex  justify-between   gap-2 font-semibold  rounded-2 rounded-xl bg-gray-400 h-6 w-17">
                      <button className=" bg-primary text-white rounded-full w-6 h-6   " onClick={()=>removeFromCart(id)} >-</button>
                      <p >{CartItems[id]}</p>
                      <button className="bg-primary text-white rounded-full w-6 h-6" onClick={()=>addToCart(id)} >+</button>
                    </div>
                }            
            </div>
            <img src="" alt="" />
            <img src={rating_starts} alt="" className="h-4" />
            <p className="text-xs text-gray-800 pb-2 ">{description}</p>
            <p className="text-primary font-semibold  pb-2">₹ {price}</p>
        </div>
   </div>  
  );
}

export default Card;
