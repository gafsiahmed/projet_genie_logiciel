import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

export interface IDonneFincieres {
  id: ObjectId;
  title: string;
  content: string;
  dateOfCreation: Date;
  dateOfSending: Date;
  subscribers: [string];
}

const NewsletterSchema: Schema = new mongoose.Schema(
  {
    object: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    dateOfCreation: {
      type: Date,
      required: true,
    },
    dateOfDiffusion: {
      type: Date,
      required: true,
    },
    subscribersList: {
      type: [String],
      required: true,
    },

    status: {
      type: String,

      enum: ["draft", "sent", "scheduled"],
      default: "draft",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Newsletters = mongoose.model("Newsletters", NewsletterSchema);
export default Newsletters;
