import { React, useState, useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import FoodCategory from "../../componnets/FoodCategory/FoodCategory";
import CardDisplay from "../../componnets/CardDisplay/CardDisplay";
import { IoNavigate } from "react-icons/io5";
import { Link } from "react-router-dom";

function Shop() {

  const context = useContext(StoreContext);

  const totalCartItems = Object.values(context.CartItems).reduce(
    (acc, quantity) => acc + quantity,
    0
  );

  const [Category, setCategory] = useState("all");

  return (
    <div> 
       <FoodCategory Category={Category} setCategory={setCategory} />
       <CardDisplay Category={Category}/>
               
                {
                  totalCartItems===0 ? null :<Link to='/Cart'> 
                     <div className='fixed bottom-20 right-10 bg-primary text-white py-2 px-4 rounded-full shadow-lg hover:bg-orenge-300 transition duration-300 '>
                        <h1> {totalCartItems}  items in cart  <IoNavigate   className='inline' /> </h1>
                     </div>
                    </Link> 
                }
                
    </div>
   
  );
}

export default Shop