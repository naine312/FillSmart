import { useAuth } from '@clerk/clerk-react';
import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';

const DashBoardLayout = () => {
  const {userId, isLoaded} = useAuth();
  const navigate  = useNavigate();
  useEffect(()=>{
    if (isLoaded && !userId)
    {
      navigate("/sign-in")
    }
  },[isLoaded,  userId, navigate])


  return (
    <div className="min-h-screen bg-gradient-to-r from-green-300 via-green-400 to-green-500 flex flex-col items-center justify-center">
    <Outlet/>
    </div>
  )
}

export default DashBoardLayout
