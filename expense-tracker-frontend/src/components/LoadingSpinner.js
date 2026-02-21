import React from 'react';
import './LoadingSpinner.css';

/**
 * LoadingSpinner Component
 * Displays loading indicator
 */
const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>{message}</p>
    </div>
  );
};

export default LoadingSpinner;
