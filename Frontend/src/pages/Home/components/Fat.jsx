import React, { useState } from 'react';
import './Fat.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthstore } from '../../../stores/auth';
import { Loader2 } from 'lucide-react';

const Fat = () => {
  const navigate = useNavigate();
  const { authUser, logout } = useAuthstore();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleStartCollaborating = () => {
    if (authUser) {
      navigate('/app');
    } else {
      navigate('/login');
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      // Add artificial delay to show loader
      await new Promise(resolve => setTimeout(resolve, 1500));
      const result = await logout();
      if (result.success) {
        navigate('/login', { replace: true });
      }
    } catch (error) {
      console.error('Logout error:', error);
      navigate('/login', { replace: true });
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className='fat relative'>
      {authUser && (
        <button
          onClick={handleLogout}
          className="fixed top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors z-50 shadow-lg flex items-center gap-2"
          disabled={isLoggingOut}
        >
          {isLoggingOut ? (
            <div className="flex items-center gap-2">
              <Loader2 className='size-4 animate-spin' />
              <span>Logging out...</span>
            </div>
          ) : (
            'Logout'
          )}
        </button>
      )}
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
