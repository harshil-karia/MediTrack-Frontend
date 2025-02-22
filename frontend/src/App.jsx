import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import History from './pages/History/History';  // Import History Component
import Reports from './pages/Reports/Reports';  // Import Reports Component
import Profile from './pages/Profile/Profile';



const App = () => {

  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
    {showLogin ? <LoginPopup setShowLogin={setShowLogin} />:<></>}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin} />
      <div className="main-content">
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="/history" element={<History />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/profile" element={<Profile />} />

        
      </Routes>
      </div>
    </div>
    <Footer/>
    </>
    
  )
}

export default App