import {useState} from 'react'
import axios from 'axios'
import {isLoaded, isSignedIn, useUser} from '@clerk/clerk-react'

const baseUrl = "http://localhost:3000"

const AddSoundslip = () => {

  const { isLoaded, isSignedIn, user } = useUser()

  const userInfo = !isLoaded || !isSignedIn ? null : {userId: user.id, userName: user.username}
  const [soundslipForm, setSoundslipForm] = useState({
    title: "",
    body: "",
    public: false,
    userId: userInfo.userId,
    userName: userInfo.userName,
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
    axios.post(baseUrl + '/soundslips/', soundslipForm)
      .then(function(response) {

        //here needs to redirect based on response being positive
        //redirect to user profile to display public and private slips.
      })
  }

  return (
    <form className="create-new">
      <label>Sample Title:</label>
      <input type="text" name="title" onChange={(e) => updateForm(e)}></input>
      <input type="text" name="body" onChange={(e) => updateForm(e)}></input>
      <input type="checkbox" name="public" onChange={(e) => updateForm(e)}></input>
      <button onClick={handleSubmit}> </button>
      <div>{}</div>
    </form>
  )
}
export default AddSoundslip
