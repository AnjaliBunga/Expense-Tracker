import React, { useState, useEffect } from 'react';
import ExpenseTracker from './components/ExpenseTracker';
import Authentication from './components/Authentication';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const handleAuthSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="App">
      {user ? (
        <div>
          <header className="app-header">
            <h1>Expense Tracker</h1>
            <div className="user-info">
              <span>Welcome, {user.name}!</span>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </div>
          </header>
          <ExpenseTracker user={user} />
        </div>
      ) : (
        <Authentication onAuthSuccess={handleAuthSuccess} />
      )}
    </div>
  );
}

export default App;
