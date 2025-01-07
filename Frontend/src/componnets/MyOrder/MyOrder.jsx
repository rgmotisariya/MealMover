import React from 'react';
import { useNavigate } from 'react-router-dom';

function MyOrder() {
  const orders = []; // Replace with actual orders data

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-orange-600 mb-8">Your Orders</h1>
      {orders.length === 0 ? (
        <div className="bg-white shadow-lg rounded-lg p-10 text-center">
          <p className="text-xl text-gray-700">You haven't placed any orders yet.</p>
          <p className="text-lg text-gray-600 mt-3">Place your first order now to enjoy delicious meals!</p>
          <button onclick={() => {navigate("/Shop");}} className="mt-8 px-8 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition duration-300 ">
            Order Now
          </button>
        </div>
      ) : (
        <div className="w-full max-w-5xl space-y-4">
          {orders.map((order, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-orange-700">Order #{index + 1}</h2>
              <p className="text-lg text-gray-700">Here are your order details...</p>
              {/* Add order details here */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrder;
