import Joi from "joi";

export const IncomesValidation = Joi.object({
  date: Joi.date().required(),
  from: Joi.string().optional(),
  description: Joi.string().required(),
  amount: Joi.number().required(),
  paymentType: Joi.string()
    .valid("cash", "cheque", "virement bancaire")
    .required(),
  category : Joi.string().valid("TrainingPayment").optional(),
  student : Joi.string().optional(),
});
