import React from 'react';
import './CategoryBreakdown.css';

/**
 * CategoryBreakdown Component
 * Shows breakdown of expenses by category
 */
const CategoryBreakdown = ({ expenses }) => {
  // Calculate breakdown by category
  const breakdown = expenses.reduce((acc, expense) => {
    const existing = acc.find((item) => item.category === expense.category);
    if (existing) {
      existing.amount += expense.amount;
      existing.count += 1;
    } else {
      acc.push({
        category: expense.category,
        amount: expense.amount,
        count: 1,
      });
    }
    return acc;
  }, []);

  // Sort by amount descending
  breakdown.sort((a, b) => b.amount - a.amount);

  // Calculate total
  const total = breakdown.reduce((sum, item) => sum + item.amount, 0);

  const colors = [
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
    '#FFA07A',
    '#98D8C8',
    '#F7DC6F',
    '#BB8FCE',
    '#85C1E2',
  ];

  return (
    <div className="category-breakdown">
      <h3>Breakdown by Category</h3>
      {breakdown.length === 0 ? (
        <p className="no-data">No expenses yet</p>
      ) : (
        <div className="breakdown-list">
          {breakdown.map((item, index) => {
            const percentage = ((item.amount / total) * 100).toFixed(1);
            const color = colors[index % colors.length];

            return (
              <div key={item.category} className="breakdown-item">
                <div className="item-header">
                  <div className="category-info">
                    <span
                      className="category-color"
                      style={{ backgroundColor: color }}
                    />
                    <span className="category-label">
                      {item.category}
                      <span className="item-count">({item.count})</span>
                    </span>
                  </div>
                  <div className="category-details">
                    <span className="amount">₹{item.amount.toFixed(2)}</span>
                    <span className="percentage">{percentage}%</span>
                  </div>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CategoryBreakdown;
