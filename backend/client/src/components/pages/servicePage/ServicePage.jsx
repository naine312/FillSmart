import React from 'react';
import { BsFillFuelPumpFill } from "react-icons/bs";
import { GiPathDistance } from "react-icons/gi";
import { IoAddCircleSharp } from "react-icons/io5";
import { Link, useParams } from 'react-router-dom';

const ServicePage = () => {
  const { carId } = useParams(); // Simplified destructuring
  console.log(carId);

  return (
    <div className="flex flex-col items-center justify-center w-full mt-24 space-y-8">
      <Link to={`/dashboard/service/${carId}/fuel`} aria-label="Calculate Gas Needed">
        <div
          className={`p-6 w-72 rounded-xl shadow-lg flex flex-col items-center justify-center bg-white transition-all cursor-pointer 
          hover:shadow-2xl transform hover:scale-105`}
        >
          <BsFillFuelPumpFill className="w-16 h-16 mb-4" />
          <span className="text-lg font-semibold text-green-700">Calculate Gas Needed</span>
        </div>
      </Link>

      {/* Uncomment if needed in the future
      <Link to={`/dashboard/service/${carId}/distance`} aria-label="Fuel Needed for Distance">
        <div
          className={`p-6 w-72 rounded-xl shadow-lg flex flex-col items-center justify-center bg-white transition-all cursor-pointer 
          hover:shadow-2xl transform hover:scale-105`}
        >
          <GiPathDistance className="w-16 h-16 mb-4" />
          <span className="text-lg font-semibold text-green-700">Fuel Needed for Distance</span>
        </div>
      </Link> 
      */}

      <Link to={`/dashboard`} aria-label="Add New Car">
        <div
          className={`p-6 w-72 rounded-xl shadow-lg flex flex-col items-center justify-center bg-white transition-all cursor-pointer 
          hover:shadow-2xl transform hover:scale-105`}
        >
          <IoAddCircleSharp className="w-16 h-16 mb-4" />
          <span className="text-lg font-semibold text-green-700">Add New Car</span>
        </div>
      </Link>
    </div>
  );
}

export default ServicePage;
