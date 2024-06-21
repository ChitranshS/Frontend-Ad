import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

const adCopyLines = [
  "Crafting compelling messages... please wait.",
  "Creativity is in the air. Generating your ad copy!",
  "Words that sell are on their way. Hold tight!",
  "Bringing your brand story to life... just a moment.",
  "Perfecting your pitch... generating ad copy now.",
  "Good things take time. Your ad copy is coming!",
  "Unleashing creativity... almost there!",
  "Transforming ideas into impactful ads... please wait.",
  "Where imagination meets persuasion. Generating now.",
  "Your brand voice is loading... stay tuned!",
  "Brewing brilliance... your ad copy is in progress.",
  "Words that win hearts are being crafted.",
  "Every great campaign starts with a great copy. Almost ready!",
  "Your brand's next big thing is loading...",
  "Infusing magic into your message... please wait.",
  "Crafting conversions... your ad copy is on the way.",
  "Creating connections through powerful words. Please wait.",
  "Mastering the art of persuasion... generating now.",
  "Your marketing success starts here. Loading your ad copy.",
  "Delivering creativity and strategy... please hold on."
];

const Loader = () => {
  const [adCopy, setAdCopy] = useState('');
  const [fade, setFade] = useState(true);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null); // Added state for error handling
  const location = useLocation();
  const navigate = useNavigate();
  const url = location.state?.url;

  useEffect(() => {
    if (url) {
      fetchAdCopy(url);
    }
  }, [url]);

  const fetchAdCopy = async (url) => {
    try {
      const response = await axios.get(
        `https://76loymajsa2d3m6bmsgzsmuvni0zgaaw.lambda-url.us-east-1.on.aws/?link=${url}`
      );
      setResponse(response.data);
      setError(null); // Clear error state if successful
    } catch (error) {
      console.error('Error fetching ad copy:', error);
      setError(`Failed to load ad copy. Error code: ${error.response?.status}`); // Set error state with response code
    }
  };

  const handleRegenerate = () => {
    if (url) {
      setResponse(null); // Clear current response
      setError(null); // Clear error state
      fetchAdCopy(url);
    }
  };

  const generateAdCopy = () => {
    setFade(false);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * adCopyLines.length);
      setAdCopy(adCopyLines[randomIndex]);
      setFade(true);
    }, 1000);
  };

  useEffect(() => {
    generateAdCopy();
    const interval = setInterval(generateAdCopy, 8000);
    return () => clearInterval(interval);
  }, []);

  const renderAdCopy = () => {
    if (response && response.ad_copy) {
      const adCopySections = response.ad_copy.split("\n\n");
      const cards = [];
      let currentCard = [];

      adCopySections.forEach((section, index) => {
        if (section.startsWith("**") && !section.includes("**Headline:**") && !section.includes("**Subheadline:**") && !section.includes("**Body:**") && !section.includes("**Engagement Hooks:**") ) {
          if (currentCard.length > 0) {
            cards.push(currentCard);
            currentCard = [];
          }
          currentCard.push(<h2 key={index} className="text-xl font-bold mb-2">{section.replace(/\*\*/g, '')}</h2>);
        } else {
          currentCard.push(<ReactMarkdown key={index}>{section}</ReactMarkdown>);
        }
      });

      if (currentCard.length > 0) {
        cards.push(currentCard);
      }

      return cards.slice(1).map((cardContent, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 mb-4">
          {cardContent}
        </div>
      ));
    }
    return null;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {response ? (
        <div className="w-full max-w-7xl p-4">
          <h3 className="text-4xl font-bold mt-6 mb-6 text-center">Generated Copy</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {renderAdCopy()}
          </div>
          <div className="flex justify-center mt-6 space-x-3">
            <button onClick={() => navigate('/')} className="p-2 bg-black text-white rounded">
              Go Back
            </button>
            <button onClick={handleRegenerate} className="p-2 bg-black text-white rounded">
              Regenerate
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white p-10 rounded-lg shadow-lg text-center max-w-md w-full border border-gray-200">
          <div className="flex justify-center mb-4">
            <div className="loader"></div>
          </div>
          <p className={`mt-4 text-lg font-semibold text-gray-700 transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
            {adCopy}
          </p>
          {error && <p className="mt-4 text-lg font-semibold text-red-500">{error}</p>} // Display error message if error state is set
        </div>
      )}
    </div>
  );
};

export default Loader;
