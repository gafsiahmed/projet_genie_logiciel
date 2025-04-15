import Joi from "joi";

export const PaymentValidation = Joi.object({
  date: Joi.date(),
  
  description: Joi.string(),
  amount: Joi.number(),
  paymentType: Joi.string().valid("cash", "cheque", "virement bancaire"),
  paymentStatus: Joi.string().valid("paid", "unpaid", "partial"),
  trainingSession: Joi.string(),
  student: Joi.string(),
});
