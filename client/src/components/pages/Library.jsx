import React, { useEffect, createContext } from 'react'

import Results from '../partials/library/Results'
import Searchbar from '../partials/library/Searchbar'

import { toast } from 'react-toastify'
import { ClerkProvider, SignedIn, SignedOut, useUser, RedirectToSignIn } from '@clerk/clerk-react'
import axios from 'axios'

const baseUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL

export const EditContext = createContext(null)

//  * Library is the search page of the app, where you find, play, and download public samples.
//  * On first load, calls to backend api for all public samples, otherwise can search for "" to
//  * get the same as first load.

const Library = () => {
  const [ soundslips, setSoundslips ] = React.useState(false)
  const { isLoaded, isSignedIn, user } = useUser()

  const toastTemplate = (msg) => toast(msg)
  const userId = !isLoaded || !isSignedIn ? null: user.id;

  React.useEffect(() => {
    axios.get(baseUrl + '/soundslips/')
      .then(function(response) {
        setSoundslips(response.data)
      })
      .catch(err =>{
        toastTemplate("public results not working...")
      })
  }, [])

  return (
    <div className="library">
      <SignedIn>
        <EditContext.Provider value={{ soundslips, setSoundslips, userId }}>
          <Searchbar/>
            { !soundslips.length && (<a className="bad-search-response" >No results for that search</a>) }
            { soundslips.length && <div className="lib-slip-container">
              { soundslips.map(soundslip => {
                return (
                    <Results key={soundslip._id} soundslip={soundslip}/>
                )
                }) 
              }
            </div>
            }
        </EditContext.Provider>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn/>
      </SignedOut>
    </div>
  )
}
export default Library
