import mongoose, { Schema } from "mongoose";

import Transactions, { ITransactions } from "./Transaction";

export interface IExpenses extends ITransactions {
  recipient: string;
}

const ExpensesSchema: Schema = new mongoose.Schema(
  {},
  {
    timestamps: true,
  }
);

const Expenses = Transactions.discriminator("Expense", ExpensesSchema);
export default Expenses;
