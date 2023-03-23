import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import DummyPage from './pages/DummyPage';
import PostPage from './pages/PostPage';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

import './App.css';

const serviceUrl = process.env.REACT_APP_SERVICE_URL;

const client = new ApolloClient({
  uri: serviceUrl,
  cache: new InMemoryCache(),
});

const App: React.FC = () => {

  const handleLogout = () => {
    localStorage.setItem('token', '')
  };

  return (
    <ApolloProvider client={client}>
      <div className="App">
      <Navbar
        title="Doodle"
        onLogout={handleLogout}
      />
      <BrowserRouter>
        <Routes>
        {['home', ''].map(path => <Route key={path} path={path} element={<HomePage />} />)}
        {['random'].map(path => <Route key={path} path={path} element={<DummyPage />} />)}
        {['posts'].map(path => <Route key={path} path={path} element={<PostPage />} />)}
        {['register'].map(path => <Route key={path} path={path} element={<RegisterPage />} />)}
        {['login'].map(path => <Route key={path} path={path} element={<LoginPage />} />)}
        {['404'].map(path => <Route key={path} path={path} element={<NotFoundPage />} />)}
        {['*'].map(path => <Route key={path} path={path} element={<NotFoundPage />} />)}
        </Routes>
      </BrowserRouter>
    </div>
    </ApolloProvider>
    
  );
};

export default App;
