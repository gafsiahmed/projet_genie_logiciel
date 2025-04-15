import Joi from "joi";

export const transactionValidation = Joi.object({
  date: Joi.date().required(),
  from: Joi.string().required(),
  description: Joi.string().required(),
  amount: Joi.number().required(),
  __t : Joi.string().valid("Expense", "Revenu").required(),
  // category: Joi.string().valid("Revenu", "Depense").required(),

  paymentType: Joi.string()
    .valid("cash", "cheque", "virement bancaire")
    .required(),
});
