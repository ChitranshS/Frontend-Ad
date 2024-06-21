import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Loader from './components/Loader';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <main className="flex-grow flex items-center justify-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/loader" element={<Loader />} />
          </Routes>
        </main>
        <footer className="bg-gray-800 text-white p-4 text-center">
          <p>&copy; 2024 Dynamic UI Application</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
