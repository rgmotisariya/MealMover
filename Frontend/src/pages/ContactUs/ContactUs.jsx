import React, { useContext, useState } from 'react';
import axios from 'axios'; // Import Axios
import { StoreContext } from '../../context/StoreContext';

function ContactUs() {
  // State to manage form inputs and response
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [loading, setLoading] = useState(false); // Loading state for submission
  const [responseMessage, setResponseMessage] = useState(''); // Message for success/error feedback

  const { url } = useContext(StoreContext);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Use Axios to send the POST request
      const response = await axios.post(`${url}/api/contact`, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Handle the response
      if (response.status === 200) {
        setResponseMessage('Message sent successfully!');
      } else {
        setResponseMessage(response.data.message || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setResponseMessage('An error occurred. Please try again.');
    }

    setLoading(false);
    setFormData({ name: '', email: '', message: '' }); // Reset form after submission
  };

  return (
    <div className='container mx-auto p-6 max-w-lg'>
      <h2 className="text-2xl font-bold text-primary mb-4 text-center">Contact Us</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            rows="4"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className={`w-full bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-500 focus:outline-none focus:bg-blue-600 ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>

      {/* Response message for user feedback */}
      {responseMessage && (
        <div className="mt-4 text-center text-sm font-bold text-green-600">
          {responseMessage}
        </div>
      )}
    </div>
  );
}

export default ContactUs;
