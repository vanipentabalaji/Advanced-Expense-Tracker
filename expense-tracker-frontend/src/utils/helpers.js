/**
 * Format currency values
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: 'USD')
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * Format date to readable format
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Format date for input fields (YYYY-MM-DD)
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatDateForInput = (date) => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Parse date from input field
 * @param {string} dateString - Date string in YYYY-MM-DD format
 * @returns {Date} Date object
 */
export const parseDateFromInput = (dateString) => {
  return new Date(dateString + 'T00:00:00');
};

/**
 * Get month and year from date
 * @param {string|Date} date - Date to extract from
 * @returns {string} Month and year string (e.g., "January 2024")
 */
export const getMonthYear = (date) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
};

/**
 * Group expenses by category
 * @param {Array} expenses - Array of expenses
 * @returns {Object} Grouped expenses by category
 */
export const groupByCategory = (expenses) => {
  return expenses.reduce((acc, expense) => {
    const category = expense.category || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(expense);
    return acc;
  }, {});
};

/**
 * Calculate total expenses
 * @param {Array} expenses - Array of expenses
 * @returns {number} Total amount
 */
export const calculateTotal = (expenses) => {
  return expenses.reduce((sum, expense) => sum + (expense.amount || 0), 0);
};

/**
 * Calculate total by category
 * @param {Array} expenses - Array of expenses
 * @returns {Object} Total amounts by category
 */
export const calculateTotalByCategory = (expenses) => {
  const grouped = groupByCategory(expenses);
  const totals = {};
  Object.keys(grouped).forEach((category) => {
    totals[category] = calculateTotal(grouped[category]);
  });
  return totals;
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate required field
 * @param {string|number} value - Value to validate
 * @returns {boolean}
 */
export const isRequired = (value) => {
  return value !== null && value !== undefined && value !== '';
};
