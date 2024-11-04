import { SignIn } from '@clerk/clerk-react'
import "./signinpage.css";
import React from 'react'

const SigninPage = () => {
  return (
    <div className="flex items-center justify-center w-full mt-20">
      <SignIn path="/sign-in" signUpUrl="/sign-up" forceRedirectUrl="/"/>
    </div>
  )
}

export default SigninPage
