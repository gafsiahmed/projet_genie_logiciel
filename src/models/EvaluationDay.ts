import mongoose, { Schema } from "mongoose";

const EvaluationDaysSchema = new mongoose.Schema({
  dayNumber: {
    type: Number,
    required: true,
  },
  evaluations: [
    {
      type: Schema.Types.ObjectId,
      ref: "StudentEvaluation",
    },
  ],
});

const EvaluationDay = mongoose.model("EvaluationDay", EvaluationDaysSchema);

export default EvaluationDay;
