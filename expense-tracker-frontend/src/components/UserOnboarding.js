import React, { useState } from 'react';
import { userAPI } from '../services/api';
import { useUser } from '../hooks/useUser';
import { isValidEmail, isRequired } from '../utils/helpers';
import Alert from './Alert';
import './UserOnboarding.css';

/**
 * UserOnboarding Component
 * Handles new user registration and existing user login
 */
const UserOnboarding = () => {
  const { updateUser, setLoading, setError, error } = useUser();
  const [isLogin, setIsLogin] = useState(false);

  // Signup form state
  const [signupData, setSignupData] = useState({
    username: '',
    gmail: '',
    monthlyLimit: '',
  });

  // Login form state
  const [loginData, setLoginData] = useState({
    username: '',
    gmail: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // ============ SIGNUP VALIDATION ============
  const validateSignupForm = () => {
    const newErrors = {};

    if (!isRequired(signupData.username)) {
      newErrors.username = 'Username is required';
    }

    if (!isRequired(signupData.gmail)) {
      newErrors.gmail = 'Email is required';
    } else if (!isValidEmail(signupData.gmail)) {
      newErrors.gmail = 'Please enter a valid email';
    }

    if (!isRequired(signupData.monthlyLimit)) {
      newErrors.monthlyLimit = 'Monthly limit is required';
    } else if (isNaN(signupData.monthlyLimit) || signupData.monthlyLimit <= 0) {
      newErrors.monthlyLimit = 'Monthly limit must be a positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ============ LOGIN VALIDATION ============
  const validateLoginForm = () => {
    const newErrors = {};

    if (!isRequired(loginData.username)) {
      newErrors.username = 'Username is required';
    }

    if (!isRequired(loginData.gmail)) {
      newErrors.gmail = 'Email is required';
    } else if (!isValidEmail(loginData.gmail)) {
      newErrors.gmail = 'Please enter a valid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ============ SIGNUP HANDLERS ============
  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setError(null);

    if (!validateSignupForm()) {
      return;
    }

    try {
      setLoading(true);
      const userData = {
        username: signupData.username,
        gmail: signupData.gmail,
        monthlyLimit: parseFloat(signupData.monthlyLimit),
      };

      const response = await userAPI.onboardUser(userData);

      if (!response || !response.id) {
        console.error('Onboarding response missing user ID:', response);
        setError('Failed to create account: Invalid server response. Check console logs.');
        return;
      }

      updateUser(response);
      setSuccessMessage('Account created successfully!');
      setSignupData({ username: '', gmail: '', monthlyLimit: '' });
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  // ============ LOGIN HANDLERS ============
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setError(null);

    if (!validateLoginForm()) {
      return;
    }

    try {
      setLoading(true);
      const userData = {
        username: loginData.username,
        gmail: loginData.gmail,
      };

      const response = await userAPI.loginUser(userData);

      if (!response || !response.id) {
        console.error('Login response missing user ID:', response);
        setError('Login failed: Invalid server response. Check console logs.');
        return;
      }

      updateUser(response);
      setSuccessMessage('Logged in successfully!');
      setLoginData({ username: '', gmail: '' });
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="onboarding-container">
      <div className="onboarding-card">
        <h1>Expense Tracker</h1>
        <p className="subtitle">Manage your spending wisely</p>

        {error && (
          <Alert
            type="error"
            message={error}
            onClose={() => setError(null)}
            autoClose={false}
          />
        )}

        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        {/* Toggle Between Login and Signup */}
        <div className="auth-toggle">
          <button
            type="button"
            className={`toggle-btn ${!isLogin ? 'active' : ''}`}
            onClick={() => {
              setIsLogin(false);
              setErrors({});
              setSuccessMessage('');
              setError(null);
            }}
          >
            Sign Up 
          </button>
          <button
            type="button"
            className={`toggle-btn ${isLogin ? 'active' : ''}`}
            onClick={() => {
              setIsLogin(true);
              setErrors({});
              setSuccessMessage('');
              setError(null);
            }}
          >
            Log In
          </button>
        </div>

        {/* SIGNUP FORM */}
        {!isLogin && (
          <form onSubmit={handleSignupSubmit} className="onboarding-form">
            <div className="form-group">
              <label htmlFor="signup-username">Username</label>
              <input
                type="text"
                id="signup-username"
                name="username"
                value={signupData.username}
                onChange={handleSignupChange}
                placeholder="Choose a username"
                className={errors.username ? 'input-error' : ''}
              />
              {errors.username && (
                <span className="error-text">{errors.username}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="signup-gmail">Email Address</label>
              <input
                type="email"
                id="signup-gmail"
                name="gmail"
                value={signupData.gmail}
                onChange={handleSignupChange}
                placeholder="your@email.com"
                className={errors.gmail ? 'input-error' : ''}
              />
              {errors.gmail && (
                <span className="error-text">{errors.gmail}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="monthlyLimit">Monthly Spending Limit</label>
              <input
                type="number"
                id="monthlyLimit"
                name="monthlyLimit"
                value={signupData.monthlyLimit}
                onChange={handleSignupChange}
                placeholder="e.g., 50000"
                step="0.01"
                className={errors.monthlyLimit ? 'input-error' : ''}
              />
              {errors.monthlyLimit && (
                <span className="error-text">{errors.monthlyLimit}</span>
              )}
            </div>

            <button type="submit" className="submit-btn">
              Create Account
            </button>
          </form>
        )}

        {/* LOGIN FORM */}
        {isLogin && (
          <form onSubmit={handleLoginSubmit} className="onboarding-form">
            <div className="form-group">
              <label htmlFor="login-username">Username</label>
              <input
                type="text"
                id="login-username"
                name="username"
                value={loginData.username}
                onChange={handleLoginChange}
                placeholder="Enter your username"
                className={errors.username ? 'input-error' : ''}
              />
              {errors.username && (
                <span className="error-text">{errors.username}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="login-gmail">Email Address</label>
              <input
                type="email"
                id="login-gmail"
                name="gmail"
                value={loginData.gmail}
                onChange={handleLoginChange}
                placeholder="your@email.com"
                className={errors.gmail ? 'input-error' : ''}
              />
              {errors.gmail && (
                <span className="error-text">{errors.gmail}</span>
              )}
            </div>

            <button type="submit" className="submit-btn">
              Log In
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserOnboarding;
