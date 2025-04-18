import mongoose from "mongoose";
import { PaymentMethod, Transaction, TransactionType } from "../../domain/entities/Transaction";
import { TransactionRepository } from "../../infrastructure/repositories/TransactionRepository";

type ObjectId = mongoose.Types.ObjectId;

export class TransactionService {
  private repository: TransactionRepository;
  
  constructor(repository: TransactionRepository) {
    this.repository = repository;
  }
  
  async getTransactions(page?: number, limit?: number): Promise<Transaction[] | { items: Transaction[], totalPages: number, currentPage: number }> {
    return await this.repository.findAll(page, limit);
  }
  
  async getTransactionById(id: string | ObjectId): Promise<Transaction | null> {
    return await this.repository.findById(id);
  }
  
  async getTransactionsByType(type: TransactionType, page?: number, limit?: number): Promise<Transaction[] | { items: Transaction[], totalPages: number, currentPage: number }> {
    return await this.repository.findByType(type, page, limit);
  }
  
  async getTransactionsByDateRange(startDate: Date, endDate: Date): Promise<Transaction[]> {
    return await this.repository.findByDateRange(startDate, endDate);
  }
  
  async createTransaction(transactionData: {
    date?: Date | string;
    amount: number;
    description: string;
    category: string;
    from: string;
    paymentType?: PaymentMethod;
    transactionType: TransactionType;
    relatedEntity?: string | ObjectId;
  }): Promise<Transaction> {
    // Create transaction entity
    const transaction = new Transaction({
      date: transactionData.date,
      amount: transactionData.amount,
      description: transactionData.description,
      category: transactionData.category,
      from: transactionData.from,
      paymentType: transactionData.paymentType,
      transactionType: transactionData.transactionType,
      relatedEntity: transactionData.relatedEntity
    });
    
    // Validate transaction
    if (!transaction.validate()) {
      throw new Error("Invalid transaction data");
    }
    
    // Save to database
    const createdTransaction = await this.repository.create(transaction);
    
    return createdTransaction;
  }
  
  async updateTransaction(
    id: string | ObjectId,
    transactionData: any
  ): Promise<Transaction | null> {
    try {
      // Update in database
      const updatedTransaction = await this.repository.update(id, transactionData);
      
      return updatedTransaction;
    } catch (error) {
      console.error("Error updating transaction:", error);
      throw error;
    }
  }
  
  async deleteTransaction(id: string | ObjectId): Promise<boolean> {
    return await this.repository.delete(id);
  }
  
  async getFinancialSummary(startDate?: Date, endDate?: Date): Promise<{
    totalIncome: number;
    totalExpense: number;
    netAmount: number;
    incomeByCategory: Record<string, number>;
    expenseByCategory: Record<string, number>;
  }> {
    return await this.repository.getFinancialSummary(startDate, endDate);
  }
}