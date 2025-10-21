const express = require('express');
const cors = require('cors');
const dbconnect = require('./db/dbconnect');
const dotenv = require('dotenv').config();
const userRoutes = require('./Routes/userRoute');
const expenseRoutes = require('./Routes/expenseRoute');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(cors({
  origin: 'https://fascinating-cranachan-dce869.netlify.app'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/expenses', expenseRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Connect to database
dbconnect();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
