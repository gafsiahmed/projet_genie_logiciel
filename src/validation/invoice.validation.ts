import Joi from "joi";

export const invoiceValidation = Joi.object({
  refFacture: Joi.string().required(),
  nomFournisseur: Joi.string().min(2).max(20).required(),
  dateOfCreation: Joi.string().required(),
  totalTTC: Joi.number().required(),
  Solde: Joi.number().required(),
  methodPaiment: Joi.string().required(),
  link: Joi.string().required(),
});
