import { useContext } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';

/**
 * Custom hook to use Expense Context
 * @returns {Object} Expense context value
 */
export const useExpense = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpense must be used within an ExpenseProvider');
  }
  return context;
};
