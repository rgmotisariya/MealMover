import React from 'react';
import './TopDiscount.css';
import { discount_detail } from '../../assets/assets';

function TopDiscount() {
  return ( 
    <div className='container'> 
            <div className='flex flex-col gap-4 '> 
               <h1 className='text-[black] font-bold text-center text-[max(2.5vw,15px)]'>Top restaurant chains around you</h1>
               <div className=' explore-menu-list  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 gap-y-8  sm:gap-2 xs:grid-3 md:gap-7'>
                    {
                      discount_detail.map((item,index)=>{ 
                        return (
                          <div key={index} className="bg-white">
                          <div className="relative overflow-hidden rounded-2xl mb-2   hover:scale-105 duration-500">
                            <img src={item.image} alt="" className="w-full h-[220px] object-cover rounded-2xl  " />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-2xl"></div>
                            <div className="absolute bottom-0 left-0 p-4">
                              <h3 className="font-bold text-3xl text-white">{item.name}</h3>
                              <p className="text-sm text-gray-200">{item.description}</p>
                            </div>
                          </div>
                        </div>
                        )
                      })
                    }
                  </div>
            </div>
    </div>
  );
}

export default TopDiscount;
0