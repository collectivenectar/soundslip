import React from 'react'
import {SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react'
import ManageSoundslips from '../partials/profile/ManageSoundslips'

const Home = () => {
  return (
    <div className="home">
      <SignedIn>
        <ManageSoundslips />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn/>
      </SignedOut>
    </div>
  )
}


export default Home
