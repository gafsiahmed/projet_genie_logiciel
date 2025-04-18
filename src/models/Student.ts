import mongoose from "mongoose";

export interface IStudent extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  cin: string;
  birthDate: Date;
  gender: string;
  educationLevel: string;
  payment : number;
  // Add other properties as needed
}

const studentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    trainingSession: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TrainingSession",
    },
    payment: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Paid", "Not Paid", "Pending"],
      default: "Not Paid",
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// Export both the model and the interface
export default mongoose.model<IStudent>("Student", studentSchema);
