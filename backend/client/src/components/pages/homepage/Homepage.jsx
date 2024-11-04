import React from 'react'
import './homePage.css';
import BG from "../../../assets/images/FillSmart_BG.jpeg"
import { Link } from 'react-router-dom';
const Homepage = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${BG})` }}>
    {/* Overlay */}
    <div className="absolute inset-0 bg-black opacity-55" /> {/* Semi-transparent overlay */}
    
    <div className="text-center relative z-10"> {/* z-10 to keep text above the overlay */}
      <h1 className="text-4xl font-bold text-white mb-2">FillSmart</h1>
      <h2 className="text-2xl text-white mb-6">"Filling Up, Made Simple."</h2>
      <Link to="/dashboard">
      <button className="bg-green-500 text-white py-2 px-4 rounded shadow hover:bg-green-600 transition duration-300">
      Get Started
    </button>
    </Link>
    </div>
  </div>
  )
}

export default Homepage
