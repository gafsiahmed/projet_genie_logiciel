import Joi from "joi";

export const transactionValidation = Joi.object({
  date: Joi.date().default(Date.now),
  amount: Joi.number().required().min(0),
  description: Joi.string().required().min(3),
  category: Joi.string().required(),
  from: Joi.string().required(),
  paymentType: Joi.string().valid("cash", "check", "bank", "other").default("cash"),
  transactionType: Joi.string().valid("Income", "Expense").required(),
  relatedEntity: Joi.string().allow(null, ""),
  relatedEntityModel: Joi.string().valid("Student", "Invoice", "Instructor").default("Student")
});