import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Fat from './components/Fat';
import JDoodleCompiler from './components/compiler';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';

function App() {
  return (
    <Router>
      <div className="h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Fat />} />
          <Route path="/practice" element={<JDoodleCompiler />} />
          <Route path="/api/login" element={<Login />} />  
          <Route path="/api/signup" element={<Signup />} />  
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
