import mongoose, { Schema } from "mongoose";

import Transactions, { ITransactions } from "./Transaction";

interface Incomes extends ITransactions {}

const IncomesSchema: Schema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Students",
  },
  category : {
    type: String,
    value : "TrainingPayment"
  },
});

const Incomes = Transactions.discriminator("Revenu", IncomesSchema);
export default Incomes;
