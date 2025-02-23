import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import History from './pages/History/History';
import Reports from './pages/Reports/Reports';
import Profile from './pages/Profile/Profile';
import Lab from './pages/Admin_page/Lab';
import LoginPopup from './components/LoginPopup/LoginPopup';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <div className='main-content'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/history' element={<History />} />
            <Route path='/reports' element={<Reports />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/lab' element={<Lab />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default App;