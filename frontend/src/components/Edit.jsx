import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Edit = (soundslip) => {
  const [editForm, setEditForm] = useState(soundslip.soundslip)
  let navigate = useNavigate()

  function handleSubmit(e){
    e.preventDefault()
    // async submit form
    console.log(editForm)
    // navigate('/profile', { replace: true })
  }
  console.log(editForm)
  function handleChange(e){
    if(e.target.name === "public"){
      setEditForm(oldValues => {
        return {
          ...oldValues,
          public: !oldValues.public
        }
      })
    }else{
      setEditForm(oldValues => {
        return {
        ...oldValues,
        [e.target.name]: e.target.value
      }
      })
    }
  }
  return(
    <div className="edit-container">
      <form className="edit-form">
        <label>Title<input type="text" name="title" value={editForm.title} onChange={handleChange} placeholder={editForm.title}></input></label>
        <label>Description<input type="textarea" name="body" value={editForm.body} onChange={handleChange}></input></label>
        <label>Private<input type="checkbox" name="public" value={editForm.public} onChange={handleChange}></input></label>
        <input type="submit" onClick={e => handleSubmit(e)} value="save changes"></input>
      </form>
    </div>
  )
}
export default Edit
