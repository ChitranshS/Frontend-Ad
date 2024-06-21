import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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
  const [timeTaken, setTimeTaken] = useState(0); // Added state for time taken
  const location = useLocation();
  const navigate = useNavigate();
  const response = location.state?.response;

  useEffect(() => {
    const generateAdCopy = () => {
      setFade(false); // Start fading out
      const startTime = performance.now(); // Start measuring time
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * adCopyLines.length);
        setAdCopy(adCopyLines[randomIndex]);
        setFade(true); // Start fading in
        const endTime = performance.now(); // Stop measuring time
        setTimeTaken(endTime - startTime); // Calculate time taken
      }, 500); // 500ms fade out duration
    };

    generateAdCopy();
    const interval = setInterval(generateAdCopy, 5000);

    return () => clearInterval(interval);
  }, []);

  const renderAdCopy = () => {
    if (response && response.ad_copy) {
      const adCopySections = response.ad_copy.split("\n\n");
      const cards = [];
      let currentCard = [];

      adCopySections.forEach((section, index) => {
        if (section.startsWith("**")) {
          if (currentCard.length > 0) {
            cards.push(currentCard);
            currentCard = [];
          }
          currentCard.push(<h4 key={index} className="font-bold mb-2">{section.replace(/\*\*/g, '')}</h4>);
        } else {
          currentCard.push(<p key={index} className="mb-2">{section}</p>);
        }
      });

      if (currentCard.length > 0) {
        cards.push(currentCard);
      }

      return cards.map((cardContent, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 mb-4 w-full md:w-1/2 lg:w-1/3">
          {cardContent}
        </div>
      ));
    }
    return null;
  };

  return (
    <div className="flex flex-wrap items-start justify-center h-screen bg-gray-100 p-4 overflow-auto">
      {response ? (
        <div className="w-full flex flex-wrap justify-center">
          <h3 className="w-full text-xl font-bold mb-4 text-center">Ad Copy Generated:</h3>
          {renderAdCopy()}
          <div className="w-full flex justify-center mt-4">
            <button onClick={() => navigate('/')} className="p-2 bg-blue-600 text-white rounded">
              Go Back
            </button>
          </div>
          <p className="text-gray-600 mt-4">Time taken: {timeTaken.toFixed(2)} ms</p> {/* Display time taken */}
        </div>
      ) : (
        <div className="bg-white p-10 rounded-lg shadow-lg text-center max-w-md w-full border border-gray-200">
          <div className="flex justify-center mb-4">
            <div className="loader"></div>
          </div>
          <p className={`mt-4 text-lg font-semibold text-gray-700 transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
            {adCopy}
          </p>
        </div>
      )}
    </div>
  );
};

export default Loader;
