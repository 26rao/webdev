import React from 'react';

const Logo = () => (
  <div className="logo">
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="16" fill="#6366f1"/>
      <path d="M10 18c2-4 10-4 12 0" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="12.5" cy="13.5" r="1.5" fill="#fff"/>
      <circle cx="19.5" cy="13.5" r="1.5" fill="#fff"/>
    </svg>
    <span>FitTrack</span>
  </div>
);

export default Logo; 