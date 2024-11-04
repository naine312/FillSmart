import { SignUp } from '@clerk/clerk-react'
import './signuppage.css';
import React from 'react'

const SignupPage = () => {
  return (
    <div  className="flex items-center justify-center w-full mt-20">
      <SignUp path='/sign-up' signInUrl="/sign-in"/>
    </div>
  )
}

export default SignupPage
