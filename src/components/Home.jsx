import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [link, setLink] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate('/loader');
    try {
      const response = await axios.get(
        `https://76loymajsa2d3m6bmsgzsmuvni0zgaaw.lambda-url.us-east-1.on.aws/?link=${link}`
      );
      navigate('/loader', { state: { response: response.data } }); // Pass response data to Loader component
    } catch (error) {
      console.error('Error submitting link:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Enter a URL</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter URL"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
