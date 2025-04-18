import Joi from "joi";

export const studentValidation = Joi.object({
  firstName: Joi.string().min(2).max(10).required(),
  lastName: Joi.string().min(2).max(10).required(),
  email: Joi.string().min(6).max(30).required().email(),
  age : Joi.number().min(13).max(60).required(),
  phoneNumber: Joi.number().required(),
  trainingSession: Joi.string().empty(""),
  paymentStatus: Joi.string().valid("Paid", "Not Paid", "Pending"),
  payment: Joi.number().min(0).max(10000).required(),
});
