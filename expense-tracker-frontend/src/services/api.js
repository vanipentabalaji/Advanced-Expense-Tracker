// API Service for Expense Tracker Application
// Handles all HTTP requests to the backend

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/expense-tracker';

const defaultHeaders = {
  'Content-Type': 'application/json',
};

/**
 * Fetch wrapper for handling HTTP requests
 */
const fetchRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    if (!response.ok) {
      // Try to parse as JSON first, then fallback to text
      let errorMessage = `HTTP Error: ${response.status}`;
      const contentType = response.headers.get('content-type');
      
      try {
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } else {
          // Handle plain text error responses
          const errorText = await response.text();
          errorMessage = errorText || errorMessage;
        }
      } catch (parseError) {
        // If parsing fails, use a default error message
        console.error('Error parsing response:', parseError);
      }
      
      throw new Error(errorMessage);
    }

    return await response.json().catch(() => ({}));
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * User API endpoints
 */
export const userAPI = {
  /**
   * Onboard a new user
   * @param {Object} userData - User data (username, gmail, monthlyLimit)
   * @returns {Promise<Object>}
   */
  onboardUser: (userData) =>
    fetchRequest('/onBoard/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  /**
   * Login an existing user
   * @param {Object} userData - User login data (username, gmail)
   * @returns {Promise<Object>}
   */
  loginUser: (userData) =>
    fetchRequest('/login/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  /**
   * Get user profile by ID
   * @param {number} userId - User ID
   * @returns {Promise<Object>}
   */
  getUserProfile: (userId) => fetchRequest(`/users/${userId}`),
};

/**
 * Expense API endpoints
 */
export const expenseAPI = {
  /**
   * Add a new expense
   * @param {number} userId - User ID
   * @param {Object} expenseData - Expense data
   * @returns {Promise<Object>}
   */
  addExpense: (userId, expenseData) =>
    fetchRequest(`/add-expenses/${userId}`, {
      method: 'POST',
      body: JSON.stringify(expenseData),
    }),

  /**
   * Get all expenses for a user
   * @param {number} userId - User ID
   * @returns {Promise<Object>}
   */
  getExpenses: (userId) => fetchRequest(`/getAllExpenses/${userId}`),

  /**
   * Update an expense
   * @param {number} expenseId - Expense ID
   * @param {Object} expenseData - Updated expense data
   * @returns {Promise<Object>}
   */
  updateExpense: (expenseId, expenseData) =>
    fetchRequest(`/update-expenses/${expenseId}`, {
      method: 'PUT',
      body: JSON.stringify(expenseData),
    }),

  /**
   * Delete an expense
   * @param {number} expenseId - Expense ID
   * @returns {Promise<Object>}
   */
  deleteExpense: (expenseId) =>
    fetchRequest(`/delete-expenses/${expenseId}`, {
      method: 'DELETE',
    }),
};

export default {
  userAPI,
  expenseAPI,
};
