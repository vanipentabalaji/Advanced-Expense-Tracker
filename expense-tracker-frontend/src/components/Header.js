import React from 'react';
import { useUser } from '../hooks/useUser';
import './Header.css';

/**
 * Header Component
 * Navigation and user info header
 */
const Header = ({ onLogout }) => {
  const { user } = useUser();

  return (
    <header className="app-header">
      <div className="header-container">
        <div className="header-left">
          <h1 className="app-title">💰 Expense Tracker</h1>
          <p className="app-subtitle">Manage Your Finances</p>
        </div>

        {user && (
          <div className="header-right">
            <div className="user-info">
              <span className="user-name">{user.username}</span>
              <span className="user-email">{user.gmail}</span>
            </div>
            <button onClick={onLogout} className="logout-btn">
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
