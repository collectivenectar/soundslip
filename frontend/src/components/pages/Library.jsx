import React from 'react'
import axios from 'axios'
import Results from '../Results'
import Searchbar from '../Searchbar'
import { ClerkProvider, SignedIn, SignedOut, UserButton, useUser, RedirectToSignIn } from '@clerk/clerk-react'

const url = "http://localhost:3000"
// axios.defaults.baseURL = 'http://myurl';
// axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

const Library = () => {
  const [soundslips, setSoundslips] = React.useState(false)
  React.useEffect(() => {
    axios.get(url + '/soundslips/')
      .then(function(response) {
        setSoundslips(response.data)
      })
  }, [])
  return (
    <div className="library">
      <SignedIn>
        <Searchbar/>
        <div className="slip-cell-container">
          {soundslips && soundslips.map(soundslip => {
            return (
              <Results key={soundslip._id} soundslip={soundslip}/>
            )
          })}
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn/>
      </SignedOut>
    </div>
  )
}
export default Library

// {soundslips && soundslips.map(soundslip => {
//   return (
//     <div key={soundslip._id}>{soundslip.body}</div>
//   )
// })}