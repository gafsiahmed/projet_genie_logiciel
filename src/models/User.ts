import mongoose, { Schema } from "mongoose";
import { Roles } from "../utils/constants";
import { ObjectId } from "mongodb"

export interface IUser {
  id: ObjectId,
  firstName: String,
  lastName:String,
  password: String,
  email:String,
  phoneNumber:Number,
  role: String
}
const UserSchema: Schema = new mongoose.Schema(
  {
    
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true,
      minlength: [9, "Please use minimum of 9 characters"],
    },
    email: {
      type: String,
      required: [true, "Can't be blank"],
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please use a valid address"],
      unique: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
      lenght: [8, "Please enter a valid telephone number"],
    },

    role: {
      type: String,
      default: Roles.user,
      enum: [Roles.marketingManager, Roles.admin, Roles.instructor, Roles.user],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("Users", UserSchema);
export default User;
