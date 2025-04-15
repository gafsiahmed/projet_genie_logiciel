import { string } from "joi";
import mongoose from "mongoose";
import dotenv from "dotenv";
require("dotenv").config({ path: "./.env" });
dotenv.config();

const db_url = String(process.env.DATABASE_URL);

export default async function connectToDatabase() {
 await mongoose
    .set("strictQuery", false)
    .connect(db_url)
    .then(() => {
      console.log("Connected to the database");
    })
    .catch((e) => {
      console.error("Connection to database error", e.message);
    });
}

