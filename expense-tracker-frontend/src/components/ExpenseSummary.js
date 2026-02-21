import React from 'react';
import { formatCurrency, calculateTotal, calculateTotalByCategory } from '../utils/helpers';
import './ExpenseSummary.css';

/**
 * ExpenseSummary Component
 * Displays summary statistics and breakdown of expenses
 */
const ExpenseSummary = ({ expenses, monthlyLimit }) => {
  const totalExpenses = calculateTotal(expenses);
  const categoryTotals = calculateTotalByCategory(expenses);
  const remainingBudget = monthlyLimit - totalExpenses;
  const percentageUsed = (totalExpenses / monthlyLimit) * 100;

  return (
    <div className="expense-summary">
      <div className="summary-cards">
        <div className="summary-card total">
          <h3>Total Expenses</h3>
          <p className="amount">{formatCurrency(totalExpenses)}</p>
          <span className="label">This Month</span>
        </div>

        <div className="summary-card budget">
          <h3>Monthly Limit</h3>
          <p className="amount">{formatCurrency(monthlyLimit)}</p>
          <span className="label">Budget</span>
        </div>

        <div
          className={`summary-card remaining ${
            remainingBudget < 0 ? 'exceeded' : ''
          }`}
        >
          <h3>Remaining</h3>
          <p className="amount">{formatCurrency(remainingBudget)}</p>
          <span className="label">
            {remainingBudget < 0 ? 'Budget Exceeded!' : 'Available'}
          </span>
        </div>

        <div className="summary-card progress">
          <h3>Budget Usage</h3>
          <div className="progress-bar">
            <div
              className={`progress-fill ${
                percentageUsed > 100 ? 'exceeded' : ''
              }`}
              style={{ width: `${Math.min(percentageUsed, 100)}%` }}
            ></div>
          </div>
          <p className="percentage">{Math.round(percentageUsed)}%</p>
        </div>
      </div>

      {Object.keys(categoryTotals).length > 0 && (
        <div className="category-breakdown">
          <h3>Breakdown by Category</h3>
          <div className="category-list">
            {Object.entries(categoryTotals).map(([category, total]) => (
              <div key={category} className="category-item">
                <span className="category-name">{category}</span>
                <span className="category-amount">
                  {formatCurrency(total)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseSummary;
