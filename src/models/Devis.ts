import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";
import Document from "./Documents";

export interface IDevis {
  id: ObjectId;
  code: string;
  validetDate: Date;
}

const DevisSchema: Schema = new mongoose.Schema({});

const Devis = Document.discriminator("Devis", DevisSchema);
export default Devis;
