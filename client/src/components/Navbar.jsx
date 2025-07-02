import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import DarkModeToggle from './DarkModeToggle';

const Navbar = ({ darkMode, onToggleDark, onSignOut }) => {
  const location = useLocation();
  return (
    <nav className="navbar">
      <Logo />
      <div className="nav-links">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Dashboard</Link>
        <Link to="/add" className={location.pathname === '/add' ? 'active' : ''}>Add Entry</Link>
        <Link to="/progress" className={location.pathname === '/progress' ? 'active' : ''}>Progress</Link>
      </div>
      <div style={{ flex: 1 }} />
      <DarkModeToggle darkMode={darkMode} onToggle={onToggleDark} />
      {onSignOut && (
        <button className="signout-btn" onClick={onSignOut}>Sign Out</button>
      )}
    </nav>
  );
};

export default Navbar; 