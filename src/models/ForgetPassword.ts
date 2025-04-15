import { ObjectId } from "mongodb";
import mongoose, { Document, Schema } from "mongoose";
// import {generatecode} from "../utils/constants"

export interface IForgetPassword extends Document {
  userId: ObjectId;
  token: string;
  expires?: Date;
}

const ForgetPasswordSchema = new Schema<IForgetPassword>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    token: { type: String, required: true, unique: true },
  },
  { timestamps: true, expireAfterSeconds: 3600  }
);

const ForgetPassword = mongoose.model<IForgetPassword>(
  "ForgetPassword",
  ForgetPasswordSchema
);

export default ForgetPassword;
