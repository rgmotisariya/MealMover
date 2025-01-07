import React from 'react'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'

function PlaceOrcer() {
  const {deliveryFee, total, subtotal}=useContext(StoreContext);

  return (
    <div className='container'>
        <div className='  mx-auto px-4 py-8 '>

          <form className='lg:flex justify-between '>
          
                <div className=' pr-8'>
                              <p className='font-bold text-gray-700 text-xl pb-4'>Delivery Information</p>
                            
                              <div className='grid grid-cols-2 gap-4 '>
                                  <input className="border rounded-md px-3 py-1 focus:outline-none focus:border-blue-500"  type="text" placeholder='First name' />
                                  <input className="border rounded-md px-3 py-1 focus:outline-none focus:border-blue-500"  type="text" placeholder='Last name' />
                              </div>

                              <input  className="border rounded-md px-3 py-1 w-full mt-4 focus:outline-none focus:border-blue-500" type="email" placeholder='Email address'/>
                              <input className="border rounded-md px-3 py-1 w-full mt-4 focus:outline-none focus:border-blue-500" type="text" placeholder='Street' />
                        
                              <div  className='grid grid-cols-2 gap-4 mt-4 ' >
                                  <input className="border rounded-md px-3 py-1 w-full mt-4 focus:outline-none focus:border-blue-500" type="text" placeholder='City' />
                                  <input  className="border rounded-md px-3 py-1 w-full mt-4 focus:outline-none focus:border-blue-500" type="text" placeholder='State' />
                              </div>
                              <div  className='grid grid-cols-2 gap-4 mt-4' >
                                  <input className="border rounded-md px-3 py-1 focus:outline-none focus:border-blue-500" type="text" placeholder='Zip code' />
                                  <input  className="border rounded-md px-3 py-1 focus:outline-none focus:border-blue-500" type="text" placeholder='Country' />
                              </div>
                              <input  className="border rounded-md px-3 py-1 w-full mt-4 focus:outline-none focus:border-blue-500"  type="text" placeholder='Phone' />
                      
                        
                </div>
              
                <div className=" lg:w-1/2  mt-auto border-gray-200">

                    <div className="flex justify-between text-gray-700 text-base pt-4 pb-2">
                      <p>Subtotal</p>
                      <p>₹{subtotal.toFixed(2)}</p> 
                    </div>

                    <div className="flex justify-between text-gray-700 text-base pb-2">
                      <p>Delivery Fee</p>
                      <p>₹{deliveryFee.toFixed(2)}</p>  
                    </div>
                  
                    <div className="flex justify-between text-lg font-semibold text-gray-900 mt-4">
                      <p>Total</p>
                      <p>₹{total.toFixed(2)}</p>
                    </div>

                    <button onClick={()=>navigate('/order')} type="button" className="w-full mt-8 px-4 py-2 bg-primary text-white font-medium rounded-md hover:bg-orange-700 focus:outline-none">
                      Place Order
                    </button>  

                </div>    

          </form>
          
      </div>
    </div>
  )
}

export default PlaceOrcer