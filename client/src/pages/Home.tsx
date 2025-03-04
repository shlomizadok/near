import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-8 container mx-auto px-4">
      <div className="flex justify-center">
        <div className="w-full md:w-2/3 lg:w-1/2">
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to NEAR Framework</h1>
            <p className="text-xl text-gray-600 mb-8">
              A modern full-stack framework built with Node.js, Express, Apollo GraphQL, and React
            </p>
            <div className="space-x-4">
              <button onClick={() => navigate('/signup')} className="btn-primary">
                Get Started
              </button>
              <button onClick={() => navigate('/login')} className="btn-secondary">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
