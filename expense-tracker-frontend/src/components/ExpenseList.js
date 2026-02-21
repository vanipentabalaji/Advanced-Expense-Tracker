import React, { useState } from 'react';
import { expenseAPI } from '../services/api';
import { useExpense } from '../hooks/useExpense';
import { formatCurrency, formatDate } from '../utils/helpers';
import './ExpenseList.css';

/**
 * ExpenseList Component
 * Displays list of expenses with edit and delete options
 */
const ExpenseList = ({ expenses, onEdit, isCompact = false }) => {
  const { removeExpenseItem, setLoading, setError } = useExpense();
  const [expandedExpense, setExpandedExpense] = useState(null);

  console.log('ExpenseList received expenses:', expenses);

  const handleDelete = async (expenseId) => {
    if (!window.confirm('Are you sure you want to delete this expense?')) {
      return;
    }

    try {
      setLoading(true);
      await expenseAPI.deleteExpense(expenseId);
      removeExpenseItem(expenseId);
    } catch (err) {
      setError(err.message || 'Failed to delete expense');
    } finally {
      setLoading(false);
    }
  };

  const toggleExpanded = (expenseId) => {
    setExpandedExpense(expandedExpense === expenseId ? null : expenseId);
  };

  if (!expenses || expenses.length === 0) {
    return (
      <div className="expense-list empty">
        <p>No expenses recorded yet. Add your first expense to get started!</p>
      </div>
    );
  }

  return (
    <div className={`expense-list ${isCompact ? 'compact' : ''}`}>
      {!isCompact && (
        <div className="list-header">
          <h2>Expense List</h2>
          <span className="expense-count">{expenses.length} expenses</span>
        </div>
      )}

      <div className="expenses-container">
        {expenses.map((expense) => (
          <div key={expense.id} className="expense-item">
            <div className="expense-header">
              <div className="expense-main-info">
                <h3 className="expense-description">{expense.description}</h3>
                <span className="expense-category">{expense.category}</span>
              </div>
              <div className="expense-amount">
                {formatCurrency(expense.amount)}
              </div>
            </div>

            <div className="expense-date">
              {formatDate(expense.expenseDate)}
            </div>

            {!isCompact && (
              <div className="expense-actions">
                <button
                  onClick={() => onEdit(expense)}
                  className="edit-btn"
                  title="Edit expense"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(expense.id)}
                  className="delete-btn"
                  title="Delete expense"
                >
                  🗑️ Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;
