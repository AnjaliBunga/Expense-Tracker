import { useState } from 'react';
import { format } from 'date-fns';

const ExpenseForm = ({ onAddExpense }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.amount || !formData.category) {
      setError('Please fill in all required fields');
      return;
    }

    if (parseFloat(formData.amount) <= 0) {
      setError('Amount must be greater than 0');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const success = await onAddExpense({
        ...formData,
        amount: parseFloat(formData.amount)
      });

      if (success) {
        // Reset form only on success
        setFormData({
          title: '',
          amount: '',
          category: '',
          date: format(new Date(), 'yyyy-MM-dd'),
          description: ''
        });
      }
    } catch (err) {
      setError('Failed to add expense. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="expense-form-card">
      <div className="card-header">
        <h3>➕ Add New Expense</h3>
        <p className="card-subtitle">Track your spending easily</p>
      </div>
      {error && (
        <div className="form-error">
          <span className="error-icon">⚠️</span>
          <span className="error-text">{error}</span>
        </div>
      )}
      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-group">
          <label htmlFor="title">
            <span className="label-icon">📝</span>
            Expense Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Coffee, Gas, Movie tickets"
            required
            className="form-input"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="amount">
              <span className="label-icon">💰</span>
              Amount *
            </label>
            <div className="amount-input-wrapper">
              <span className="currency-symbol">$</span>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                required
                className="form-input amount-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="category">
              <span className="label-icon">🏷️</span>
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="form-select"
            >
              <option value="">Choose a category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="date">
            <span className="label-icon">📅</span>
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">
            <span className="label-icon">📄</span>
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Optional description or notes..."
            rows="3"
            className="form-textarea"
          />
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          <span className="btn-icon">{loading ? '⏳' : '💾'}</span>
          {loading ? 'Adding...' : 'Add Expense'}
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
