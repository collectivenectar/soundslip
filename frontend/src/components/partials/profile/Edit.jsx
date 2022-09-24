import React, { useState, useContext } from 'react'
import axios from 'axios'
import { EditContext } from './ManageSoundslips'
const baseUrl = "http://localhost:3000"

const Edit = (props) => {
  const [editForm, setEditForm] = useState(props.soundslip)
  const {isEditing, setIsEditing, setFormSubmit} = useContext(EditContext)

  function handleSubmit(e){
    e.preventDefault()
    axios.put(baseUrl + `/soundslips/${editForm._id}`, {...editForm})
      .then(response => {
        if(response.statusText === "OK"){
          setFormSubmit(submitted => submitted + 1)
        }else{
          console.log(response)
        }
      })
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

  function editSoundslip() {
    for(let each = 0; each < Object.keys(isEditing).length; each++){
      let visible = Object.keys(isEditing)[each]
      if(props.soundslip._id === visible){
        setIsEditing(oldState => ({
          ...oldState,
          [visible]: !oldState[visible]
        }))
      }else if(props.soundslip._id !== visible && isEditing[visible]){
        setIsEditing(oldState => ({
          ...oldState,
          [visible]: false
        }))
      }
    }
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
