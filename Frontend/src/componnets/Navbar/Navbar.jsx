import React, { useContext, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";

import { IoMdCart } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";
import axios from "axios";

const MenuLinks = [
  { id: 1, name: "Home", Link: "/" },
  { id: 2, name: "Shop", Link: "/shop" },
  { id: 3, name: "About", Link: "/About" },
  { id: 4, name: "Contact Us", Link: "/ContactUs" },
];

function Navbar({ setShowlogin, setshowmanu }) {
  const {
    setCartItems,
    setSubtotal,
    setTotal,
    setDeliveryFee,
    setCartLength,
    cartLength,
    url,
    user,
    token,
    setToken,
    setUser,
    setUserLoggedIn,
    userLoggedIn,
  } = useContext(StoreContext);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();

  // Handle Logout
  const handleLogout = async () => {
    await axios
      .post(`${url}/user/logout`, user, {
        headers: {
          authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((response) => {
        setToken("");

        //remove user and token from localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser({});

        setUserLoggedIn(false);

        // Clear all local state values
        setCartItems({});
        setSubtotal(0);
        setTotal(0);
        setDeliveryFee(0);
        setCartLength(0);

        console.log("Logout successful:", response);
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  return (
    <div className="container relative z-40 bg-white px-1 py-1">
      <div className="flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/">
          <p className="text-primary font-bold text-2xl">MealMover</p>
        </Link>

        {/* Menu */}
        <div className="hidden lg:block">
          <ul className="flex items-center gap-4">
            {MenuLinks.map((data, id) => (
              <li key={id}>
                <Link to={data.Link}>
                  <p className="inline-block px-4 font-semibold text-gray-500 duration-200 hover:text-black">
                    {data.name}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative group">
            <input
              type="text"
              placeholder="search"
              className="search-bar hidden"
            />
            <IoSearchSharp className="absolute text-xl duration-200 -translate-y-1/2 text-gray-600 group-hover:text-primary dark:text-gray-400 top-1/2 right-3" />
          </div>

          {/* Cart */}
          <button className="relative p-3">
            <Link to="/Cart">
              <IoMdCart className="text-xl text-gray-500 hover:text-primary" />
            </Link>
            {cartLength !== 0 && (
              <div className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 rounded-full">
                {cartLength}
              </div>
            )}
          </button>

          {/* Authentication/Dropdown */}
          {!userLoggedIn ? (
            <button
              onClick={() => setShowlogin(true)}
              className="hover:text-white hover:bg-primary bg-gray-100 text-gray-700 rounded-full px-4 py-1 font-semibold transition duration-300 ease-in-out shadow-lg"
            >
              Sign in
            </button>
          ) : (
            <div className="relative">
              <img
                src={assets.profile_icon}
                alt="Profile"
                className="w-6 h-6 rounded-full object-cover border-2 border-primary cursor-pointer"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              />
              {dropdownOpen && (
                <div
                  className="absolute right-0 mt-8 w-32 bg-white border rounded-lg shadow-lg z-50"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <ul className="py-1 text-gray-700">
                    <li
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100 transition"
                      onClick={() => {
                        navigate("/profile");
                        setDropdownOpen(false);
                      }}
                    >
                      <img
                        src={assets.profile_icon}
                        alt="Profile"
                        className="w-4 h-4 inline-block mr-2"
                      />
                      Profile
                    </li>
                    <li
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100 transition"
                      onClick={() => {
                        navigate("/myOrder");
                        setDropdownOpen(false);
                      }}
                    >
                      <img
                        src={assets.bag_icon}
                        alt="Order"
                        className="w-4 h-4 inline-block mr-2"
                      />
                      Order
                    </li>
                    <li
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100 transition"
                      onClick={handleLogout}
                    >
                      <img
                        src={assets.logout_icon}
                        alt="Logout"
                        className="w-4 h-4 inline-block mr-2"
                      />
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu */}
          <IoMenu
            onClick={() => setshowmanu(true)}
            className="lg:hidden text-2xl text-gray-500 hover:text-primary"
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
