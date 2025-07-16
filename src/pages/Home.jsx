import React from 'react';
import { useNavigate } from 'react-router-dom';
import carBg from '../assets/car-bg.jpeg';


export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center text-white px-6"
      style={{
        backgroundImage: `url(${carBg})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0" />

      {/* Content */}
      <div className="z-10 text-center">
        <h1 className="text-5xl font-extrabold drop-shadow-md mb-6">
          3D Car Trunk Packing Optimizer
        </h1>

        <h2 className="text-xl font-medium mb-4">By Team Autobots</h2>

        <ul className="mb-8 text-lg space-y-1">
          <li>Guha Pranav Yelchuru</li>
          <li>Ramakrishnan S</li>
          <li>Karthik V</li>
          <li>Kushagra Singh Gaur</li>

        </ul>

        <button
          onClick={() => navigate('/app')}
          className="mt-4 px-8 py-4 bg-blue-600 hover:bg-blue-700 transition rounded-xl text-white text-lg shadow-lg"
        >
          Proceed to App →
        </button>
      </div>
    </div>
  );
}
