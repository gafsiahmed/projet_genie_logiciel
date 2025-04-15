
import ForgetPassword from "../models/ForgetPassword";
import { ObjectId } from "mongodb";



export async function saveData(userId: ObjectId, token : string): Promise<void> {
    const forgetPassword = new ForgetPassword({userId, token });
    const validationError = forgetPassword.validateSync(); // Check for validation errors synchronously
if (validationError) {
  console.error(validationError);
  return; // Exit early if there's a validation error
}
    await forgetPassword.save();
    console.log('Code saved to database');
  }