import { React, useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import Header from "../../componnets/Header/Header";
import TopDiscount from "../../componnets/TopDiscount/TopDiscount";
import { IoNavigate } from "react-icons/io5";
import { Link } from "react-router-dom";
import {Featured_Dishes} from '../../assets/assets.js'
import {Today_Specials} from '../../assets/assets.js'
import {Why_Choose_Us} from '../../assets/assets.js'
function Home() {
  
  const context = useContext(StoreContext);
  const totalCartItems = Object.values(context.CartItems).reduce(
    (acc, quantity) => acc + quantity,
    0
  );

  return (
    <div >
      <Header />
      <TopDiscount />
      <div className="container mx-auto "> 

          {/* Featured Dishes Section */}
          <section className="py-12">
            <h2 className="text-3xl font-bold text-center mb-8 animate-slideIn">Featured Dishes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Featured_Dishes.map((dish, index) => (
                <div key={index}  className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out"  >
                  <img  src={dish.img} className="w-full h-48 object-cover"/>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{`Delicious ${dish.name}`}</h3>
                    <p className="text-gray-700">Try our {dish.name} with unique flavors.</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Today's Specials Section */}
          <section className="py-10">
            <h2 className="text-3xl font-bold text-center mb-8 animate-slideIn">Today's Specials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {
                Today_Specials.map((special, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out" >
                  <img src={special.img} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{special.name}</h3>
                    <p className="text-gray-700">Special of the day: {special.name.toLowerCase()}.</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Why Choose Us Section */}
          <section className="py-2 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 animate-fadeIn">
              Why Choose MealMover?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-2 justify-center">
              {Why_Choose_Us.map((reason, index) => (
                <div key={index}className="flex flex-row sm:flex-row  items-center bg-orange-100 rounded-lg shadow-lg p-2  sm:p-2 w-full"  >
                  <img src={reason.img} className="w-8 h-8 sm:w-12 sm:h-12 lg:w-14 lg:h-14 mx-3  sm:mb-0 sm:mr-4" />
                  <div className="flex flex-col  ">
                    <h3 className="text-xl text-left sm:text-md font-semibold"> {reason.title} </h3>
                    <p className="text-xs text-left sm:text-base lg:text-sm text-gray-700"> {reason.desc} </p>
                  </div>
                </div>
              ))}
            </div>
          </section>


          {/* Customer Reviews Section */}
          <section className="py-12 ">
            <h2 className="text-3xl font-bold text-center mb-8 animate-slideIn">What Our Customers Say</h2>
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { name: 'John Doe', review: 'The food is amazing and delivery is super fast!' },
                { name: 'Jane Smith', review: 'Absolutely love the variety and quality.' },
                { name: 'Sam Wilson', review: 'Great service, will definitely order again!' },
              ].map((customer, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6 w-80">
                  <p className="italic mb-4">"{customer.review}"</p>
                  <h4 className="font-semibold text-gray-800">{customer.name}</h4>
                </div>
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center py-12 animate-fadeIn">
            <h2 className="text-2xl font-bold mb-4">Hungry? Let’s Get Started!</h2>
            <Link to='/Shop'> <button className="bg-primary text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-orange-400 transition duration-300 ease-in-out">
              Explore Menu
            </button>
            </Link>
          </section>

    </div>
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

export default Home;
