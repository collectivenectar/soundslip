import React, { useState, createContext } from 'react'
import axios from 'axios'
import { isLoaded, isSignedIn, useUser } from '@clerk/clerk-react'
import UserResults from './UserResults'

const baseUrl = "http://localhost:3000"
export const EditContext = createContext(null)

const ManageSoundslips = () => {
  // clerk imports
  const { isLoaded, isSignedIn, user } = useUser()
  // state for storing axios return value
  const [soundslips, setSoundslips] = React.useState(false)
  const [isEditing, setIsEditing] = React.useState({})
  const [formSubmit, setFormSubmit] = React.useState(0)
  // state management for audio players
  const [soundPlaying, setSoundPlaying] = React.useState(0)

  // storing userId information after loading, otherwise null
  const userId = !isLoaded || !isSignedIn ? null: user.id;

  // On first load or on change of formSubmit State, this function is run
  // It sets all soundslips edit status to false, which makes all edit forms invisible
  function setupEdit(soundslips) {
    let editStateArray = {}
    for(let each = 0; each < soundslips.length; each++){
      editStateArray[soundslips[each]._id] = false
    }
    setIsEditing(oldArray => editStateArray)
  }

  // upon loading of the profile and managesoundslips component, request all
  // user soundslips from the backend
  React.useEffect(() => {
    // calls to "/", route of '/profile/, passing in users ID
    axios.post(baseUrl + '/profile/', {id: userId})
      .then(function(response) {
        // adding all soundslips objects to the soundslips state
        setSoundslips(oldSlips => response.data)
        // setting all visibility for edit forms to hidden - init lifted state
        setupEdit(response.data)
        // setting all Player elements playing state to false - initializing lifted state
        let allSlipsState = {}
        for(let slip = 0; slip < response.data.length; slip++){
          allSlipsState[response.data[slip]._id] = false
        }
        setSoundPlaying(oldValue => allSlipsState)
      })
  }, [formSubmit])

  return (
    <div>
    <div className="all-user-soundslips">
      <section className="public-soundslips">
      <h2>Public Uploads</h2>
      <EditContext.Provider value={{isEditing, setIsEditing, setFormSubmit, soundPlaying, setSoundPlaying, userId}}>
      <div>{soundslips && soundslips.map(soundslip => {
        if(soundslip.public){
          return (
            <UserResults
            key={soundslip._id}
            soundslip={soundslip}
            />
          )
        }
      })}
        </div>
        </ EditContext.Provider>
      </section>
      <section className="private-soundslips">
        <h2>Private Uploads</h2>
        <EditContext.Provider value={{isEditing, setIsEditing, setFormSubmit, soundPlaying, setSoundPlaying, userId}}>
        <div>{soundslips && soundslips.map(soundslip => {
          if(!soundslip.public){
            return (
              <UserResults
              key={soundslip._id}
              soundslip={soundslip}
              />
            )
          }
        })}
          </div>
          </ EditContext.Provider>
      </section>
    </div>
    </div>
  )
}

export default ManageSoundslips
