import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const FuelPage = () => {
  const fuelLevelRef = useRef();
  const fuelPriceRef = useRef();
  const { carId } = useParams(); // Simplified destructuring
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Use navigate for potential redirection

  const fuelLevels = [
    "Between 0% and 25%",
    "25%",
    "Between 25% and 50%",
    "50%",
    "Between 50% and 75%",
    "75%",
    "Between 75% and 100%"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const selectedFuelLevel = fuelLevelRef.current.value;
    const fuelPriceValue = fuelPriceRef.current.value;

    // Basic validation
    if (fuelPriceValue <= 0) {
      setErrorMessage("Please enter a valid fuel price.");
      setLoading(false);
      return;
    }

    const fuelData = {
      carId,
      currentFuelLevel: selectedFuelLevel,
      fuelPrice: fuelPriceValue,
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/fuel`, fuelData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(response.data);
      setMessage(`Fuel Needed: ${response.data.fuelNeeded} dollars for ${response.data.carModel}.`);
      setErrorMessage('');
    } catch (error) {
      console.error('Error saving fuel level:', error.response ? error.response.data : error.message);
      setErrorMessage('Failed to save fuel level. Please try again.');
    }finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  };

  return (
    <div className="p-6 w-80 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-center text-green-600 mb-4">
        Select Your Current Fuel Level
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Fuel Level Select */}
        <select
          className="w-full p-2 border border-gray-300 rounded-md mb-6"
          ref={fuelLevelRef}
          required
        >
          <option value="" disabled>Select Fuel Level</option>
          {fuelLevels.map((level, index) => (
            <option key={index} value={level}>{level}</option>
          ))}
        </select>

        {/* Fuel Price Input */}
        <h2 className="text-xl font-bold text-center text-green-600 mb-4">
          Current Fuel Price in Liters
        </h2>
        <input
          type="number"
          step="0.001"
          placeholder="(e.g., 145.9 = 1.459) "
          className="w-full p-2 border border-gray-300 rounded-md mb-6"
          name="fuelPrice"
          required
          ref={fuelPriceRef}
        />

        {loading ? (
          <div className="flex justify-center mb-4">
            <div className="animate-spin h-5 w-5 border-4 border-green-600 rounded-full border-t-transparent"></div>
            <span className="ml-2">Loading...</span>
          </div>
        ) : (
          message && (
            <h2 className="text-xl font-bold text-center text-green-600 mb-4">
              {message}
            </h2>
          )
        )}
        
        {errorMessage && (
          <h2 className="text-xl font-bold text-center text-red-600 mb-4">
            {errorMessage}
          </h2>
        )}
        
        {/* Save Button */}
        <div className="mt-6 flex justify-center">
          <button
            className="bg-green-600 text-white py-2 px-6 rounded-md shadow hover:bg-green-500 transition-all"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default FuelPage;
