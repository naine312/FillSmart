import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CarDetailsForm = () => {
  const carModelRef = useRef(null);
  const tankCapacityRef = useRef(null);
  const fuelEfficiencyRef = useRef(null);
  const carAgeRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message

    const carDetails = {
      carModel: carModelRef.current.value,
      tankCapacity: tankCapacityRef.current.value,
      fuelEfficiency: fuelEfficiencyRef.current.value,
      carAge: carAgeRef.current.value,
    };

    setLoading(true); // Start loading state
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/cars`, carDetails, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(response.data);
      navigate(`/dashboard/service/${response.data.carId}`);
    } catch (error) {
      setError('Error adding car. Please try again.'); // Set error message
      console.error('Error adding car:', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false); // End loading state
    }
  };

  const handleReset = () => {
    carModelRef.current.value = '';
    tankCapacityRef.current.value = '';
    fuelEfficiencyRef.current.value = '';
    carAgeRef.current.value = '';
  };

  return (
    <div className="flex items-center justify-center w-full mt-20">
      <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm border-2 border-green-500 p-8 rounded-xl shadow-xl w-full max-w-lg mx-4">
        <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">Car Details Form</h2>

        {/* Error Message */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Input Fields */}
        <div className="mb-4">
          <label htmlFor="carModel" className="block text-green-600 mb-2">Car Model</label>
          <input type="text" name="carModel" ref={carModelRef} placeholder="Enter car model" required className="w-full p-3 border border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="tankCapacity" className="block text-green-600 mb-2">Fuel Tank Capacity (in liters)</label>
          <input type="number" name="tankCapacity" ref={tankCapacityRef} placeholder="Enter tank capacity" min="0" step="1" required className="w-full p-3 border border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="fuelEfficiency" className="block text-green-600 mb-2">Fuel Efficiency (km/l)</label>
          <input type="number" name="fuelEfficiency" ref={fuelEfficiencyRef} placeholder="Enter fuel efficiency" min="0.1" step="0.1" required className="w-full p-3 border border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="carAge" className="block text-green-600 mb-2">Car Age (in years)</label>
          <input type="number" name="carAge" ref={carAgeRef} placeholder="Enter car age (e.g., 2 months = 0.2)" min="0" step="0.1" required className="w-full p-3 border border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
        </div>

        {/* Buttons Section */}
        <div className="flex justify-between mt-6">
          <button type="submit" disabled={loading} className={`w-1/2 mr-2 ${loading ? 'bg-gray-400' : 'bg-green-500'} text-white p-3 rounded-lg font-semibold hover:bg-green-600 transition-all`}>
            {loading ? 'Saving...' : 'Save'}
          </button>
          <button type="button" onClick={handleReset} className="w-1/2 ml-2 bg-gray-300 text-gray-700 p-3 rounded-lg font-semibold hover:bg-gray-400 transition-all">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default CarDetailsForm;
