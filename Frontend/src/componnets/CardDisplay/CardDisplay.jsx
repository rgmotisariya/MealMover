import React from 'react'
import {useContext} from 'react'
import {StoreContext} from '../../context/StoreContext'
import Card from '../Card/Card';

function CardDisplay({Category}) {

    const { food_list }=useContext(StoreContext);
    
  return (
    <div className=' container '>
       <div className='mt-1 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2  gap-x-5 grid-cols-[repeat(auto-fill,minmax(240px,1fr))] '>
        {
            food_list.map((data,index)=>{
                
                  if( Category===data.category){
                 return  <Card key={index}  
                            id={data._id}
                            name={data.name}  
                            description={data.description} 
                            price={data.price}  
                            img={data.image}
                            category={data.category} />
                  }
                          })
        }
        </div>
    </div>
  );
}

export default CardDisplay




























































































































































