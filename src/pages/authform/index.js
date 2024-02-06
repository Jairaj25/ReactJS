import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './index.css';

const LoginForm = ({ onLogin }) => {
  const [allFormError, setAllFormError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Reset previous error messages
    const errors = {
      emailError: '',
      passwordError: '',
      allFormError: '',
    };

    setEmailError('');
    setPasswordError('');
    setAllFormError('');

    if (!email || !password) {
      errors.allFormError = 'Please enter both email and password.';
    } else {
      if (!emailRegex.test(email)) {
        errors.emailError = 'Please enter a valid email address.';
      }
    }

    setAllFormError(errors.allFormError);
    setEmailError(errors.emailError);

    if (Object.values(errors).every((error) => !error)) {
      onLogin();
    }
  };

  return (
    <div className="login-main-container">
      <div className="login-form-container">
        <div className="login-title-container">
          <h2>Login</h2>
        </div>
        <div className="login-email-input-container">
          <label style={{ color: emailError ? '#C94A4A' : 'inherit' }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='JohnDoe@Example.com'
          />
          {emailError && <div className="login-error-message">{emailError}</div>}
        </div>
        <div className="login-password-input-container">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='********'
          />
          {passwordError && <div className="login-error-message">{passwordError}</div>}
        </div>
        <div className="login-all-form-error-container">
          {allFormError && <div className="login-error-message">{allFormError}</div>}
        </div>
        <div className="login-submit-button-container">
          <div className="login-submit-button-wrapper">
            <div onClick={handleLogin}>Login</div>
          </div>
        </div>
        <div className="login-switchform-container">
          <p>Don't have an account? </p>
          <Link className="login-link-text" to="/signup">Sign up here.</Link>
        </div>
      </div>
    </div>
  );
};

const SignupForm = ({ onSignup }) => {
  const [allFormError, setAllFormError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');

  const handleSignup = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneNumberRegex = /^\d{10}$/;
    const nameRegex = /^[a-zA-Z]+$/;

    const errors = {
      emailError: '',
      passwordError: '',
      nameError: '',
      phoneNumberError: '',
      allFormError: '',
    };

    if (!email || !password || !name || !phoneNumber) {
      errors.allFormError = 'Please fill in all fields.';
    } else {
      if (!emailRegex.test(email)) {
        errors.emailError = 'Please enter a valid email address.';
      }

      if (!phoneNumberRegex.test(phoneNumber)) {
        errors.phoneNumberError = 'Please enter a valid phone number with 10 digits.';
      }

      if (!nameRegex.test(name)) {
        errors.nameError = 'Please enter a valid name with only alphabets.';
      }

      if (password.length < 8) {
        errors.passwordError = 'Password should be at least 8 characters.';
      } else if (password.length > 16) {
        errors.passwordError = 'Password should not exceed 16 characters.';
      } else {
        if (!/(?=.*[@$!%*?&])/.test(password)) {
          errors.passwordError = 'Password should contain at least 1 special symbol.';
        }

        if (!/(?=.*[A-Z])/.test(password)) {
          errors.passwordError = 'Password should contain at least 1 upper case character.';
        }

        if (!/(?=.*[a-z])/.test(password)) {
          errors.passwordError = 'Password should contain at least 1 lower case character.';
        }
      }
    }

    setEmailError(errors.emailError);
    setPasswordError(errors.passwordError);
    setNameError(errors.nameError);
    setPhoneNumberError(errors.phoneNumberError);
    setAllFormError(errors.allFormError);

    if (Object.values(errors).every((error) => !error)) {
      onSignup();
    }
  };
  return (
    <div className="login-main-container">
      <div className="signup-form-container">
        <div className="login-title-container">
          <h2>Sign Up Form</h2>
        </div>
        <div className="login-email-input-container">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <div className="login-error-message">{emailError}</div>}
        </div>
        <div className="login-password-input-container">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <div className="login-error-message">{passwordError}</div>}
        </div>
        <div className="login-password-input-container">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {nameError && <div className="login-error-message">{nameError}</div>}
        </div>
        <div className="login-password-input-container">
          <label>Phone Number</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          {phoneNumberError && <div className="login-error-message">{phoneNumberError}</div>}
        </div>
        <div className="login-all-form-error-container">
          {allFormError && <div className="login-error-message">{allFormError}</div>}
        </div>
        <div className="login-submit-button-container">
          <div className="login-submit-button-wrapper">
            <div onClick={handleSignup}>Sign Up</div>
          </div>
        </div>
        <div className="login-switchform-container">
          <p>Already have an account? </p>
          <Link className="login-link-text" to="/login">Log in here.</Link>
        </div>
      </div>
    </div>
  );
};

export const AuthForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/");
  };

  const handleSignup = () => {
    navigate("/");
  };

  return (location.pathname === '/login' ? <LoginForm onLogin={handleLogin} /> : <SignupForm onSignup={handleSignup} />);
};
