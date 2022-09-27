import React, {useEffect, createContext} from 'react'
import axios from 'axios'
import Results from '../partials/library/Results'
import Searchbar from '../partials/library/Searchbar'
import { ClerkProvider, SignedIn, SignedOut, UserButton, useUser, RedirectToSignIn } from '@clerk/clerk-react'

const url = "http://localhost:3000"

export const EditContext = createContext(null)

const Library = () => {
  const [soundslips, setSoundslips] = React.useState(false)
  const [soundPlaying, setSoundPlaying] = React.useState(0)
  const { isLoaded, isSignedIn, user } = useUser()
  const userId = !isLoaded || !isSignedIn ? null: user.id;

  React.useEffect(() => {
    axios.get(url + '/soundslips/')
      .then(function(response) {
        setSoundslips(response.data)
        let allSlipsState = {}
        for(let slip = 0; slip < response.data.length; slip++){
          allSlipsState[response.data[slip]._id] = false
        }
        setSoundPlaying(oldValue => allSlipsState)
      })
  }, [])
  return (
    <div className="library">
      <SignedIn>
        <Searchbar/>
        <EditContext.Provider value={{soundPlaying, setSoundPlaying, userId}}>
        <div className="slip-cell-container">
          {soundslips && soundslips.map(soundslip => {
            return (
              <Results key={soundslip._id} soundslip={soundslip}/>
            )
          })}
        </div>
        </EditContext.Provider>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn/>
      </SignedOut>
    </div>
  )
}
export default Library
