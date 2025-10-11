const express = require('express');
const Expense = require('../model/expenseModel');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// All routes are protected with authentication
router.use(authenticateToken);

// GET /api/expenses - Get all expenses for the authenticated user
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id })
      .sort({ date: -1, createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: expenses.length,
      data: expenses
    });
  } catch (error) {
    console.error('Get expenses error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching expenses' 
    });
  }
});

// GET /api/expenses/:id - Get a specific expense
router.get('/:id', async (req, res) => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found'
      });
    }

    res.status(200).json({
      success: true,
      data: expense
    });
  } catch (error) {
    console.error('Get expense error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching expense'
    });
  }
});

// POST /api/expenses - Create a new expense
router.post('/', async (req, res) => {
  try {
    const { title, amount, category, date, description } = req.body;

    // Validation
    if (!title || !amount || !category) {
      return res.status(400).json({
        success: false,
        message: 'Title, amount, and category are required'
      });
    }

    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be greater than 0'
      });
    }

    const expense = new Expense({
      title,
      amount,
      category,
      date: date || new Date(),
      description: description || '',
      user: req.user.id
    });

    await expense.save();

    res.status(201).json({
      success: true,
      message: 'Expense created successfully',
      data: expense
    });
  } catch (error) {
    console.error('Create expense error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating expense'
    });
  }
});

// PUT /api/expenses/:id - Update an expense
router.put('/:id', async (req, res) => {
  try {
    const { title, amount, category, date, description } = req.body;

    // Validation
    if (!title || !amount || !category) {
      return res.status(400).json({
        success: false,
        message: 'Title, amount, and category are required'
      });
    }

    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be greater than 0'
      });
    }

    const expense = await Expense.findOneAndUpdate(
      { 
        _id: req.params.id,
        user: req.user.id 
      },
      {
        title,
        amount,
        category,
        date: date || new Date(),
        description: description || ''
      },
      { new: true, runValidators: true }
    );

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Expense updated successfully',
      data: expense
    });
  } catch (error) {
    console.error('Update expense error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating expense'
    });
  }
});

// DELETE /api/expenses/:id - Delete an expense
router.delete('/:id', async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Expense deleted successfully'
    });
  } catch (error) {
    console.error('Delete expense error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting expense'
    });
  }
});

// GET /api/expenses/stats/summary - Get expense statistics
router.get('/stats/summary', async (req, res) => {
  try {
    const { period = 'all', month, category } = req.query;
    let matchQuery = { user: req.user.id };

    // Apply filters based on query parameters
    if (period === 'month' && month) {
      const startOfMonth = new Date(month + '-01');
      const endOfMonth = new Date(startOfMonth);
      endOfMonth.setMonth(endOfMonth.getMonth() + 1);
      endOfMonth.setDate(0);
      
      matchQuery.date = {
        $gte: startOfMonth,
        $lte: endOfMonth
      };
    } else if (period === 'week') {
      const today = new Date();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      
      matchQuery.date = {
        $gte: startOfWeek,
        $lte: endOfWeek
      };
    }

    if (category) {
      matchQuery.category = category;
    }

    const stats = await Expense.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$amount' },
          totalCount: { $sum: 1 },
          avgAmount: { $avg: '$amount' },
          categories: { $addToSet: '$category' }
        }
      }
    ]);

    const result = stats[0] || {
      totalAmount: 0,
      totalCount: 0,
      avgAmount: 0,
      categories: []
    };

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics'
    });
  }
});

module.exports = router;
