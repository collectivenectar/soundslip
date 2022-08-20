import {useState} from 'react'
import axios from 'axios'

const baseUrl = "http://localhost:3000"

const AddSoundslip = () => {
  const [soundslipForm, setSoundslipForm] = useState({
    title: "",
    body: "",
    public: false,
  })
  const updateForm = (e) => {
    if(e.target.name === "public"){
      setSoundslipForm(prevForm => {
        return {
          ...prevForm,
          public: !prevForm.public
        }
      })
    }else{
      setSoundslipForm(prevForm => {
        return {
          ...prevForm,
          [e.target.name]: e.target.value
        }
      })
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const soundslip = {
      method: 'POST',
      body: soundslipForm,
      headers: {
        'Content-Type': 'application/json'
      }
    }
    axios.post(baseUrl + '/soundslips/', soundslip)
      .then(function(response) {
        //here needs to redirect based on response being positive
        //redirect to user profile to display public and private slips.
      })
  }
  return (
    <form className="create-new">
      <h3>Upload your own sample</h3>
      <label>Sample Title:</label>
      <input type="text" name="title" onChange={(e) => updateForm(e)}></input>
      <input type="text" name="body" onChange={(e) => updateForm(e)}></input>
      <input type="checkbox" name="public" onChange={(e) => updateForm(e)}></input>
      <button onClick={handleSubmit}> </button>
    </form>
  )
}
export default AddSoundslip
