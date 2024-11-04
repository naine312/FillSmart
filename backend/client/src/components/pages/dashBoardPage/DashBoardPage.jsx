import { useAuth } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios
import { FaCar } from 'react-icons/fa';
import CarDetailsForm from '../CarDetailsForm/CarDetailsForm';
import Loader from 'react-loader';

const DashboardPage = () => {
  const [showForm, setShowForm] = useState(true);
  const [carInfo, setCarInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkCarDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/cars`, {
          withCredentials: true,
        });

        // Check if there are car details available
        if (response.data && response.data.length > 0) {
          setShowForm(false); // Hide the form if car details are found
          setCarInfo(response.data); // Set car info to the state
        }
      } catch (error) {
        console.error('Error fetching car details:', error.response ? error.response.data : error.message);
        setError('Failed to fetch car details.'); // Set error message for user feedback
      } finally {
        setLoading(false); // Stop loading state
      }
    };

    checkCarDetails(); // Call function to fetch car details on component mount
  }, []);

  const handleAddCarClick = () => {
    setShowForm(true); // Show the car details form
    setCarInfo([]); // Optionally clear existing car info
  };

  if (loading) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader type="ThreeDots" color="#4fa94d" height={80} width={80} /> {/* Adjust type, color, height, and width as needed */}
    </div>
  ); // Display loading indicator; // Show loading state
  }

  return (
    <>
      {showForm ? (
        <CarDetailsForm />
      ) : (
        <div className="flex flex-col items-center justify-center w-full mt-20">
          {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
          {carInfo.map(({ carId, carModel }) => (
            <Link to={`/dashboard/service/${carId}`} key={carId}>
              <div className="flex items-center justify-between bg-white p-8 rounded-full shadow-xl border-2 border-green-500 w-full max-w-lg mx-4 mb-4">
                <div className="text-green-600 font-bold text-xl">
                  {carModel} {/* Display car model */}
                </div>
                <FaCar className="text-green-600 text-3xl" />
              </div>
            </Link>
          ))}
          <button
            onClick={handleAddCarClick}
            className="mt-4 bg-green-500 text-white font-bold py-2 px-4 rounded-full hover:bg-green-600 transition duration-200"
          >
            Add a New Car
          </button>
        </div>
      )}
    </>
  );
}

export default DashboardPage;
