import mongoose, { Schema } from "mongoose";

export interface IDocument {
  id: string;
  methodPaiment: string;
  dateOdCreation: Date;
  link: string;
  type: string;
}

const DocumentSchema: Schema = new mongoose.Schema(
  {
    paymentMethod: { type: String, required: true },
    client: { type: String, required: true },
    date: { type: Date, required: true },
    clientAdress: { type: String, required: true },
    MF: { type: String, required: true },
    description: { type: String, required: true },
    forfait: { type: Number, required: true },
    total: { type: Number, required: true },
    tva: { type: Number, required: true },
    timbreFiscal: { type: Number, required: true },
    Reference: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Document = mongoose.model("Documents", DocumentSchema);
export default Document;
