import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import DummyPage from './pages/DummyPage';
import PostPage from './pages/PostPage';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { setContext } from '@apollo/client/link/context';

import './App.css';
import CreatePostPage from './pages/CreatePostPage';
import PostDetailPage from './pages/PostDetailPage';

const serviceUrl = process.env.REACT_APP_SERVICE_URL;

const httpLink = createHttpLink({
  uri: serviceUrl + '/query',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});


const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
        {['/home', '/'].map(path => <Route key={path} path={path} element={<HomePage />} />)}
        {['/random'].map(path => <Route key={path} path={path} element={<DummyPage />} />)}
        {['/posts'].map(path => <Route key={path} path={path} element={<PostPage />} />)}
        {['/posts/:postId'].map(path => <Route key={path} path={path} element={<PostDetailPage />} />)}
        {['/posts/create-post'].map(path => <Route key={path} path={path} element={<CreatePostPage />} />)}
        {['/register'].map(path => <Route key={path} path={path} element={<RegisterPage />} />)}
        {['/login'].map(path => <Route key={path} path={path} element={<LoginPage />} />)}
        {['/404'].map(path => <Route key={path} path={path} element={<NotFoundPage />} />)}
        {['*'].map(path => <Route key={path} path={path} element={<NotFoundPage />} />)}
        </Routes>
      </BrowserRouter>
    </div>
    </ApolloProvider>
    
  );
};

export default App;
