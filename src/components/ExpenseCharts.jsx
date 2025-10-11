import { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement
);

const ExpenseCharts = ({ expenses }) => {
  // Get category totals
  const categoryTotals = {};
  expenses.forEach(expense => {
    categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
  });

  const labels = Object.keys(categoryTotals);
  const data = Object.values(categoryTotals);

  // Enhanced color palette
  const colors = [
    '#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe',
    '#00f2fe', '#43e97b', '#38f9d7', '#ffecd2', '#fcb69f',
    '#a8edea', '#fed6e3', '#d299c2', '#ffd89b', '#19547b'
  ];

  // Chart data with enhanced styling
  const barData = {
    labels: labels,
    datasets: [{
      data: data,
      backgroundColor: colors.slice(0, labels.length),
      borderRadius: 8,
      borderSkipped: false,
    }],
  };

  const pieData = {
    labels: labels,
    datasets: [{
      data: data,
      backgroundColor: colors.slice(0, labels.length),
      borderWidth: 2,
      borderColor: '#fff',
    }],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          color: '#2d3748',
          font: {
            size: 13,
            weight: '600',
            family: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0,0,0,0.1)',
          drawBorder: false,
        },
        ticks: {
          color: '#4a5568',
          font: {
            size: 12,
            weight: '500',
            family: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
          }
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#4a5568',
          font: {
            size: 12,
            weight: '500',
            family: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
          }
        }
      }
    }
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          color: '#2d3748',
          font: {
            size: 13,
            weight: '600',
            family: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
          }
        }
      }
    }
  };

  // Calculate total amount
  const totalAmount = data.reduce((sum, amount) => sum + amount, 0);

  if (expenses.length === 0) {
    return (
      <div className="expense-charts-card">
        <div className="card-header">
          <h3>📊 Analytics Dashboard</h3>
        </div>
        <div className="no-data-state">
          <div className="empty-state">
            <div className="empty-icon">📈</div>
            <h4>No data to display</h4>
            <p>Add some expenses to see beautiful charts and analytics!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="expense-charts-card">
      <div className="card-header">
        <h3>📊 Analytics Dashboard</h3>
        <div className="total-summary">
          <span className="total-amount">${totalAmount.toFixed(2)}</span>
          <span className="total-label">Total Expenses</span>
        </div>
      </div>
      
      <div className="charts-grid">
        <div className="chart-container bar-chart">
          <div className="chart-header">
            <h4>📊 Expenses by Category</h4>
            <p className="chart-subtitle">Compare spending across different categories</p>
          </div>
          <div className="chart-wrapper">
            <Bar data={barData} options={chartOptions} />
          </div>
        </div>

        <div className="chart-container pie-chart">
          <div className="chart-header">
            <h4>🥧 Spending Distribution</h4>
            <p className="chart-subtitle">Visual breakdown of your expenses</p>
          </div>
          <div className="chart-wrapper">
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>
      </div>

      <div className="category-breakdown">
        <h4>💡 Category Insights</h4>
        <div className="insights-grid">
          {labels.map((label, index) => {
            const amount = data[index];
            const percentage = ((amount / totalAmount) * 100).toFixed(1);
            return (
              <div key={label} className="insight-item">
                <div className="insight-header">
                  <div 
                    className="insight-color" 
                    style={{ backgroundColor: colors[index] }}
                  ></div>
                  <span className="insight-label">{label}</span>
                </div>
                <div className="insight-stats">
                  <span className="insight-amount">${amount.toFixed(2)}</span>
                  <span className="insight-percentage">{percentage}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExpenseCharts;
