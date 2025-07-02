import React, { useState } from 'react';

const Register = ({ onRegister, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setError('');
    onRegister(email, password, setError);
  };

  return (
    <div className="signin-page">
      <form className="signin-form" onSubmit={handleSubmit}>
        <div className="form-logo">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="8" y="20" width="32" height="8" rx="4" fill="#6366f1"/>
            <rect x="4" y="16" width="6" height="16" rx="3" fill="#a78bfa"/>
            <rect x="38" y="16" width="6" height="16" rx="3" fill="#a78bfa"/>
            <rect x="14" y="18" width="4" height="12" rx="2" fill="#fff"/>
            <rect x="30" y="18" width="4" height="12" rx="2" fill="#fff"/>
          </svg>
          <span style={{ fontWeight: 700, fontSize: '1.3rem', color: '#6366f1', marginLeft: 8 }}>Fitness Freak</span>
        </div>
        <h1>Register</h1>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        {error && <div className="error-msg">{error}</div>}
        <button type="submit">Register</button>
        <button type="button" className="link-btn" onClick={onBack}>Back to Sign In</button>
      </form>
    </div>
  );
};

export default Register; 