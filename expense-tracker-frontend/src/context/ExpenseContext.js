import React, { createContext, useState, useCallback } from 'react';

/**
 * Expense Context - Manages global expense state
 */
export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addExpenseItem = useCallback((expense) => {
    setExpenses((prev) => [expense, ...prev]);
  }, []);

  const updateExpenseItem = useCallback((expenseId, updatedExpense) => {
    setExpenses((prev) =>
      prev.map((exp) => (exp.id === expenseId ? updatedExpense : exp))
    );
  }, []);

  const removeExpenseItem = useCallback((expenseId) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== expenseId));
  }, []);

  const setAllExpenses = useCallback((expenseList) => {
    setExpenses(expenseList);
  }, []);

  const clearExpenses = useCallback(() => {
    setExpenses([]);
  }, []);

  const value = {
    expenses,
    loading,
    error,
    setLoading,
    setError,
    addExpenseItem,
    updateExpenseItem,
    removeExpenseItem,
    setAllExpenses,
    clearExpenses,
  };

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
};
