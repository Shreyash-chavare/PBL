import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Fat from './components/Fat'

function App() {

  return (
    <>
    <div className="h-screen" >
      <Navbar/>
      <Fat/>
    </div>
    </>
  )
}

export default App  