import React from 'react'

import AddSoundslip from '../partials/upload/AddSoundslip'

import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react'

// * Page where sample uploads happen. Currently just the AddSoundslip but after MVP
// * there is one other feature and that's to upload only a reference to a file, and
// * have the file hosted elsewhere (p2p? central hosting?)

const Upload = () => {
  
  return(
    <div className="upload">
      <SignedIn>
        <div className="upload-container">
          <h2>Upload a new sample</h2>
          < AddSoundslip />
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  )
}

export default Upload