import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Logo from '../assets/Logo';

const DemoPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f6f3ff] to-[#f9f5ff] text-gray-800">
      {/* Header */}
      <header className="container mx-auto px-6 py-4 flex justify-between items-center border-b border-gray-200">
        <div className="flex items-center">
          <Link to="/" className="flex items-center mr-8 hover:text-[#8a3aff] transition">
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center">
            <Logo size={45} />
            <span className="text-lg font-bold ml-2 text-[#8a3aff]">OBAM AI Demo</span>
          </div>
        </div>
        <div>
          <Link to="/register" className="bg-[#8a3aff] hover:bg-[#7b2fff] px-4 py-2 rounded-lg transition text-white">
            Sign Up
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 flex flex-col items-center">
        {/* Video Container */}
        <div className="w-full max-w-4xl aspect-video mb-10 rounded-xl overflow-hidden shadow-lg">
          <iframe 
            width="100%" 
            height="100%" 
            src="https://www.youtube.com/embed/ZK-rNEhJIDs?autoplay=1&mute=1" 
            title="OBAM AI Product Demo" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowFullScreen
          ></iframe>
        </div>

        {/* Get Started Button */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Ready to experience the power of LLM observability?</h2>
          <Link to="/register" className="bg-[#8a3aff] hover:bg-[#7b2fff] px-8 py-4 rounded-lg text-lg font-semibold flex items-center justify-center transition text-white inline-flex mx-auto">
            Get Started <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-6 border-t border-gray-200 mt-auto">
        <div className="container mx-auto px-6">
          <div className="flex justify-center items-center">
            <div className="flex items-center">
              <Logo size={35} />
              <span className="text-sm font-bold ml-2 text-[#8a3aff]">OBAM AI</span>
            </div>
            <p className="text-gray-500 ml-2 text-sm">© 2025 OBAM AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DemoPage; 