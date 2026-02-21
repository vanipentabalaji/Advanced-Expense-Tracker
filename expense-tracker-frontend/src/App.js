import React from 'react';
import { UserProvider } from './context/UserContext';
import { ExpenseProvider } from './context/ExpenseContext';
import { useUser } from './hooks/useUser';
import UserOnboarding from './components/UserOnboarding';
import Dashboard from './pages/Dashboard';
import './App.css';

/**
 * Main App Component
 * Routes between onboarding and dashboard based on user state
 */
function AppContent() {
  const { user } = useUser();

  const handleLogout = () => {
    // User will be cleared by Dashboard component
  };

  // Directly render based on user context - no need for separate state
  return (
    <div className="App">
      {user ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <UserOnboarding />
      )}
    </div>
  );
}

/**
 * App Component with Context Providers
 */
function App() {
  return (
    <UserProvider>
      <ExpenseProvider>
        <AppContent />
      </ExpenseProvider>
    </UserProvider>
  );
}

export default App;
