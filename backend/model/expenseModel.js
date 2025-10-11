const mongoose = require('mongoose');

const expenseSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter the expense title"]
    },
    amount: {
        type: Number,
        required: [true, "Please enter the amount"],
        min: [0, "Amount cannot be negative"]
    },
    category: {
        type: String,
        required: [true, "Please select a category"]
    },
    date: {
        type: Date,
        required: [true, "Please enter the date"],
        default: Date.now
    },
    description: {
        type: String,
        default: ""
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('expense', expenseSchema);
