import React from 'react';

const DarkModeToggle = ({ darkMode, onToggle }) => (
  <button className="dark-toggle" onClick={onToggle} title="Toggle dark mode">
    {darkMode ? (
      <span role="img" aria-label="Light">🌞</span>
    ) : (
      <span role="img" aria-label="Dark">🌙</span>
    )}
  </button>
);

export default DarkModeToggle; 