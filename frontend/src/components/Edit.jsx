import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Edit = (props) => {
  const { editForm, setEditForm } = useEffect(props)

  let navigate = useNavigate()

  function handleSubmit(e){
    e.preventDefault()
    // async submit form
    navigate('/profile', { replace: true })
  }

  // function handleChange(e){
  //   if(e.target.name === "public"){
  //     setEditForm(oldValues => {
  //       return {
  //         ...oldValues,
  //         public: !prevForm.public
  //       }
  //     })
  //   }else{
  //     setEditForm(oldValues => {
  //       ...oldValues,
  //       [e.target.name]: e.value
  //     })
  //   }
  // }
  return(
    <div className="edit-container">
      <form className="edit-form">
        <input type="text" name="title" value={props.title} onChange={handleChange}></input>
        <input type="text" name="body" value={props.body} onChange={handleChange}></input>
        <input type="checkbox" name="public" value={props.public} onChange={handleChange}></input>
        <input type="submit" onSubmit={handleSubmit}></input>
      </form>
    </div>
  )
}
export default Edit
