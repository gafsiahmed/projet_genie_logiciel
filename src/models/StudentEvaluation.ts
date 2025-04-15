import mongoose, {Schema} from "mongoose";



const EvaluationsSchema = new mongoose.Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  present: {
    type: Boolean,
    required: false,
  },
  task: {
    type: String,
    required: false,
  },
  grade: {
    type: Number,
    required: false,
  },
  day: {
    type: Number,
    required: false,
  },
});

const StudentEvaluation = mongoose.model('StudentEvaluation', EvaluationsSchema);

export default StudentEvaluation;


