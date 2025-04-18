import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { TransactionService } from "../../application/services/TransactionService";
import { TransactionRepository } from "../../infrastructure/repositories/TransactionRepository";
import { transactionValidation } from "../../validation/transaction.validation";

export class TransactionController extends BaseController {
  private transactionService: TransactionService;
  
  constructor() {
    super();
    const repository = new TransactionRepository();
    this.transactionService = new TransactionService(repository);
    
    // Bind methods to ensure 'this' context
    this.createTransaction = this.createTransaction.bind(this);
    this.getTransactions = this.getTransactions.bind(this);
    this.getTransactionById = this.getTransactionById.bind(this);
    this.getIncomes = this.getIncomes.bind(this);
    this.getExpenses = this.getExpenses.bind(this);
    this.getFinancialSummary = this.getFinancialSummary.bind(this);
    this.updateTransaction = this.updateTransaction.bind(this);
    this.deleteTransaction = this.deleteTransaction.bind(this);
  }
  
  async createTransaction(req: Request, res: Response): Promise<Response> {
    try {
      const { error, value } = transactionValidation.validate(req.body);
      if (error) {
        return this.sendBadRequest(res, error.details[0].message);
      }
      
      const transaction = await this.transactionService.createTransaction(value);
      return this.sendSuccess(res, transaction, 201);
    } catch (error) {
      return this.sendError(res, error);
    }
  }
  
  async getTransactions(req: Request, res: Response): Promise<Response> {
    try {
      const page = req.query.page ? parseInt(req.query.page as string) : undefined;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      
      const transactions = await this.transactionService.getTransactions(page, limit);
      
      // Ensure transactionType is set correctly based on __t
      const formattedTransactions = Array.isArray(transactions) 
        ? transactions.map(this.formatTransaction)
        : {
            ...transactions,
            items: transactions.items.map(this.formatTransaction)
          };
      
      return this.sendSuccess(res, formattedTransactions);
    } catch (error) {
      return this.sendError(res, error);
    }
  }
  
  async getTransactionById(req: Request, res: Response): Promise<Response> {
    try {
      const transaction = await this.transactionService.getTransactionById(req.params.id);
      if (!transaction) {
        return this.sendNotFound(res, "Transaction not found");
      }
      return this.sendSuccess(res, this.formatTransaction(transaction));
    } catch (error) {
      return this.sendError(res, error);
    }
  }
  
  // Helper method to ensure transactionType is set correctly
  private formatTransaction(transaction: any) {
    if (transaction) {
      // If it's a Mongoose document, convert to plain object
      const transObj = transaction.toObject ? transaction.toObject() : transaction;
      
      // Ensure transactionType matches __t
      if (transObj.__t === 'Income' && transObj.transactionType !== 'Income') {
        transObj.transactionType = 'Income';
      } else if (transObj.__t === 'Expense' && transObj.transactionType !== 'Expense') {
        transObj.transactionType = 'Expense';
      } else if (!transObj.transactionType && transObj.__t) {
        transObj.transactionType = transObj.__t;
      }
      
      return transObj;
    }
    return transaction;
  }
  
  async getIncomes(req: Request, res: Response): Promise<Response> {
    try {
      const page = req.query.page ? parseInt(req.query.page as string) : undefined;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      
      const incomes = await this.transactionService.getTransactionsByType("Income", page, limit);
      return this.sendSuccess(res, incomes);
    } catch (error) {
      return this.sendError(res, error);
    }
  }
  
  async getExpenses(req: Request, res: Response): Promise<Response> {
    try {
      const page = req.query.page ? parseInt(req.query.page as string) : undefined;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      
      const expenses = await this.transactionService.getTransactionsByType("Expense", page, limit);
      return this.sendSuccess(res, expenses);
    } catch (error) {
      return this.sendError(res, error);
    }
  }
  
  async getFinancialSummary(req: Request, res: Response): Promise<Response> {
    try {
      const startDate = req.query.startDate ? new Date(req.query.startDate as string) : undefined;
      const endDate = req.query.endDate ? new Date(req.query.endDate as string) : undefined;
      
      const summary = await this.transactionService.getFinancialSummary(startDate, endDate);
      return this.sendSuccess(res, summary);
    } catch (error) {
      return this.sendError(res, error);
    }
  }
  
  async updateTransaction(req: Request, res: Response): Promise<Response> {
    try {
      const { error, value } = transactionValidation.validate(req.body);
      if (error) {
        return this.sendBadRequest(res, error.details[0].message);
      }
      
      const transaction = await this.transactionService.updateTransaction(req.params.id, value);
      if (!transaction) {
        return this.sendNotFound(res, "Transaction not found");
      }
      return this.sendSuccess(res, transaction);
    } catch (error) {
      return this.sendError(res, error);
    }
  }
  
  async deleteTransaction(req: Request, res: Response): Promise<Response> {
    try {
      const success = await this.transactionService.deleteTransaction(req.params.id);
      if (!success) {
        return this.sendNotFound(res, "Transaction not found");
      }
      return this.sendSuccess(res, { message: "Transaction deleted successfully" });
    } catch (error) {
      return this.sendError(res, error);
    }
  }
}