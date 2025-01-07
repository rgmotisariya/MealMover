import React from 'react';
import { Link } from "react-router-dom";
import header from '../../assets/header.jpg';

function Header() {
  return (
    <div className=" container relative w-full h-full overflow-hidden"> {/* Cropped container height set to 64 (16rem) */}
      <img
        src={header}
        alt="Delicious Food"
        className="w-full h-full object-cover" // Crops the image to fill the container
      />
      <div className="absolute top-1/4 left-8 flex flex-col items-start gap-4 max-w-[90%] sm:max-w-[70%] md:max-w-[50%] animate-fadeIn">
        <h2 className="text-left text-primary font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl">
          Order Your Favorite Food Here
        </h2>
        <p className="text-primary text-left text-sm sm:text-base md:text-lg lg:text-xl px-2">
          Your favorite dishes, straight to your door. Experience the joy of effortless dining!
        </p>
        <Link to='/Shop'>
          <button className="w-28 sm:w-32 md:w-40 text-[rgb(234,77,77)] font-semibold bg-primary text-sm text-white sm:text-base md:text-lg px-4 py-2 rounded-full transition duration-300 ease-in-out">
            View Menu
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Header;
