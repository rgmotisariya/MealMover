import React from 'react'
import { FaInstagram,FaMobileAlt, FaLocationArrow,FaFacebook,FaLinkedin } from 'react-icons/fa';

const FooterLinks=[
    {
        id:1,
        name:"Home",
        link:"/"

    },
    {
        id:2,
        name:"Shop",
        link:"/"
    },
    {
        id:3,
        name:"About",
        link:"/"
    },
    {
        id:4,
        name:"category",
        link:"/"
    },
    {
        id:5,
        name:"Contact",
        link:"/"
    }
]
function Footer() {
  return (
    <div>
        <div className="container    ">
            <div className="grid  md:grid-cols-3 my-5 pb-10 pt-3 bg-fifth ">
               
                {/* compony details */}

                <div className="py-8 px-4">
                <a className='text-primary font-bold text-2xl ' href="#Home">MealMover</a>
                <p className=" text-gray-700 lg:pr-24 pt-3  dark:text-white/70">
                 No. 54 Sy No 3  Block - GroundFloor Embassy Tech Village |  Ring Road Ahemdabad  Gujarat – 380001.
                </p>
                <p className="text-gray-500 mt-4 ">
                    Copyright © 2024. All rights reserved.
                </p>
                <a href="#" className='inline-block bg-primary hover:bg-secondary  mt-4  text-white py-2 px-4  text-sm rounded-full  '>Contact Us</a>
                </div>

                {/* footer links */}
                <div className="col-span-2 grid grid-cols-2 sm:grid-cols-3 md:pl-10">
                    
                    {/* importent links */}
                    <div className=" py-10 px-4 ">

                        <h1 className="font-bold text-xl sm:text-left mb-3">Importent Links</h1>

                        <ul className="space-y-2">
                            {FooterLinks.map((data,index)=>(
                                <li key={index}>
                                    <a href={data.link} className='text-gray-600   dark:text-white/40 hover:text-black duration-300
                                    hover:dark:text-white'>{data.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick links */}
                    <div className=" py-10 px-4 ">

                        <h1 className="font-bold text-xl sm:text-left mb-3">Quick links</h1>

                        <ul className="space-y-2">
                            {FooterLinks.map((data,index)=>(
                                <li key={index}>
                                    <a href={data.link} className='text-gray-600   dark:text-white/40 hover:text-black duration-300
                                    hover:dark:text-white'>{data.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                  
                    {/* Address links */}
                    <div className=" py-8 px-4 col-span-2 sm:col-auto">
                         <h1 className="text-xl font-bold sm:text-left mb-3">Address</h1>

                         <div className="flex items-center gap-3">
                             <FaLocationArrow/>
                              <p>Ahemdabad ,Gujarat</p>
                         </div>
                         <div className="flex items-center gap-3 mt-1">
                            <FaMobileAlt />
                            <p>+91 1234567890</p>
                         </div>

                        {/* social links */}
                        <div className="flex  items-center gap-3 mt-5">
                        <a href="#">
                            <FaInstagram className='text-3xl hover:text-primary duration-300'/>
                        </a>
                        <a href="#">
                            <FaFacebook className='text-3xl hover:text-primary duration-300'/>
                        </a>
                        <a href="#">
                            <FaLinkedin className='text-3xl hover:text-primary duration-300'/>
                        </a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>


  )
}

export default Footer