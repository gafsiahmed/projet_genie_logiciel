import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";
import Document, { IDocument } from "./Documents";
import { IStudent } from "./Student";

export interface IRecu {
  id: ObjectId;
  dateOfCreation: Date;
  title: string;
  description: string;
  author: string;
  document: IDocument;
  student: IStudent;
}

const RecuSchema: Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    dateOfCreation: {
      type: Date,
      default: Date.now,
    },

    studiant: { type: Schema.Types.ObjectId, ref: "Student" },
  },
  {
    timestamps: true,
  }
);

const Recu = Document.discriminator("Recu", RecuSchema);
export default Recu;
