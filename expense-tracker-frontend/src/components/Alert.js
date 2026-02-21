import React, { useState, useEffect } from 'react';
import './Alert.css';

/**
 * Alert Component
 * Displays error, success, and info messages
 */
const Alert = ({ type = 'info', message, onClose, autoClose = true }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoClose && isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) {
          onClose();
        }
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [autoClose, isVisible, onClose]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`alert alert-${type}`}>
      <div className="alert-content">
        <span className="alert-icon">
          {type === 'error' && '❌'}
          {type === 'success' && '✅'}
          {type === 'warning' && '⚠️'}
          {type === 'info' && 'ℹ️'}
        </span>
        <span className="alert-message">{message}</span>
      </div>
      <button
        onClick={() => {
          setIsVisible(false);
          if (onClose) {
            onClose();
          }
        }}
        className="alert-close"
      >
        ×
      </button>
    </div>
  );
};

export default Alert;
