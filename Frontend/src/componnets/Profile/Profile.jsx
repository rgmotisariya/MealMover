import React, { useContext, useEffect } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const { user, token, setToken, setUser, url } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(()=>{
    if(!token){
      navigate('/');
    }
  },[token]);

  const handleLogout = async () => {
    try {
      const res = await fetch(`${url}/user/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        credentials: 'include' // Include cookies for secure logout
      });

      if (res.ok) {
        // Clear token
        setToken('');
        // Clear user data
        setUser({});
        // Clear from localStorage
        setToken(''); // Clear token
        setUser({});  // Clear user data
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // Redirect to homepage after logout
        localStorage.removeItem('user'); // Clear from localStorage
        navigate('/');
        //load window
        window.location.reload();
         // Redirect to homepage after logout
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Your Profile</h1>

        <div className="space-y-4">
          <div className="flex justify-between">
            <p className="text-gray-600 font-semibold">Name:</p>
            <p className="text-gray-800">{user.name || 'John Doe'}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600 font-semibold">Email:</p>
            <p className="text-gray-800">{user.email || 'johndoe@example.com'}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600 font-semibold">Member Since:</p>
            <p className="text-gray-800">{new Date(user.createdAt).toLocaleDateString() || 'N/A'}</p>
          </div>
        </div>

        <div className="mt-8">
          <button 
            onClick={handleLogout} 
            className="w-full py-2 px-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-200">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
