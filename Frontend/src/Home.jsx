import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './pages/Home/App.jsx'
import { BrowserRouter } from 'react-router-dom'
// import { checkLogin } from './pages/Home/components/login.jsx'
// import { CheckLogin } from './pages/Home/components/login.jsx'
// import { AuthProvider } from './authprov.jsx'

createRoot(document.getElementById('root')).render(
      

        <App />      
      

)
