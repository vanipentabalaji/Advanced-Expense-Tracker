import React, { useState, useEffect } from 'react';
import { expenseAPI } from '../services/api';
import { useUser } from '../hooks/useUser';
import { useExpense } from '../hooks/useExpense';
import Sidebar from '../components/Sidebar';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import ExpenseSummary from '../components/ExpenseSummary';
import CategoryBreakdown from '../components/CategoryBreakdown';
import LoadingSpinner from '../components/LoadingSpinner';
import Alert from '../components/Alert';
import './Dashboard.css';

/**
 * Dashboard Page
 * Main application page showing expenses and statistics
 */
const Dashboard = ({ onLogout }) => {
  const { user, clearUser } = useUser();
  const {
    expenses,
    loading,
    error,
    setAllExpenses,
    setLoading,
    setError,
  } = useExpense();
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [activeSection, setActiveSection] = useState('dashboard');

  useEffect(() => {
    if (user) {
      fetchExpenses();
    }
  }, [user]);

  const fetchExpenses = async () => {
    try {
      // Ensure user and user.id exist before making API call
      if (!user || !user.id) {
        console.error('User or user ID is missing');
        return;
      }

      setLoading(true);
      const response = await expenseAPI.getExpenses(user.id);
      console.log('Fetched expenses response:', response);
      
      // Handle both array and object responses
      const expenseList = Array.isArray(response) ? response : response.expenses || [];
      console.log('Expense list to set:', expenseList);
      setAllExpenses(expenseList);
    } catch (err) {
      console.error('Error fetching expenses:', err);
      setError(err.message || 'Failed to load expenses');
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = () => {
    setEditingExpense(null);
    setShowForm(!showForm);
  };

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
    setShowForm(true);
  };

  const handleFormCancel = () => {
    setEditingExpense(null);
    setShowForm(false);
  };

  const handleFormSuccess = () => {
    setEditingExpense(null);
    setShowForm(false);
    fetchExpenses();
  };

  const handleLogout = () => {
    clearUser();
    onLogout();
  };

  if (!user) {
    return <div>Please log in first</div>;
  }

  if (loading && expenses.length === 0) {
    return <LoadingSpinner message="Loading expenses..." />;
  }

  // Calculate total expenses
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const isLimitExceeded = totalExpenses > user.monthlyLimit;
  const excessAmount = isLimitExceeded ? totalExpenses - user.monthlyLimit : 0;

  return (
    <div className="dashboard-layout">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onLogout={handleLogout}
        userName={user.username}
      />

      <main className="main-content">
        {/* Limit Exceeded Warning */}
        {isLimitExceeded && (
          <div className="limit-exceeded-warning">
            <span className="warning-icon">⚠️</span>
            <span className="warning-text">
              Monthly spending limit exceeded by ₹{excessAmount.toFixed(2)}! 
              Total: ₹{totalExpenses.toFixed(2)} / Limit: ₹{user.monthlyLimit.toFixed(2)}
            </span>
          </div>
        )}

        {/* Errors */}
        {error && (
          <Alert
            type="error"
            message={error}
            onClose={() => setError(null)}
          />
        )}

        {/* Dashboard Section */}
        {activeSection === 'dashboard' && (
          <div className="section-content">
            <div className="section-header">
              <h1>Dashboard</h1>
              <p>Your monthly expense overview</p>
            </div>

            {loading && expenses.length === 0 ? (
              <LoadingSpinner message="Loading expenses..." />
            ) : (
              <div className="dashboard-grid">
                {/* Summary Card */}
                <div className="grid-full">
                  <ExpenseSummary
                    expenses={expenses}
                    monthlyLimit={user.monthlyLimit}
                  />
                </div>

                {/* Breakdown and Expenses */}
                <div className="grid-col-2">
                  <CategoryBreakdown expenses={expenses} />
                </div>

                <div className="grid-col-2">
                  <div className="recent-expenses-card">
                    <h3>Recent Expenses</h3>
                    <ExpenseList
                      expenses={expenses.slice(0, 5)}
                      onEdit={handleEditExpense}
                      isCompact={true}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Expenses Section */}
        {activeSection === 'expenses' && (
          <div className="section-content">
            <div className="section-header">
              <h1>Expenses</h1>
              <p>Manage all your expenses</p>
            </div>

            {loading && expenses.length === 0 ? (
              <LoadingSpinner message="Loading expenses..." />
            ) : (
              <div className="expenses-container">
                <div className="expenses-card">
                  <div className="card-header">
                    <h2>All Expenses</h2>
                    <button
                      onClick={handleAddExpense}
                      className="add-expense-btn"
                    >
                      {showForm ? '✕ Cancel' : '+ Add Expense'}
                    </button>
                  </div>

                  {showForm && (
                    <div className="form-wrapper">
                      <ExpenseForm
                        editingExpense={editingExpense}
                        onSubmitSuccess={handleFormSuccess}
                        onCancel={handleFormCancel}
                      />
                    </div>
                  )}

                  <ExpenseList
                    expenses={expenses}
                    onEdit={handleEditExpense}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Analytics Section */}
        {activeSection === 'analytics' && (
          <div className="section-content">
            <div className="section-header">
              <h1>Analytics</h1>
              <p>Detailed expense analysis</p>
            </div>

            {loading && expenses.length === 0 ? (
              <LoadingSpinner message="Loading analytics..." />
            ) : (
              <div className="analytics-grid">
                <div className="analytics-card">
                  <CategoryBreakdown expenses={expenses} />
                </div>

                <div className="analytics-card">
                  <div className="stats-card">
                    <h3>Summary Stats</h3>
                    <div className="stats-list">
                      <div className="stat-item">
                        <span className="stat-label">Total Expenses</span>
                        <span className="stat-value">
                          ₹{totalExpenses.toFixed(2)}
                        </span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">Monthly Limit</span>
                        <span className="stat-value">
                          ₹{user.monthlyLimit.toFixed(2)}
                        </span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">Remaining</span>
                        <span
                          className="stat-value"
                          style={{
                            color: isLimitExceeded ? '#dc3545' : '#28a745',
                          }}
                        >
                          ₹
                          {(user.monthlyLimit - totalExpenses).toFixed(2)}
                        </span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">Total Transactions</span>
                        <span className="stat-value">{expenses.length}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">Average Expense</span>
                        <span className="stat-value">
                          ₹
                          {(
                            totalExpenses / (expenses.length || 1)
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Settings Section */}
        {activeSection === 'settings' && (
          <div className="section-content">
            <div className="section-header">
              <h1>Settings</h1>
              <p>Manage your account</p>
            </div>

            <div className="settings-card">
              <div className="setting-item">
                <div className="setting-info">
                  <label>Username</label>
                  <p className="setting-value">{user.username}</p>
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <label>Email</label>
                  <p className="setting-value">{user.gmail}</p>
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <label>Monthly Limit</label>
                  <p className="setting-value">₹{user.monthlyLimit.toFixed(2)}</p>
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <label>Account Created</label>
                  <p className="setting-value">{user.createdAt || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
