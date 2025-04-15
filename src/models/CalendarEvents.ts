import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

export interface ICalendarEvents {
  id: ObjectId;
  title: string;
  start: Date;
}

const CalendarEventsSchema: Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,

      required: [true, "Can't be blank"],
    },
  },
  {
    timestamps: true,
  }
);

const CalendarEvents = mongoose.model("Events", CalendarEventsSchema);
export default CalendarEvents;
