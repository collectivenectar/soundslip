import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { isLoaded, isSignedIn, useUser } from '@clerk/clerk-react'

import UserResults from './UserResults'

const baseUrl = "http://localhost:3000"

const ManageSoundslips = () => {
  const { isLoaded, isSignedIn, user } = useUser()
  const [soundslips, setSoundslips] = React.useState(false)
  const userId = !isLoaded || !isSignedIn ? null: user.id;

  React.useEffect(() => {
    axios.post(baseUrl + '/profile/', {id: userId})
      .then(function(response) {
        setSoundslips(response.data)
      })
  }, [])
  return (
    <div className="all-user-soundslips">
      <section className="public-soundslips">
      <h2>Public Uploads</h2>
      <div>{soundslips && soundslips.map(soundslip => {
        if(soundslip.public){
          return (
            <UserResults key={soundslip._id} soundslip={soundslip}/>
          )
        }
      })}</div>
      </section>
      <section className="private-soundslips">
        <h2>Private Uploads</h2>
        <div>{soundslips && soundslips.map(soundslip => {
          if(!soundslip.public){
            return (
              <UserResults key={soundslip._id} soundslip={soundslip}/>
            )
          }
        })}</div>
      </section>
    </div>

  )
}

export default ManageSoundslips
