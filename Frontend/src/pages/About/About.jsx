import React from 'react';
import about_delivery from  "../../assets/about_delvery.jpeg"
import about_shef2 from  "../../assets/about_shef2.png"
import about_team from  "../../assets/about_team.png"
function About() {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h2 className="text-3xl font-bold mb-6 text-center animate-fadeIn">About Us</h2>

      {/* Mission Section */}
      <div className="flex flex-col md:flex-row items-center mb-8 animate-slideIn">
        <img
          src={about_delivery}  
          alt="Our Mission"
          className="w-full md:w-1/2 rounded-lg  mb-4 md:mb-0"
        />
        <div className="md:ml-6 text-center md:text-left">
          <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
          <p className="text-gray-700">
            At MealMover, our mission is to deliver delicious food to your doorstep with a few clicks.
            We strive to provide a seamless and delightful ordering experience with a wide range of
            options to satisfy every craving.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="flex flex-col md:flex-row-reverse items-center mb-8 animate-slideIn">
        <img
          src={about_shef2}
          alt="Our Values"
          className="w-full md:w-1/2 rounded-lg  mb-4 md:mb-0"
        />
        <div className="md:mr-6 text-center md:text-left">
          <h3 className="text-xl font-semibold mb-2">Our Values</h3>
          <p className="text-gray-700">
            We value quality, convenience, and customer satisfaction. Our team works tirelessly to
            ensure that each meal we deliver meets the highest standards of taste and freshness.
          </p>
        </div>
      </div>

      {/* History Section */}
      <div className="flex flex-col md:flex-row items-center mb-8 animate-slideIn">
        <img
          src={about_team}
          alt="Our History"
          className="w-full md:w-1/2 rounded-lg  mb-4 md:mb-0"
        />
        <div className="md:ml-6 text-center md:text-left">
          <h3 className="text-xl font-semibold mb-2">Our History</h3>
          <p className="text-gray-700">
            MealMover started as a small startup with a big dream: to make food ordering effortless
            and enjoyable. Over the years, we have grown into a trusted platform that connects people
            with their favorite meals from top restaurants.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
