import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RootLayout from './components/layouts/rootLayout/RootLayout.jsx';
import Homepage from './components/pages/homepage/Homepage.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SigninPage from './components/pages/signinpage/SigninPage.jsx';
import SignupPage from './components/pages/signuppage/SignupPage.jsx';
import DashBoardPage from './components/pages/dashBoardPage/DashBoardPage.jsx';
import DashBoardLayout from './components/layouts/dashBoardLayout/DashBoardLayout.jsx';
import ServicePage from './components/pages/servicePage/ServicePage.jsx';
import FuelPage from './components/pages/fuelPage/FuelPage.jsx';
import DistancePage from './components/pages/distancePage/DistancePage.jsx';
import FuelInfoList from './components/pages/fuelInfoList/FuelInfoList.jsx';
const router = createBrowserRouter([
  {
   element: <RootLayout/>,
   children:[
    { path:"/", element:<Homepage/>},
    { path:"/sign-in/*", element:<SigninPage/>},
    { path:"/sign-up/*", element:<SignupPage/>,},
    { 
      path: "dashboard",
      element:<DashBoardLayout/>,  // Keeping dashboard routes under RootLayout
      children: [
        { path: '/dashboard', element: <DashBoardPage/> },
        { path: '/dashboard/fuelInfoLists', element: <FuelInfoList/> },
        { path: '/dashboard/service/:carId', element: <ServicePage/> },
        { path: '/dashboard/service/:carId/fuel', element: <FuelPage/> },
        { path: '/dashboard/service/:carId/distance', element: <DistancePage/> },
      ],
    },
   
  ]
  },
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
