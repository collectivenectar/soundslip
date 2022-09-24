import React from 'react'

const Results = ({soundslip}) => {
  return (
    <div className="soundslip-container">
      <i className="fa-solid fa-circle-play"></i>
      <div className="pub-results">
        <h2 className="soundslip-belongs">{soundslip && soundslip.userName}</h2>
        <h2 className="soundslip-title">{soundslip && soundslip.title}</h2>
        <h3 className="soundslip-desc">{soundslip && soundslip.body}</h3>
        <h3 className="soundslip-date">{soundslip && soundslip.createdAt}</h3>
        </div>
        <div>
      <button className="download">Download</button>
      </div>
    </div>
  )
}

export default Results
