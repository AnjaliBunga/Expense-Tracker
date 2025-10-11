const API_BASE_URL = 'http://localhost:5000/api';

class ExpenseService {
  // Get auth token from localStorage
  getAuthToken() {
    return localStorage.getItem('token');
  }

  // Get auth headers
  getAuthHeaders() {
    const token = this.getAuthToken();
    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    };
  }

  // Handle API response
  async handleResponse(response) {
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'An error occurred');
    }
    
    return data;
  }

  // Fetch all expenses
  async getExpenses() {
    try {
      const response = await fetch(`${API_BASE_URL}/expenses`, {
        method: 'GET',
        headers: this.getAuthHeaders()
      });
      
      const result = await this.handleResponse(response);
      return result.data;
    } catch (error) {
      console.error('Error fetching expenses:', error);
      throw error;
    }
  }

  // Create new expense
  async createExpense(expenseData) {
    try {
      const response = await fetch(`${API_BASE_URL}/expenses`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(expenseData)
      });
      
      const result = await this.handleResponse(response);
      return result.data;
    } catch (error) {
      console.error('Error creating expense:', error);
      throw error;
    }
  }

  // Update expense
  async updateExpense(id, expenseData) {
    try {
      const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(expenseData)
      });
      
      const result = await this.handleResponse(response);
      return result.data;
    } catch (error) {
      console.error('Error updating expense:', error);
      throw error;
    }
  }

  // Delete expense
  async deleteExpense(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders()
      });
      
      await this.handleResponse(response);
      return true;
    } catch (error) {
      console.error('Error deleting expense:', error);
      throw error;
    }
  }

  // Get expense statistics
  async getExpenseStats(filters = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters.period) queryParams.append('period', filters.period);
      if (filters.month) queryParams.append('month', filters.month);
      if (filters.category) queryParams.append('category', filters.category);
      
      const url = `${API_BASE_URL}/expenses/stats/summary?${queryParams.toString()}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: this.getAuthHeaders()
      });
      
      const result = await this.handleResponse(response);
      return result.data;
    } catch (error) {
      console.error('Error fetching expense stats:', error);
      throw error;
    }
  }

  // Get single expense by ID
  async getExpenseById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
        method: 'GET',
        headers: this.getAuthHeaders()
      });
      
      const result = await this.handleResponse(response);
      return result.data;
    } catch (error) {
      console.error('Error fetching expense:', error);
      throw error;
    }
  }
}

export default new ExpenseService();
