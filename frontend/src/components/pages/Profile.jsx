import React from 'react'
import AddSoundslip from '../AddSoundslip'
import {SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react'
import ManageSoundslips from '../ManageSoundslips'

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
