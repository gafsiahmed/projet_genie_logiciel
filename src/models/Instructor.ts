import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";
import User from "./User";



const InstructorSchema: Schema = new mongoose.Schema(
  {
    training: {
      type: String,
      required:[true, "Please enter a training"],
    },
  },
  {
    timestamps: true,
  }
);

const Instructor = User.discriminator("instructor", InstructorSchema);
export default Instructor;
