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
TransactionModel.discriminator("Income", new mongoose.Schema({}));
TransactionModel.discriminator("Expense", new mongoose.Schema({}));

export default TransactionModel;