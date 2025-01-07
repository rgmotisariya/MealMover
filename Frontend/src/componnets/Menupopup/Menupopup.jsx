import React from 'react'
import { RxCross2 } from 'react-icons/rx';
import { Link } from 'react-router-dom';

const MenuLinks=[
    {id:1, name:"Home" , Link:"/"},
    {id:2, name:"Shop" , Link:"/#shop"},
    {id:3, name:"About" , Link:"/#about"},
    {id:4, name:"Contact Us" , Link:"/#Contactus"}
  ];

function Menupopup({setshowmanu}) {
  return (
    <div className=' container grid'>
        <div className='top-14 right-2 absolute z-50  rounded-xl '>
            <div className=' border-2 px-9 py-4  rounded-xl  h-60 w-48  bg-white  '>
       <div className='grid justify-items-end'>
         <RxCross2  className="hover:text-primary justfy-items-end right-1 "onClick={()=>setshowmanu(false)} />
         </div>
          {/* manu*/}
          <div className=' lg:block' >
                      <ul  className='items-center gap-4 '>
                           { MenuLinks.map((data,id) =>(
                               <li key={id}>
                                   <Link to={data.Link}><p onClick={() => setshowmanu(false)} className='inline-block px-4 py-2 font-semibold text-gray-500 duration-200 hover:text-black '>{data.name}
                                   </p></Link>
                               </li>
                                ))
                           }
                     </ul>
                   </div>
                   </div>
                   </div>
    </div>
  )
}

export default Menupopup