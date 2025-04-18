import { Router } from "express";
import { TransactionController } from "../../presentation/controllers/TransactionController";

const router = Router();
const transactionController = new TransactionController();

// Get all transactions
router.get("/", transactionController.getTransactions);

// Get financial summary
router.get("/summary", transactionController.getFinancialSummary);

// Get all incomes
router.get("/incomes", transactionController.getIncomes);

// Get all expenses
router.get("/expenses", transactionController.getExpenses);

// Get transaction by ID
router.get("/:id", transactionController.getTransactionById);

// Create a transaction
router.post("/", transactionController.createTransaction);

// Update transaction
router.put("/:id", transactionController.updateTransaction);

// Delete transaction
router.delete("/:id", transactionController.deleteTransaction);

export default router;
