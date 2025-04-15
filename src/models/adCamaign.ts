import mongoose, { Schema } from "mongoose";
import { ObjectId } from "mongodb";

export interface IadCamaign {
  id: ObjectId;
  budget: Number;
  startDate: Date;
  endDate: Date;
  title: string;
  content: string;
  cost: Number;
}

const adCamaignSchema: Schema = new mongoose.Schema(
  {
    budget: {
      type: Number,
      required: [true, "Can't be blank"],
    },
    cost: {
      type: Number,
      required: [true, "Can't be blank"],
    },

    startDate: {
      type: Date,
      required: [true, "Can't be blank"],
    },

    endDate: {
      type: Date,
      required: [true, "Can't be blank"],
    },
    title: {
      type: String,
      required: [true, "Can't be blank"],
    },
    content: {
      type: String,
      required: [true, "Can't be blank"],
    },
  },
  {
    timestamps: true,
  }
);

const adCamaign = mongoose.model("adCamaign", adCamaignSchema);
export default adCamaign;
