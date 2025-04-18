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
  payment: number;
  // Add other properties as needed
}

// OCL-inspired constraints
const studentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      minlength: [2, "First name must be at least 2 characters"]
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      minlength: [2, "Last name must be at least 2 characters"]
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
      min: [16, "Student must be at least 16 years old"],
      max: [80, "Student age cannot exceed 80 years"]
    },
    trainingSession: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TrainingSession",
    },
    payment: {
      type: Number,
      required: [true, "Payment amount is required"],
      min: [0, "Payment cannot be negative"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please use a valid email address"],
      unique: true
    },
    paymentStatus: {
      type: String,
      enum: {
        values: ["Paid", "Not Paid", "Pending"],
        message: "Payment status must be one of: Paid, Not Paid, Pending"
      },
      default: "Not Paid",
    },
    phoneNumber: {
      type: Number,
      required: [true, "Phone number is required"],
      validate: {
        validator: function(v: number) {
          return /^\d{8,}$/.test(v.toString());
        },
        message: "Phone number must have at least 8 digits"
      }
    },
  },
  { timestamps: true }
);

// Custom validation for business rules
studentSchema.pre('validate', function(next) {
  // OCL constraint: If payment status is "Paid", payment must be greater than 0
  if (this.paymentStatus === "Paid" && this.payment <= 0) {
    this.invalidate('payment', 'Payment must be greater than 0 when status is Paid');
  }
  
  next();
});

// Export both the model and the interface
export default mongoose.model<IStudent>("Student", studentSchema);
