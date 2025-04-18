import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  from: {
    type: String,
    required: true
  },
  paymentType: {
    type: String,
    enum: ["cash", "check", "bank", "other"],
    default: "cash"
  },
  transactionType: {
    type: String,
    enum: ["Income", "Expense"],
    required: true
  },
  relatedEntity: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'relatedEntityModel'
  },
  relatedEntityModel: {
    type: String,
    enum: ['Student', 'Invoice', 'Instructor'],
    default: 'Student'
  }
}, { timestamps: true });

// Create base model
const TransactionModel = mongoose.model("Transaction", transactionSchema);

// Create discriminators for Income and Expense - without additional schema options
const IncomeModel = TransactionModel.discriminator("Income", new mongoose.Schema({}));
const ExpenseModel = TransactionModel.discriminator("Expense", new mongoose.Schema({}));

// Add middleware to ensure transactionType matches the discriminator


export default TransactionModel;