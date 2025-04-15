import mongoose, { Schema } from "mongoose";
import Document from "./Documents";

const FactureSchema: Schema = new mongoose.Schema(
  {},
 
);

//
const Facture = Document.discriminator("Facture", FactureSchema);
export default Facture;
