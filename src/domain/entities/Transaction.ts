import mongoose from "mongoose";
import { BaseEntity } from "./BaseEntity";

export type TransactionType = "Income" | "Expense";
export type PaymentMethod = "cash" | "check" | "bank" | "other";

export class Transaction extends BaseEntity {
  protected date: Date;
  protected amount: number;
  protected description: string;
  protected category: string;
  protected from: string;
  protected paymentType: PaymentMethod;
  protected transactionType: TransactionType;
  protected relatedEntity?: mongoose.Types.ObjectId | string; // Could be student, invoice, etc.

  constructor(data: {
    id?: mongoose.Types.ObjectId;
    date?: Date | string;
    amount?: number;
    description?: string;
    category?: string;
    from?: string;
    paymentType?: PaymentMethod;
    transactionType?: TransactionType;
    relatedEntity?: mongoose.Types.ObjectId | string;
  }) {
    super(data.id);
    this.date = data.date ? new Date(data.date) : new Date();
    this.amount = data.amount || 0;
    this.description = data.description || "";
    this.category = data.category || "";
    this.from = data.from || "";
    this.paymentType = data.paymentType || "cash";
    this.transactionType = data.transactionType || "Income";
    this.relatedEntity = data.relatedEntity;
  }

  // Getters
  public getDate(): Date {
    return this.date;
  }

  public getAmount(): number {
    return this.amount;
  }

  public getDescription(): string {
    return this.description;
  }

  public getCategory(): string {
    return this.category;
  }

  public getFrom(): string {
    return this.from;
  }

  public getPaymentType(): PaymentMethod {
    return this.paymentType;
  }

  public getTransactionType(): TransactionType {
    return this.transactionType;
  }

  public getRelatedEntity(): mongoose.Types.ObjectId | string | undefined {
    return this.relatedEntity;
  }

  // Validation
  public validate(): boolean {
    if (this.amount <= 0) {
      return false;
    }
    
    if (!this.description) {
      return false;
    }
    
    if (!this.category) {
      return false;
    }
    
    return true;
  }

  // For mapping to database model
  public toModel(): any {
    return {
      _id: this.id,
      date: this.date,
      amount: this.amount,
      description: this.description,
      category: this.category,
      from: this.from,
      paymentType: this.paymentType,
      transactionType: this.transactionType,
      __t: this.transactionType, // For discriminator
      relatedEntity: this.relatedEntity
    };
  }

  // Factory method to create from database model
  public static fromModel(model: any): Transaction {
    return new Transaction({
      id: model._id,
      date: model.date,
      amount: model.amount,
      description: model.description,
      category: model.category,
      from: model.from,
      paymentType: model.paymentType,
      transactionType: model.__t || "Income",
      relatedEntity: model.relatedEntity
    });
  }
}