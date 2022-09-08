import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const baseUrl = "http://localhost:3000"

const Edit = (soundslip) => {
  const [editForm, setEditForm] = useState(soundslip.soundslip)
  let navigate = useNavigate()

  function handleSubmit(e){
    e.preventDefault()
    // async submit form
    console.log(editForm._id)
    axios.put(baseUrl + `/soundslips/${editForm._id}`, editForm)
      .then(response => {
        console.log(response)
      })
    // navigate('/profile', { replace: true })
  }
  function handleChange(e){
    const {name, value, type, checked} = e.target
    setEditForm(oldValues => {
        return {
        ...oldValues,
        [name]: type === "checkbox" ? checked: value
      }
      })
  }
  return(
    <div className="edit-container">
      <form className="edit-form">
        <label>Title<input type="text" name="title" value={editForm.title} onChange={handleChange} placeholder={editForm.title}></input></label>
        <label>Description<input type="textarea" name="body" value={editForm.body} onChange={handleChange}></input></label>
        <label>Private<input type="checkbox" name="public" checked={editForm.public} onChange={handleChange}></input></label>
        <input type="submit" onClick={e => handleSubmit(e)} value="save changes"></input>
      </form>
    </div>
  )
}
export default Edit
