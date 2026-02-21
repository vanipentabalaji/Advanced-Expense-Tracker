import React, { useState } from 'react';
import { expenseAPI } from '../services/api';
import { useUser } from '../hooks/useUser';
import { useExpense } from '../hooks/useExpense';
import { formatDateForInput, isRequired } from '../utils/helpers';
import Alert from './Alert';
import './ExpenseForm.css';

/**
 * ExpenseForm Component
 * Handles adding and editing expenses
 */
const ExpenseForm = ({ onSubmitSuccess, editingExpense = null, onCancel }) => {
  const { user } = useUser();
  const { setLoading, setError, addExpenseItem, updateExpenseItem } =
    useExpense();
  const [formData, setFormData] = useState(
    editingExpense
      ? {
          description: editingExpense.description,
          amount: editingExpense.amount,
          expenseDate: formatDateForInput(editingExpense.expenseDate),
          category: editingExpense.category,
        }
      : {
          description: '',
          amount: '',
          expenseDate: formatDateForInput(new Date()),
          category: '',
        }
  );
  const [errors, setErrors] = useState({});
  const [limitExceededWarning, setLimitExceededWarning] = useState(null);

  const CATEGORIES = [
    'Food & Dining',
    'Transportation',
    'Shopping',
    'Entertainment',
    'Utilities',
    'Healthcare',
    'Education',
    'Other',
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!isRequired(formData.description)) {
      newErrors.description = 'Description is required';
    }

    if (!isRequired(formData.amount)) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(formData.amount) || formData.amount <= 0) {
      newErrors.amount = 'Amount must be a positive number';
    }

    if (!isRequired(formData.expenseDate)) {
      newErrors.expenseDate = 'Date is required';
    }

    if (!isRequired(formData.category)) {
      newErrors.category = 'Category is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLimitExceededWarning(null);

    // Debug: Log current user state
    console.log('ExpenseForm handleSubmit - Current user:', user);

    if (!validateForm() || !user) {
      console.error('Validation failed or user not found');
      return;
    }

    // Debug: Verify user.id exists
    if (!user.id) {
      console.error('User ID is missing:', user);
      setError('Error: User ID not found. Please log in again.');
      return;
    }

    try {
      setLoading(true);

      const expenseData = {
        description: formData.description,
        amount: parseFloat(formData.amount),
        expenseDate: formData.expenseDate,
        category: formData.category,
      };

      if (editingExpense) {
        // Update existing expense
        const updated = await expenseAPI.updateExpense(
          editingExpense.id,
          expenseData
        );
        updateExpenseItem(editingExpense.id, updated);
      } else {
        // Add new expense
        console.log('Adding expense with user ID:', user.id);
        const newExpense = await expenseAPI.addExpense(user.id, expenseData);
        console.log('Expense added successfully:', newExpense);
        addExpenseItem(newExpense);

        // Check if limit exceeded
        if (newExpense.limitExceeded) {
          setLimitExceededWarning(
            `⚠️ Warning: Your monthly spending limit has been exceeded! An email notification has been sent to ${user.gmail}`
          );
        }
      }

      setFormData({
        description: '',
        amount: '',
        expenseDate: formatDateForInput(new Date()),
        category: '',
      });

      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (err) {
      setError(err.message || 'Failed to save expense');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <h2>{editingExpense ? 'Edit Expense' : 'Add New Expense'}</h2>

      {limitExceededWarning && (
        <Alert
          type="warning"
          message={limitExceededWarning}
          onClose={() => setLimitExceededWarning(null)}
          autoClose={false}
        />
      )}

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="e.g., Grocery shopping"
          className={errors.description ? 'input-error' : ''}
        />
        {errors.description && (
          <span className="error-text">{errors.description}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="0.00"
          step="0.01"
          className={errors.amount ? 'input-error' : ''}
        />
        {errors.amount && (
          <span className="error-text">{errors.amount}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="expenseDate">Date</label>
        <input
          type="date"
          id="expenseDate"
          name="expenseDate"
          value={formData.expenseDate}
          onChange={handleChange}
          className={errors.expenseDate ? 'input-error' : ''}
        />
        {errors.expenseDate && (
          <span className="error-text">{errors.expenseDate}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className={errors.category ? 'input-error' : ''}
        >
          <option value="">Select a category</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {errors.category && (
          <span className="error-text">{errors.category}</span>
        )}
      </div>

      <div className="form-actions">
        <button type="submit" className="submit-btn">
          {editingExpense ? 'Update Expense' : 'Add Expense'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="cancel-btn">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ExpenseForm;
