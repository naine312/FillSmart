import React, { useState } from 'react'
import "./rootLayout.css"
import Logo from "../../../assets/images/FillSmart_Logo-removebg-preview.png"
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import { Link, Outlet } from 'react-router-dom';
import { ClerkProvider, SignedIn, UserButton } from '@clerk/clerk-react';
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}
const RootLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <div>
      <header className="flex items-center justify-between bg-white p-2 shadow">
        {/* Hamburger Icon */}
        <div className="flex items-center">
          <button onClick={toggleSidebar} className="text-green-600">
            <FaBars size={24} />
          </button>
        </div>

        {/* App Logo and Name */}
        <div className="flex items-center mx-auto">
          <img
            src={Logo}
            alt="FillSmart Logo"
            className="w-12 h-12"
          />
          <h1 className="text-xl font-bold text-green-600">FillSmart</h1>
        </div>

        {/* User Icon */}
        <div className="flex items-center">
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </header>

      {/* Sidebar with Overlay */}
      <div className={`fixed inset-0 z-40 ${isSidebarOpen ? 'block' : 'hidden'}`}>
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={closeSidebar}
        ></div>
        <aside
          className={`fixed top-0 left-0 h-full bg-gray-100 shadow-md transform ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out w-64 z-50 overflow-y-auto`}
        >
          <div className="flex justify-between items-center p-4">
            <h2 className="text-lg font-semibold text-green-600">Menu</h2>
            <button onClick={closeSidebar} className="text-gray-600 hover:text-gray-800">
              <FaTimes size={20} />
            </button>
          </div>
          <ul className="space-y-4 p-4">
            <li>
              <Link
                onClick={closeSidebar}
                to="/dashboard"
                className="block p-2 text-gray-700 hover:text-green-600 hover:bg-gray-200 rounded-md transition-colors duration-150"
              >
                Service
              </Link>
            </li>
            <li>
              <Link
                onClick={closeSidebar}
                to="/dashboard/fuelInfoLists"
                className="block p-2 text-gray-700 hover:text-green-600 hover:bg-gray-200 rounded-md transition-colors duration-150"
              >
                History
              </Link>
            </li>
          </ul>
        </aside>
      </div>

      <main>
        <Outlet />
      </main>
    </div>
  </ClerkProvider>
  )
}

export default RootLayout
