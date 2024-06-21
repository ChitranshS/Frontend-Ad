import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [link, setLink] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!link) {
      setError('Please provide a valid link');
      return;
    }
    if (!/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w.-](?:\/[\w.-]*)*$/gi.test(link)) {
      setError('Please enter a valid URL');
      return;
    }
    navigate('/ad-copy');
    try {
      const response = await axios.get(
        `https://76loymajsa2d3m6bmsgzsmuvni0zgaaw.lambda-url.us-east-1.on.aws/?link=${link}`
      );
      navigate('/ad-copy', { state: { response: response.data } }); // Pass response data to Loader component
    } catch (error) {
      console.error('Error submitting link:', error);
      setError('Error submitting link. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bgkk">
      {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-7000 p-4 mb-4 duration-1000 animate-pulse" role="alert">{error}</div>}
      <div className="text-center mb-12 transition-all duration-500">
        <h1 className="text-5xl font-extrabold mb-4 text-[#464645]">Ad Copy Generator Tool</h1>
        <p className="text-lg text-[#464645]">Enter a product link and create an ad copy for maximum engagement.</p>
      </div>
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="flex items-center bg-white border border-gray-300 rounded py-2 px-3 shadow-sm">
          <input
            type="text"
            placeholder="Enter product URL"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="appearance-none bg-white border-none w-full text-gray-700 py-2 px-2 leading-tight focus:outline-none"
          />
          <button
            type="submit"
            className="flex-shrink-0 bg-black hover:bg-gray-700 text-white py-2 px-4 rounded ml-2"
          >
            Generate
          </button>
        </div>
      </form>
    </div>
  );
};

export default Home;
