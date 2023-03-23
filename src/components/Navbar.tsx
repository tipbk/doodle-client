import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { useJwt } from 'react-jwt';

interface NavbarProps {
  title: string;
  onLogout: () => void;
}

interface DecodedToken {
 username:string;
}

const getToken = (): string => {
  return localStorage.getItem('token') ?? "";
};

const Navbar: React.FC<NavbarProps> = ({ title, onLogout }) => {

  const [user, setUser] = useState<string | undefined>();

  const { decodedToken, isExpired } = useJwt(getToken());
  useEffect(() => {
    if (decodedToken && !isExpired) {
      const { username } = decodedToken as DecodedToken;
      setUser(username);
    }
  }, [decodedToken, isExpired]);

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
          {user !== undefined ? (
            <>
              <li>
                <a href="/" className="navbar-link" onClick={onLogout}>
                  {user}(logout)
                </a>
              </li>
            </>
          ) : (
            <li>
              <a href="/login" className="navbar-link">
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