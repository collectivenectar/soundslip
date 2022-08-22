import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { isLoaded, isSignedIn, useUser } from '@clerk/clerk-react'
import axios from 'axios'


const UserResults = ({soundslip}) => {
  let pubSlip = soundslip.public === true? "public": "private"
  return (
    <div className="soundslip-cell">
      <h2>{soundslip && soundslip.title}</h2>
      <h3>{soundslip && soundslip.body}</h3>
      <h3>{soundslip && pubSlip}</h3>
      <h3>{soundslip && soundslip.createdAt}</h3>
      <button>Edit Details</button>
      <button>Delete</button>
    </div>
  )
}

export default UserResults
