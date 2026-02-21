import React from 'react';
import './Sidebar.css';

/**
 * Sidebar Component
 * Navigation sidebar for the application
 */
const Sidebar = ({ activeSection, onSectionChange, onLogout, userName }) => {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '📊',
    },
    {
      id: 'expenses',
      label: 'Expenses',
      icon: '💰',
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: '📈',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: '⚙️',
    },
  ];

  const handleMenuClick = (id) => {
    onSectionChange(id);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="brand">
          <span className="brand-icon">💸</span>
          <span className="brand-name">Expense Tracker</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => handleMenuClick(item.id)}
            title={item.label}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">👤 {userName}</div>
        <button className="logout-btn" onClick={onLogout} title="Logout">
          🚪 Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
