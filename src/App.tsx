import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import HomePage from './pages/Home';
import DummyPage from './pages/Dummy';
import NotFoundPage from './pages/NotFound';

import './App.css';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <Navbar
        title="Doodle"
        isLoggedIn={isLoggedIn}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
      <BrowserRouter>
        <Routes>
        {['home', ''].map(path => <Route path={path} element={<HomePage />} />)}
        {['random'].map(path => <Route path={path} element={<DummyPage />} />)}
        {['404'].map(path => <Route path={path} element={<NotFoundPage />} />)}
        {['*'].map(path => <Route path={path} element={<NotFoundPage />} />)}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
