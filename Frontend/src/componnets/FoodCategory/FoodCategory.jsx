import React from 'react';
import './FoodCategory.css';
import { menu_list } from '../../assets/assets';

function FoodCategory({ Category, setCategory }) {

  return (
    <div className='container'>
     
            <div className='flex flex-col gap-4 pt-7 '>
              
               <h1 className='pt-5  text-[black] font-bold text-[max(2.5vw,15px)]'>What's on your mind?</h1>
               <p className='max-w-[60%] columns-[#808080]'>Discover the best food & drinks in Ahmedabad</p>
                <div className=' explore-menu-list flex justify-between items-center gap-[30px] text-center overflow-x-scroll mx-0 my-5 overflow-auto'>
                  {
                    menu_list.map((item,index)=>{
                      return (
                        <div key={index} onClick={()=>setCategory(prev=>prev===item.menu_name?"":item.menu_name)} className='explore-menu-list-item'>
                          <img src={item.menu_image} alt="" className={Category===item.menu_name?"active":""} />
                          <p>{item.menu_name}</p>
                        </div>
                      )
                    })
                  }
                </div>
                <hr/>
           
            </div>
         
 
    </div>
  );
}

export default FoodCategory;
