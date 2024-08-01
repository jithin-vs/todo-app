import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice.jsx'; 
import './Header.css';

const Header = () => {
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleLogout = () => { 
    dispatch(logout());
    navigate("/login");
  };

  if (location.pathname === '/login' || location.pathname === '/register') {
    return (
      <header className="header">
        <div className="header-name">Logo</div>
      </header>
    );
  }

  return (
    <header className="header">
      <div className="header-name">Logo</div>
      <div className="header-fields">
        <Link to="/">Home</Link>
        {isAuthenticated ? (
          <>
            <p onClick={handleLogout}>Logout</p>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
