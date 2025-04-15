import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface IToken extends Document {
  user: ObjectId;
  token: string;
  type: "access" | "refresh";
  expires: Date;
}

const TokenSchema = new Schema<IToken>({
  user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  token: { type: String, required: true },
  type: { type: String, enum: ["access", "refresh"], required: true },
  expires: { type: Date, required: true },
});

const Token = mongoose.model<IToken>("Token", TokenSchema);

export default Token;
