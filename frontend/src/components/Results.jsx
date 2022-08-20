import {Link} from 'react-router-dom'

const Results = ({soundslip}) => {
  let pubSlip = soundslip.public === true? "public": "private"
  return (
    <div className="soundslip-cell">
      <h2>{soundslip && soundslip.title}</h2>
      <h3>{soundslip && soundslip.body}</h3>
      <h3>{soundslip && pubSlip}</h3>
      <h3>{soundslip && soundslip.createdAt}</h3>
    </div>
  )
}

export default Results
