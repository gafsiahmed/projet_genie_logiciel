import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";
import Instructor from "./Instructor";

export interface ITrainingSession {
  _id: ObjectId;
  startDate: Date;
  endDate: Date;
  instructor: ObjectId;
  students: ObjectId[];
  training: ObjectId;
}

const TrainingSessionSchema: Schema = new mongoose.Schema(
  {
    startDate: {
      type: Date,
      required: [true, "Can't be blank"],
    },

    endDate: {
      type: Date,
      required: [true, "Can't be blank"],
    },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 
      "Users" },
    students: { type: [mongoose.Schema.Types.ObjectId], ref: "Students" },
    training: { type: mongoose.Schema.Types.ObjectId, ref: "Trainings" },
  },
  {
    timestamps: true,
  }
);

const TrainingSession = mongoose.model(
  "TrainingSession",
  TrainingSessionSchema
);
export default TrainingSession;
