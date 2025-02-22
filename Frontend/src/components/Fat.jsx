import React from 'react'
import './Fat.css'




const Fat = () => {
  const navigateToEJS = (route) =>{
    console.log(route)
    window.location.href = `/api/${route}`;
  }

  return (
    <div className='fat'>
      <div className="textbox pt-36 pl-20">
        <h1>Code</h1>
        <h1>Compile</h1>
        <h1>Collaborate</h1>
        <div className="buttons flex gap-5 pt-5 pl-2">
        <button onClick={() => navigateToEJS("login")}>Start Collaborating</button>

            <button>Practice</button> 
        </div>
      </div>
      
      <div className="image"></div>
    </div>
  )
}

export default Fat
