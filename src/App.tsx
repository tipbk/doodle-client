import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import DummyPage from './pages/DummyPage';
import PostPage from './pages/PostPage';
import NotFoundPage from './pages/NotFoundPage';

import './App.css';

const serviceUrl = process.env.REACT_APP_SERVICE_URL;

const client = new ApolloClient({
  uri: serviceUrl,
  cache: new InMemoryCache(),
});

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <ApolloProvider client={client}>
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
        {['posts'].map(path => <Route path={path} element={<PostPage />} />)}
        {['404'].map(path => <Route path={path} element={<NotFoundPage />} />)}
        {['*'].map(path => <Route path={path} element={<NotFoundPage />} />)}
        </Routes>
      </BrowserRouter>
    </div>
    </ApolloProvider>
    
  );
};

export default App;
