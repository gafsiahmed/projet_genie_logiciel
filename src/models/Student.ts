import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

export interface IStudent {
  id: ObjectId;
  firstName: string;
  lastName: string;
  age: number;
  trainingSession: string;
  payment: number;
  email: string;
  paymentStatus: "Paid" | "Not Paid" | "Pending";
  phoneNumber: number;
}

const StudentSchema: Schema = new mongoose.Schema(
  {
    firstName: {
      type: String,

      required: [true, "Can't be blank"],
    },
    lastName: {
      type: String,

      required: [true, "Can't be blank"],
    },

    email: {
      type: String,
      unique: true,
      required: [true, "Can't be blank"],
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please use a valid address"],
    },
    phoneNumber: {
      type: Number,
      required: true,
      unique: true,
      lenght: [8, "Please enter a valid telephone number"],
    },

    trainingSession: {
      type: Schema.Types.String,
      ref: "TrainingSession",
    },
    payment: {
      type: Number,
    },

    paymentStatus: {
      type: String,
      enum: ["Paid", "Not Paid", "Pending"],
      default: "Not Paid",
    },
  },
  {
    timestamps: true,
  }
);
// nom formateur nansewech referencié
const Student = mongoose.model("Students", StudentSchema);
export default Student;
