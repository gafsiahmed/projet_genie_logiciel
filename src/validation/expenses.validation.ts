import Joi from "joi";

export const ExpensesValidation = Joi.object({
  date: Joi.date().required(),
  from: Joi.string().required(),
  description: Joi.string().required(),
  amount: Joi.number().required(),

  paymentType: Joi.string()
    .valid("cash", "cheque", "virement bancaire")
    .required(),
});
