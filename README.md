# 💰 Expense Tracker

A modern, full-stack expense tracking application built with React and Node.js, featuring user authentication, database integration, and beautiful responsive design.


## ✨ Features

### 🔐 Authentication System
- **User Registration & Login** - Secure account creation and authentication
- **JWT Token Authentication** - Protected routes and sessions
- **Password Hashing** - Bcrypt encryption for secure password storage
- **Persistent Sessions** - Automatic login with localStorage

### 💸 Expense Management
- **Add Expenses** - Track your spending with detailed categorization
- **Edit & Delete** - Inline editing and deletion of expense records
- **Category Filtering** - Filter expenses by categories (Food, Transport, Entertainment, etc.)
- **Date Filtering** - View expenses by specific months
- **Real-time Updates** - Instant UI updates with database synchronization

### 📊 Data Visualization
- **Interactive Charts** - Bar charts and pie charts using Chart.js
- **Category Breakdown** - Visual representation of spending by category
- **Monthly Trends** - Track spending patterns over time
- **Summary Statistics** - Total expenses, average spending, and insights

### 🎨 Modern UI/UX
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Clean Interface** - Modern card-based layout with smooth animations
- **Dark/Light Theme** - Beautiful gradient backgrounds and consistent styling
- **Loading States** - Smooth loading animations and error handling
- **Touch-Friendly** - Mobile-optimized interactions and buttons

### 🗄️ Database Integration
- **MongoDB Atlas** - Cloud database for reliable data storage
- **Mongoose ODM** - Elegant object modeling for MongoDB
- **User-specific Data** - Secure, isolated data per user account
- **Real-time Sync** - Instant database updates with optimistic UI

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/expense-tracker.git
   cd expense-tracker
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../src
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Create .env file in backend directory
   cd backend
   touch .env
   ```

   Add the following to your `.env` file:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Start the application**
   ```bash
   # Start backend server
   cd backend
   npm start

   # Start frontend development server (in new terminal)
   cd src
   npm start
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 🏗️ Project Structure

```
expense-tracker/
├── backend/
│   ├── controllers/
│   │   └── expenseController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── model/
│   │   ├── userModel.js
│   │   └── expenseModel.js
│   ├── Routes/
│   │   ├── userRoute.js
│   │   └── expenseRoute.js
│   ├── db/
│   │   └── dbconnect.js
│   ├── index.js
│   └── package.json
├── src/
│   ├── components/
│   │   ├── ExpenseTracker.jsx
│   │   ├── ExpenseForm.jsx
│   │   ├── ExpenseList.jsx
│   │   ├── ExpenseCharts.jsx
│   │   ├── Authentication.jsx
│   │   ├── Login.jsx
│   │   └── Signup.jsx
│   ├── services/
│   │   └── expenseService.js
│   ├── App.jsx
│   ├── App.css
│   └── index.js
└── README.md
```

## 🛠️ Technologies Used

### Frontend
- **React 18.2.0** - Modern React with hooks
- **Chart.js** - Interactive charts and graphs
- **date-fns** - Date manipulation and formatting
- **Axios** - HTTP client for API calls
- **CSS3** - Modern styling with flexbox and grid

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📱 Responsive Design

The application is fully responsive with optimized layouts for:

- **Desktop** (1200px+) - Two-column layout with side-by-side panels
- **Tablet** (768px-1199px) - Single column layout with stacked components
- **Mobile** (480px-767px) - Mobile-optimized with touch-friendly interactions
- **Small Mobile** (<480px) - Compact layout with minimal spacing

## 🔧 API Endpoints

### Authentication
- `POST /api/users/signup` - User registration
- `POST /api/users/login` - User login

### Expenses
- `GET /api/expenses` - Get all user expenses
- `POST /api/expenses` - Create new expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense
- `GET /api/expenses/stats/summary` - Get expense statistics

## 🎯 Key Features Explained

### User Authentication
```javascript
// JWT token validation middleware
const protect = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.userId);
  next();
});
```

### Expense CRUD Operations
```javascript
// Create expense with user association
const createExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.create({
    ...req.body,
    user: req.user._id
  });
  res.status(201).json(expense);
});
```

### Real-time UI Updates
```javascript
// Optimistic updates with error handling
const addExpense = async (expenseData) => {
  try {
    const newExpense = await expenseService.createExpense(expenseData);
    setExpenses([newExpense, ...expenses]);
    return true;
  } catch (error) {
    setError('Failed to add expense. Please try again.');
    return false;
  }
};
```

## 🎨 Styling & Design

### Color Palette
- **Primary**: `#667eea` to `#764ba2` (Gradient)
- **Background**: `#f5f7fa` to `#c3cfe2` (Light gradient)
- **Text**: `#2d3748` (Dark gray)
- **Accent**: `#718096` (Medium gray)

### Typography
- **Font Family**: Inter, system fonts
- **Headings**: 600-700 font weight
- **Body**: 400-500 font weight
- **Responsive**: Fluid typography with rem units

### Components
- **Cards**: White background with subtle shadows
- **Buttons**: Gradient backgrounds with hover effects
- **Forms**: Clean inputs with focus states
- **Charts**: Custom styled with dark text for visibility

## 🔒 Security Features

- **Password Hashing** - Bcrypt with salt rounds
- **JWT Authentication** - Secure token-based auth
- **Protected Routes** - Middleware for route protection
- **Input Validation** - Server-side validation
- **CORS Configuration** - Cross-origin security
- **Environment Variables** - Sensitive data protection

## 🚀 Deployment

### Frontend 
```bash
# Build the application
npm run build

# Deploy to your preferred platform
# Netlify: Drag and drop build folder
# Vercel: Connect GitHub repository
```

### Backend 
```bash
# Add start script to package.json
"scripts": {
  "start": "node index.js"
}

# Deploy with environment variables
# Set MONGODB_URI and JWT_SECRET in platform settings
```



## 🙏 Acknowledgments

- **Chart.js** - For beautiful chart components
- **date-fns** - For date manipulation utilities
- **MongoDB** - For reliable database service
- **React Team** - For the amazing React framework




---

