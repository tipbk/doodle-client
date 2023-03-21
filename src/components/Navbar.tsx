import React from 'react';
import './Navbar.css';

interface NavbarProps {
  title: string;
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ title, isLoggedIn, onLogin, onLogout }) => {
  return (
    <nav>
      <div className="navbar">
        <div className="navbar-logo">{title}</div>
        <ul className="navbar-links">
          <li>
            <a href="home" className="navbar-link">
              Home
            </a>
          </li>
          <li>
            <a href="posts" className="navbar-link">
              Post
            </a>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <a href="/" className="navbar-link">
                  Profile
                </a>
              </li>
              <li>
                <a href="/" className="navbar-link" onClick={onLogout}>
                  Logout
                </a>
              </li>
            </>
          ) : (
            <li>
              <a href="/" className="navbar-link" onClick={onLogin}>
                Login
              </a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;