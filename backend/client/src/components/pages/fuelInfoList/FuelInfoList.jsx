import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from 'react-loader';


const FuelInfoList = () => {
  const [fuelInfo, setFuelInfo] = useState([]); // State to store fetched fuel info
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage errors
  useEffect(() => {
    const fetchFuelInfo = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/fuelInfoLists`, {
          withCredentials: true, // Include credentials if needed
        });
        setFuelInfo(response.data); // Set fetched data to state
      } catch (err) {
        console.error('Error fetching fuel info:', err);
        setError('Failed to fetch fuel information.'); // Set error message
      } finally {
        setLoading(false); // Stop loading regardless of success or error
      }
    };

    fetchFuelInfo(); // Call the fetch function
  }, []); // Empty dependency array to run once when the component mounts
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader type="ThreeDots" color="#4fa94d" height={80} width={80} /> {/* Adjust type, color, height, and width as needed */}
      </div>
    ); // Display loading indicator
  }

  if (error) {
    return <p className="text-red-500">{error}</p>; // Display error message
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur border-2 border-green-500 rounded-xl shadow-lg p-6 mx-4">
        <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">Saved Car Information</h2>
        <ul className="space-y-6">
          {fuelInfo.map((item, index) => (
            <li key={index} className="p-4 bg-gray-50 border border-green-400 rounded-lg shadow hover:bg-gray-100 transition-all">
              <div className="text-lg text-green-600 font-semibold mb-2">{item.carModel}</div>
              <div className="text-gray-700 space-y-1">
                <p><span className="font-medium text-green-500">Fuel Price: </span>${item.fuelPrice}</p>
                <p><span className="font-medium text-green-500">Fuel Needed: </span>${item.fuelNeeded}</p>
                <p><span className="font-medium text-green-500">Date & Time:</span> {new Date(item.dateTime).toLocaleString()}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FuelInfoList
