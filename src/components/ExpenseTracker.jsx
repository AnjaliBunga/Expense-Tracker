import { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import ExpenseCharts from './ExpenseCharts';
import expenseService from '../services/expenseService';
import './ExpenseTracker.css';

const ExpenseTracker = ({ user }) => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'month', 'week', 'category'
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(format(new Date(), 'yyyy-MM'));

  // Fetch expenses from API on component mount
  useEffect(() => {
    fetchExpenses();
  }, []);

  // Apply filter when filter criteria change
  useEffect(() => {
    applyFilter();
  }, [filter, selectedCategory, selectedMonth, expenses]);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await expenseService.getExpenses();
      setExpenses(data);
    } catch (error) {
      setError('Failed to fetch expenses. Please try again.');
      console.error('Error fetching expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilter = () => {
    let filtered = [...expenses];

    switch (filter) {
      case 'month':
        const startMonth = startOfMonth(new Date(selectedMonth + '-01'));
        const endMonth = endOfMonth(new Date(selectedMonth + '-01'));
        filtered = filtered.filter(expense => {
          const expenseDate = new Date(expense.date);
          return expenseDate >= startMonth && expenseDate <= endMonth;
        });
        break;
      case 'week':
        const today = new Date();
        const startWeek = new Date(today);
        startWeek.setDate(today.getDate() - today.getDay());
        const endWeek = new Date(startWeek);
        endWeek.setDate(startWeek.getDate() + 6);
        filtered = filtered.filter(expense => {
          const expenseDate = new Date(expense.date);
          return expenseDate >= startWeek && expenseDate <= endWeek;
        });
        break;
      case 'category':
        if (selectedCategory) {
          filtered = filtered.filter(expense => expense.category === selectedCategory);
        }
        break;
      default:
        break;
    }

    setFilteredExpenses(filtered);
  };

  const addExpense = async (expenseData) => {
    try {
      setError('');
      const newExpense = await expenseService.createExpense(expenseData);
      setExpenses([newExpense, ...expenses]);
      return true;
    } catch (error) {
      setError('Failed to add expense. Please try again.');
      console.error('Error adding expense:', error);
      return false;
    }
  };

  const deleteExpense = async (id) => {
    try {
      setError('');
      await expenseService.deleteExpense(id);
      setExpenses(expenses.filter(expense => expense._id !== id));
      return true;
    } catch (error) {
      setError('Failed to delete expense. Please try again.');
      console.error('Error deleting expense:', error);
      return false;
    }
  };

  const editExpense = async (id, updatedExpense) => {
    try {
      setError('');
      const updated = await expenseService.updateExpense(id, updatedExpense);
      setExpenses(expenses.map(expense => 
        expense._id === id ? updated : expense
      ));
      return true;
    } catch (error) {
      setError('Failed to update expense. Please try again.');
      console.error('Error updating expense:', error);
      return false;
    }
  };

  // Get unique categories for filter dropdown
  const categories = [...new Set(expenses.map(expense => expense.category))];

  // Calculate totals
  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
  const totalAllTime = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);

  if (loading) {
    return (
      <div className="expense-tracker">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <h3>Loading your expenses...</h3>
          <p>Please wait while we fetch your data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="expense-tracker">
      {error && (
        <div className="error-banner">
          <span className="error-icon">⚠️</span>
          <span className="error-message">{error}</span>
          <button onClick={fetchExpenses} className="retry-btn">
            Retry
          </button>
        </div>
      )}
      
      <header className="expense-header">
        <div className="header-content">
          <h1>💰 Expense Tracker</h1>
          <p className="header-subtitle">Manage your finances with ease</p>
        </div>
        <div className="summary-cards">
          <div className="summary-card current-period">
            <div className="card-icon">📊</div>
            <div className="card-content">
              <h3>Current Period</h3>
              <p className="amount">${totalExpenses.toFixed(2)}</p>
              <span className="card-subtitle">
                {filter === 'all' ? 'All Time' : 
                 filter === 'month' ? 'This Month' :
                 filter === 'week' ? 'This Week' : 
                 'By Category'}
              </span>
            </div>
          </div>
          <div className="summary-card all-time">
            <div className="card-icon">💎</div>
            <div className="card-content">
              <h3>All Time Total</h3>
              <p className="amount">${totalAllTime.toFixed(2)}</p>
              <span className="card-subtitle">Lifetime expenses</span>
            </div>
          </div>
          <div className="summary-card count">
            <div className="card-icon">📝</div>
            <div className="card-content">
              <h3>Total Expenses</h3>
              <p className="amount">{expenses.length}</p>
              <span className="card-subtitle">Transactions</span>
            </div>
          </div>
        </div>
      </header>

      <div className="expense-content">
        <div className="left-panel">
          <ExpenseForm onAddExpense={addExpense} />
          
          <div className="filters-card">
            <div className="card-header">
              <h3>🔍 Filter Expenses</h3>
            </div>
            <div className="filter-controls">
              <div className="filter-group">
                <label>Time Period</label>
                <select 
                  value={filter} 
                  onChange={(e) => setFilter(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Time</option>
                  <option value="month">This Month</option>
                  <option value="week">This Week</option>
                  <option value="category">By Category</option>
                </select>
              </div>

              {filter === 'month' && (
                <div className="filter-group">
                  <label>Select Month</label>
                  <input
                    type="month"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="month-input"
                  />
                </div>
              )}

              {filter === 'category' && (
                <div className="filter-group">
                  <label>Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="category-select"
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          <ExpenseList 
            expenses={filteredExpenses}
            onDeleteExpense={deleteExpense}
            onEditExpense={editExpense}
          />
        </div>

        <div className="right-panel">
          <ExpenseCharts expenses={filteredExpenses} />
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;
