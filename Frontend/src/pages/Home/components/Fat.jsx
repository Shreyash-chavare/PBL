import React from 'react';
import './Fat.css';
import { Link } from 'react-router-dom';

const Fat = () => {
  return (
    <div className='fat'>
      <div className="textbox pt-36 pl-20">
        <h1>Code</h1>
        <h1>Compile</h1>
        <h1>Collaborate</h1>
        <div className="buttons flex gap-5 pt-5 pl-2">
          <Link to="/api/login">
            <button>Start Collaborating</button>
          </Link>
          <Link to="/practice">
            <button>Practice</button>
          </Link>
        </div>
      </div>
      <div className="image"></div>
    </div>
  );
}

export default Fat;
