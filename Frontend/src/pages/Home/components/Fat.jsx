import React, { useState } from 'react';
import './Fat.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthstore } from '../../../stores/auth';

const Fat = () => {
  const navigate = useNavigate();
  const { authUser } = useAuthstore();

  const handleStartCollaborating = () => {
    if (authUser) {
      navigate('/app');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className='fat relative'>
      <div className="textbox pt-36 pl-20">
        <h1>Code</h1>
        <h1>Compile</h1>
        <h1>Collaborate</h1>
        <div className="buttons flex gap-5 pt-5 pl-2">
          <button onClick={handleStartCollaborating}>
            Start Collaborating
          </button>
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
