import mongoose from "mongoose";
import { IRepository } from "../../domain/repositories/IRepository";
import { Transaction, TransactionType } from "../../domain/entities/Transaction";
import TransactionModel from "../../models/Transaction";

type ObjectId = mongoose.Types.ObjectId;

export class TransactionRepository implements IRepository<Transaction> {
  async findById(id: string | ObjectId): Promise<Transaction | null> {
    const transactionModel = await TransactionModel.findById(id)
      .populate("relatedEntity");
      
    if (!transactionModel) return null;
    
    return Transaction.fromModel(transactionModel);
  }
  
  async findAll(page?: number, limit?: number): Promise<Transaction[] | { items: Transaction[], totalPages: number, currentPage: number }> {
    if (page !== undefined && limit !== undefined) {
      const transactionModels = await TransactionModel.find()
        .populate("relatedEntity")
        .sort({ date: -1 }) // Most recent first
        .limit(limit)
        .skip((page - 1) * limit)
        .exec();
      
      const count = await TransactionModel.countDocuments();
      
      return {
        items: transactionModels.map(model => Transaction.fromModel(model)),
        totalPages: Math.ceil(count / limit),
        currentPage: page
      };
    } else {
      const transactionModels = await TransactionModel.find()
        .populate("relatedEntity")
        .sort({ date: -1 }); // Most recent first
      
      return transactionModels.map(model => Transaction.fromModel(model));
    }
  }
  
  async findByType(type: TransactionType, page?: number, limit?: number): Promise<Transaction[] | { items: Transaction[], totalPages: number, currentPage: number }> {
    if (page !== undefined && limit !== undefined) {
      const transactionModels = await TransactionModel.find({ __t: type })
        .populate("relatedEntity")
        .sort({ date: -1 })
        .limit(limit)
        .skip((page - 1) * limit)
        .exec();
      
      const count = await TransactionModel.countDocuments({ __t: type });
      
      return {
        items: transactionModels.map(model => Transaction.fromModel(model)),
        totalPages: Math.ceil(count / limit),
        currentPage: page
      };
    } else {
      const transactionModels = await TransactionModel.find({ __t: type })
        .populate("relatedEntity")
        .sort({ date: -1 });
      
      return transactionModels.map(model => Transaction.fromModel(model));
    }
  }
  
  async findByDateRange(startDate: Date, endDate: Date): Promise<Transaction[]> {
    const transactionModels = await TransactionModel.find({
      date: { $gte: startDate, $lte: endDate }
    })
      .populate("relatedEntity")
      .sort({ date: -1 });
    
    return transactionModels.map(model => Transaction.fromModel(model));
  }
  
  async create(transaction: Transaction): Promise<Transaction> {
    const transactionModel = new TransactionModel(transaction.toModel());
    const savedModel = await transactionModel.save();
    return Transaction.fromModel(savedModel);
  }
  
  async update(id: string | ObjectId, transactionData: any): Promise<Transaction | null> {
    try {
      // Remove _id if present to avoid conflicts
      if (transactionData._id) {
        delete transactionData._id;
      }
      
      // Find the existing transaction
      const existingTransaction = await TransactionModel.findById(id);
      if (!existingTransaction) {
        return null;
      }
      
      // Update only the fields that are provided
      const updatedModel = await TransactionModel.findByIdAndUpdate(
        id,
        { $set: transactionData },
        { new: true, runValidators: true }
      ).populate("relatedEntity");
      
      if (!updatedModel) return null;
      
      return Transaction.fromModel(updatedModel);
    } catch (error) {
      console.error("Error in repository update:", error);
      throw error;
    }
  }
  
  async delete(id: string | ObjectId): Promise<boolean> {
    const result = await TransactionModel.findByIdAndDelete(id);
    return result !== null;
  }
  
  async getFinancialSummary(startDate?: Date, endDate?: Date): Promise<{
    totalIncome: number;
    totalExpense: number;
    netAmount: number;
    incomeByCategory: Record<string, number>;
    expenseByCategory: Record<string, number>;
  }> {
    const query: any = {};
    
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = startDate;
      if (endDate) query.date.$lte = endDate;
    }
    
    const transactions = await TransactionModel.find(query);
    
    const summary = {
      totalIncome: 0,
      totalExpense: 0,
      netAmount: 0,
      incomeByCategory: {} as Record<string, number>,
      expenseByCategory: {} as Record<string, number>
    };
    
    transactions.forEach(transaction => {
      if ((transaction as any).__t === 'Income') {
        summary.totalIncome += transaction.amount;
        
        if (!summary.incomeByCategory[transaction.category]) {
          summary.incomeByCategory[transaction.category] = 0;
        }
        summary.incomeByCategory[transaction.category] += transaction.amount;
      } else {
        summary.totalExpense += transaction.amount;
        
        if (!summary.expenseByCategory[transaction.category]) {
          summary.expenseByCategory[transaction.category] = 0;
        }
        summary.expenseByCategory[transaction.category] += transaction.amount;
      }
    });
    
    summary.netAmount = summary.totalIncome - summary.totalExpense;
    
    return summary;
  }
}