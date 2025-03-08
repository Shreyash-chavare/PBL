import { use, useContext, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Fat from './components/Fat';
import JDoodleCompiler from './components/compiler';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import Dashboard from '../Dashboard/App';
// import isLoggedIn from '../../../../Backend/middleware/isloggedin';  
// import { AuthProvider } from '../../authprov';
// import { AuthContext } from '../../authprov';

    function App() {
      
      // const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
      // if (isLoggedIn === null) {
      //   return <div>Loading...</div>; 
      // }
      return (
        
        
        

    <Router>
      <div className="h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Fat />} />
          <Route path="/practice" element={<JDoodleCompiler />} />
          <Route path="/api/login" element={<Login/>} />  
          <Route path="/api/signup" element={<Signup />} />  
          <Route path="/app" element={<Dashboard/>} />
          
        </Routes>
      </div>
    </Router>
    

  );
}

export default App;
