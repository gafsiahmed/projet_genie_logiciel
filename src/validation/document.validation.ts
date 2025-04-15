import Joi from "joi";

export const documentValidation = Joi.object({
  paymentMethod: Joi.string().required(),
  client: Joi.string().required(),
  date: Joi.date().required(),
  clientAdress: Joi.string().required(),
  MF: Joi.string().required(),
  description: Joi.string().required(),
  forfait: Joi.number().required(),
  total: Joi.number().required(),
  tva: Joi.number().required(),
  timbreFiscal: Joi.number().required(),
  Reference: Joi.number().required(),
});
