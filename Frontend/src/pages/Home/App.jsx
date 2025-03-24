import { use, useContext, useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Fat from './components/Fat';
import JDoodleCompiler from './components/practice_compiler';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import Dashboard from '../Dashboard/App';
import Profile from '../Dashboard/profile';
// import isLoggedIn from '../../../../Backend/middleware/isloggedin';  
// import { AuthProvider } from '../../authprov';
// import { AuthContext } from '../../authprov';
import { useAuthstore } from '../../stores/auth';
import { Loader } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
    function App() {
      const {checkauth,authUser,isCheckingAuth} = useAuthstore();
      
      // const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
      // if (isLoggedIn === null) {
      //   return <div>Loading...</div>; 
      // }
      useEffect(() => {
        checkauth();
      }, [checkauth]);

      console.log({ authUser });

      if (isCheckingAuth && !authUser) {
        return (
          <div className='flex items-center justify-center h-screen'>
            <Loader className='size-10 animate-spin' />
          </div>
        );
      }
      return (
        
        
        

    <Router>
      <div className="h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={authUser?<Fat />:<Navigate to="/login"/>} />
          <Route path="/practice" element={authUser?<JDoodleCompiler />:<Navigate to="/login"/>} />
          <Route path="/login" element={!authUser?<Login/>:<Navigate to="/"/>} />  
          <Route path="/signup" element={!authUser?<Signup />:<Navigate to="/"/>} />  
          <Route path="/app" element={authUser?<Dashboard/>:<Navigate to="/login"/>} />
          <Route path="/profile" element={authUser?<Profile/>:<Navigate to="/login"/>} />
          
        </Routes>
        <Toaster/>
      </div>
    </Router>
    

  );
}

export default App;
