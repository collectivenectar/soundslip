import React from 'react'

import ManageSoundslips from '../partials/profile/ManageSoundslips'

import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react'

// * Home page will have more features, for the moment just ManageSoundslips.
// * Features in Home will be related to private samples, privately shared samples,
// * And encrypting/decrypting files to and from the back end (p2p? or private?)

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

