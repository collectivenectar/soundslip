import React, {useEffect} from 'react'
import AddSoundslip from '../AddSoundslip'
import {SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react'

const Upload = () => {
  return(
    <div>
    <SignedIn>
      <h2>Upload a new sample</h2>
      < AddSoundslip />
    </SignedIn>
    <SignedOut>
      <RedirectToSignIn />
    </SignedOut>
    </div>
  )
}

export default Upload
