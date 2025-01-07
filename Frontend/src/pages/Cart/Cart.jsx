import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import {useNavigate} from 'react-router-dom'
import { Link } from 'react-router-dom';
function Cart() { 

  const {food_list, CartItems, removeFromCart,deliveryFee, total, subtotal,url}=useContext(StoreContext);  
  
  const navigate=useNavigate();

  return (
    <div className='container  '>

      <div className='mt-3 px-1 py-2 bg-gray-100 rounded-md shadow-md'>
         
          <div className=' grid grid-cols-6 border-b border-gray-300  '>
              <p className="text-left font-medium text-gray-700">Items</p>
              <p className="text-left font-medium text-gray-700">Title</p>
              <p className="text-left font-medium text-gray-700">Price</p>
              <p className="text-left font-medium text-gray-700">Quentity</p>
              <p className="text-left font-medium text-gray-700">Total</p>
              <p className="text-left font-medium text-gray-700">Remove</p>
          </div>

          <hr />

          {
              food_list.map((data)=>{ 
                if(CartItems[data._id]>0){
                  return(
                    <div  key={data._id} className=' grid grid-cols-6 border-b border-gray-2  00 items-center py-2 '>
                  
                            <img src={`${url}/image/${data.image}`} alt=""  className='w-8 h-8 rounded-md object-cover'/>
                            <p className="text-left font-medium text-gray-700" >{data.name}</p>
                            <p className="text-left text-gray-700" > {data.price}</p>
                            <p className="text-left text-gray-700" > {CartItems[data._id]}</p>
                            <p className="text-left text-gray-700" >{CartItems[data._id]*data.price}</p>
                            <button type="button" onClick={() => removeFromCart(data._id)}  className="text-red-500 hover:text-red-700 focus:outline-none" > Remove </button> 
                    </div>
                  )
                }
                }
              )
          }

      </div>

      <div className="mt-4 border-t border-gray-300 pt-4">
        
              <div className="flex justify-between text-gray-700 font-medium">
                <p>Subtotal</p>
                <p>₹{subtotal.toFixed(2)}</p> 
              </div>

                <div className="flex justify-between text-gray-700 font-medium mt-2">
                  <p>Delivery Fee</p>
                  <p>₹{deliveryFee.toFixed(2)}</p>  
                </div>
              
              <div className="flex justify-between text-lg font-semibold text-gray-900 mt-4">
                <p>Total</p>
                <p>₹{total.toFixed(2)}</p>
              </div>

              <div className='flex justify-center gap-5 '>
                    <Link to='/Shop'> 
                       <button className='  bg-orange-600 text-white py-2 px-4  w-32  rounded-md shadow-lg hover:bg-orange-700 transition duration-300 '>
                         <h1>View Manu</h1>
                       </button>
                     </Link> 

                      <button onClick={()=>navigate('/order')} type="button" className=" w-32 px-4 py-2 bg-orange-600 text-white font-medium rounded-md hover:bg-orange-700 focus:outline-none">
                         Payment
                      </button>  
              
                </div>

      </div>

    </div>

  )
}

export default Cart