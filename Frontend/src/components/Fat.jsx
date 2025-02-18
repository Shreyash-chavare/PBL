import React from 'react'
import './Fat.css'

const Fat = () => {
  return (
    <div className='fat'>
      <div className="textbox pt-36 pl-20">
        <h1>Code</h1>
        <h1>Compile</h1>
        <h1>Collaborate</h1>
        <div className="buttons flex gap-5 pt-5 pl-2">
            <button>Start Collaborating</button>
            <button>Practice</button> 
        </div>
      </div>
      
      <div className="image"></div>
    </div>
  )
}

export default Fat
