import React, { createContext, useState, useCallback, useEffect } from 'react';

/**
 * User Context - Manages global user state
 */
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (err) {
        console.error('Failed to parse saved user:', err);
        localStorage.removeItem('currentUser');
      }
    }
  }, []);

  const updateUser = useCallback((userData) => {
    console.log('UserContext updateUser called with:', userData);
    setUser(userData);
    // Optional: Store in localStorage for persistence
    if (userData) {
      localStorage.setItem('currentUser', JSON.stringify(userData));
      console.log('User saved to localStorage:', userData);
    } else {
      localStorage.removeItem('currentUser');
    }
  }, []);

  const clearUser = useCallback(() => {
    setUser(null);
    localStorage.removeItem('currentUser');
  }, []);

  const value = {
    user,
    loading,
    error,
    setLoading,
    setError,
    updateUser,
    clearUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
