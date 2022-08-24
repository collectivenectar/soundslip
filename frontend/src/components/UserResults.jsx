import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { isLoaded, isSignedIn, useUser } from '@clerk/clerk-react'
import axios from 'axios'
import { Edit } from './Edit'

const baseUrl = "http://localhost:3000"

const UserResults = ({soundslip}) => {
  return (
    <div className="soundslip-container">
      <div>
      <h2 className="soundslip-title">{soundslip && soundslip.title}</h2>
      <h3 className="soundslip-desc">{soundslip && soundslip.body}</h3>
      <h3 className="soundslip-date">{soundslip && soundslip.createdAt}</h3>
      </div>
      <div>
      <button className="soundslip-edit">Edit Details</button>
      <button className="soundslip-delete">Delete</button>
      </div>
    </div>
  )
}

export default UserResults
