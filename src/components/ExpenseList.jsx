import { useState } from 'react';
import { format } from 'date-fns';

const ExpenseList = ({ expenses, onDeleteExpense, onEditExpense }) => {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState({});
  const [error, setError] = useState('');

  const handleEdit = (expense) => {
    setEditingId(expense._id);
    setEditData({
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      date: format(new Date(expense.date), 'yyyy-MM-dd'),
      description: expense.description || ''
    });
    setError('');
  };

  const handleSave = async () => {
    if (!editData.title || !editData.amount || !editData.category) {
      setError('Please fill in all required fields');
      return;
    }

    if (parseFloat(editData.amount) <= 0) {
      setError('Amount must be greater than 0');
      return;
    }

    setLoading({ ...loading, [editingId]: true });
    setError('');

    try {
      const success = await onEditExpense(editingId, {
        ...editData,
        amount: parseFloat(editData.amount)
      });

      if (success) {
        setEditingId(null);
        setEditData({});
      }
    } catch (err) {
      setError('Failed to update expense. Please try again.');
    } finally {
      setLoading({ ...loading, [editingId]: false });
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
    setError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      setLoading({ ...loading, [id]: true });
      try {
        await onDeleteExpense(id);
      } catch (err) {
        console.error('Error deleting expense:', err);
      } finally {
        setLoading({ ...loading, [id]: false });
      }
    }
  };

  const categories = [
    'Food & Dining',
    'Transportation',
    'Shopping',
    'Entertainment',
    'Bills & Utilities',
    'Healthcare',
    'Education',
    'Travel',
    'Groceries',
    'Other'
  ];

  if (expenses.length === 0) {
    return (
      <div className="expense-list-card">
        <div className="card-header">
          <h3>📋 Expenses</h3>
          <span className="expense-count">0 transactions</span>
        </div>
        <div className="no-expenses">
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <h4>No expenses yet</h4>
            <p>Start tracking your expenses by adding your first transaction above!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="expense-list-card">
      <div className="card-header">
        <h3>📋 Expenses</h3>
        <span className="expense-count">{expenses.length} transaction{expenses.length !== 1 ? 's' : ''}</span>
      </div>
      {error && (
        <div className="list-error">
          <span className="error-icon">⚠️</span>
          <span className="error-text">{error}</span>
        </div>
      )}
      <div className="expense-items">
        {expenses.map(expense => (
          <div key={expense._id} className="expense-item">
            {editingId === expense._id ? (
              <div className="edit-form">
                <div className="edit-form-grid">
                  <input
                    type="text"
                    name="title"
                    value={editData.title}
                    onChange={handleInputChange}
                    className="edit-input"
                    placeholder="Expense title"
                  />
                  <div className="amount-input-wrapper">
                    <span className="currency-symbol">$</span>
                    <input
                      type="number"
                      name="amount"
                      value={editData.amount}
                      onChange={handleInputChange}
                      step="0.01"
                      className="edit-input amount-input"
                      placeholder="0.00"
                    />
                  </div>
                  <select
                    name="category"
                    value={editData.category}
                    onChange={handleInputChange}
                    className="edit-input"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <input
                    type="date"
                    name="date"
                    value={editData.date}
                    onChange={handleInputChange}
                    className="edit-input"
                  />
                  <div className="edit-actions">
                    <button 
                      onClick={handleSave} 
                      className="save-btn"
                      disabled={loading[editingId]}
                    >
                      <span className="btn-icon">{loading[editingId] ? '⏳' : '✓'}</span>
                      {loading[editingId] ? 'Saving...' : 'Save'}
                    </button>
                    <button 
                      onClick={handleCancel} 
                      className="cancel-btn"
                      disabled={loading[editingId]}
                    >
                      <span className="btn-icon">✕</span>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="expense-info">
                  <div className="expense-main">
                    <div className="expense-title-section">
                      <h4 className="expense-title">{expense.title}</h4>
                      <span className="expense-amount">${expense.amount.toFixed(2)}</span>
                    </div>
                    <div className="expense-meta">
                      <span className="category-badge">{expense.category}</span>
                      <span className="expense-date">
                        <span className="date-icon">📅</span>
                        {format(new Date(expense.date), 'MMM dd, yyyy')}
                      </span>
                    </div>
                    {expense.description && (
                      <p className="expense-description">
                        <span className="desc-icon">📄</span>
                        {expense.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="expense-actions">
                  <button 
                    onClick={() => handleEdit(expense)}
                    className="edit-btn"
                    title="Edit expense"
                    disabled={loading[expense._id]}
                  >
                    <span className="action-icon">✏️</span>
                  </button>
                  <button 
                    onClick={() => handleDelete(expense._id)}
                    className="delete-btn"
                    title="Delete expense"
                    disabled={loading[expense._id]}
                  >
                    <span className="action-icon">
                      {loading[expense._id] ? '⏳' : '🗑️'}
                    </span>
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;
