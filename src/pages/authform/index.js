import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './index.css';

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    setEmailError('');
    setPasswordError('');

    if (!email || !password) {
      setEmailError('Please enter both email and password.');
      return;
    }

    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    onLogin();
  };

  return (
    <div className="login-main-container">
      <div className="login-form-container">
        <h2>Login Form</h2>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <div className="error-message">{emailError}</div>}

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <div className="error-message">{passwordError}</div>}

        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

const SignupForm = ({ onSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');

  const handleSignup = () => {
    // Regular expression for a simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Reset previous error messages
    setEmailError('');
    setPasswordError('');
    setNameError('');
    setPhoneNumberError('');

    if (!email || !password || !name || !phoneNumber) {
      alert('Please fill in all fields.');
      return;
    }

    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    onSignup();
  };
  return (
    <div className="login-main-container">
      <div className="login-form-container">
        <h2>Sign Up Form</h2>
        <label>Email:</label>
        <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {emailError && <div className="error-message">{emailError}</div>}

      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {passwordError && <div className="error-message">{passwordError}</div>}

      <label>Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {nameError && <div className="error-message">{nameError}</div>}

      <label>Phone Number:</label>
      <input
        type="tel"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      {phoneNumberError && <div className="error-message">{phoneNumberError}</div>}

        <button onClick={handleSignup}>Sign Up</button>
      </div>
    </div>
  );
};

export const AuthForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate(-1);
  };

  const handleSignup = () => {
    navigate(-1);
  };

  return (location.pathname === '/login' ? <LoginForm onLogin={handleLogin} /> : <SignupForm onSignup={handleSignup} />);
};
