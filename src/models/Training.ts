import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

import { TrainingCategory } from "../utils/constants";

export interface ITraining {
  id: ObjectId;
  name: String;
  description: String;
  price: Number;
  category: String;
}

const trainingsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: [
        TrainingCategory.webdev[1],
        TrainingCategory.webdev[2],
        TrainingCategory.webdev[3],
        TrainingCategory.design,
        TrainingCategory.marketing,
        TrainingCategory.python,
        TrainingCategory.ux_ui,
        TrainingCategory.junior,
        TrainingCategory.data
      ],
    },
  },
  { timestamps: true }
);

const Trainings = mongoose.model("Trainings", trainingsSchema);
export default Trainings;
export { Trainings };
