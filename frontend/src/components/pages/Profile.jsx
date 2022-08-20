import React from 'react'
import AddSoundslip from '../AddSoundslip'
import { ClerkProvider, SignedIn, SignedOut, UserButton, useUser, RedirectToSignIn } from '@clerk/clerk-react'

const Home = () => {
  return (

    <div className="home">
      <SignedIn>
        <h2>Profile</h2>
        <AddSoundslip />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn/>
      </SignedOut>
    </div>
  )
}
export default Home
