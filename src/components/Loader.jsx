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
  const location = useLocation();
  const navigate = useNavigate();
  const response = location.state?.response;

  useEffect(() => {
    const generateAdCopy = () => {
      setFade(false); // Start fading out
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * adCopyLines.length);
        setAdCopy(adCopyLines[randomIndex]);
        setFade(true); // Start fading in
      }, 500); // 500ms fade out duration
    };

    generateAdCopy();
    const interval = setInterval(generateAdCopy, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center max-w-md w-full border border-gray-200">
        {response ? (
          <div>
            <h3 className="text-xl font-bold mb-4">Response Received:</h3>
            <p>{response.message}</p>
            <button onClick={() => navigate('/')} className="mt-4 p-2 bg-blue-600 text-white rounded">
              Go Back
            </button>
          </div>
        ) : (
          <div>
            <div className="flex justify-center mb-4">
              <div className="loader"></div>
            </div>
            <p className={`mt-4 text-lg font-semibold text-gray-700 transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
              {adCopy}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Loader;
