import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

export interface Employee {
  id: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  cin: number;
  poste: string;
}

const EmployeeSchema: Schema = new mongoose.Schema(
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
      required: [true, "Can't be blank"],
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please use a valid address"],
    },
    phoneNumber: {
      type: Number,
      required: true,
      lenght: [8, "Please enter a valid telephone number"],
    },
    cin: {
      type: Number,
      required: true,
      lenght: [8, "Please enter a valid telephone number"],
    },
    poste: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
// nom formateur nansewech referencié
const Employee = mongoose.model("Employee", EmployeeSchema);
export default Employee;
