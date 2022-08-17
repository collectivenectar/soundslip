import {useState} from 'react'

const AddSoundslip = () => {
  const [soundslipForm, setSoundslipForm] = useState({
    title: "",
    body: "",
    status: "",
    createdAt: new Date()
  })
  console.log(soundslipForm)
  const updateForm = (e) => {
    setSoundslipForm(prevForm => {
      return {
        ...prevForm,
        [e.target.name]: e.target.value
      }
    })
  }
  return (
    <form className="create-new">
      <h3>Upload your own sample</h3>
      <label>Sample Title:</label>
      <input type="text" name="title" onChange={(e) => updateForm(e)}></input>
      <input type="text" name="body" onChange={(e) => updateForm(e)}></input>
      <input type="text" name="status" onChange={(e) => updateForm(e)}></input>
    </form>
  )
}
export default AddSoundslip
