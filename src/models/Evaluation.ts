import mongoose, { Schema } from "mongoose";
import EvaluationDay from "./EvaluationDay";



const TrainingSessionEvaluationSchema = new mongoose.Schema({
  trainingSession: {
    type: Schema.Types.ObjectId,
    ref: "TrainingSession",
    required: true,
  },
  days: [
    {
      type: Schema.Types.ObjectId,
      ref: "EvaluationDay",
    },
  ],
});

const TrainingSessionEvaluation = mongoose.model(
  "TrainingSessionEvaluation",
  TrainingSessionEvaluationSchema
);

export default TrainingSessionEvaluation;
