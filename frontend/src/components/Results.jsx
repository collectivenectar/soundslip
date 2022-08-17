import {Link} from 'react-router-dom'

const Results = ({soundslip}) => {
  return (
    <div className="soundslip-cell">
      <h2>{soundslip && soundslip.title}</h2>
      <h3>{soundslip && soundslip.body}</h3>
    </div>
  )
}

export default Results
