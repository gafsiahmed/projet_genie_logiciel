import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

export interface ITransactions {
  id: ObjectId;
  date: Date;
  from: string;
  description: string;
  amount: number;
  category: string;
  paymentType: string;
}

const TransactionsSchema: Schema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: [true, "Can't be blank"],
    },
    from: {
      type: String,
      required: false,
    },

    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },

    __t: {
      type: String,
      required: true,
      enum: ["Expense", "Revenu"],
    },
    paymentType: {
      type: String,
      required: true,
      enum: ["cash", "cheque", "virement bancaire"],
    },
  },

  {
    timestamps: true,
  }
);

const Transactions = mongoose.model("Transactions", TransactionsSchema);
export default Transactions;
