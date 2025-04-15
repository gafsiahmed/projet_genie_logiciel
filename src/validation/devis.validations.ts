import Joi from "joi";

export const devisValidation = Joi.object({
  NumeroDevis: Joi.string().required(),
  NomClient: Joi.string().min(2).max(20).required(),
  totalTTC: Joi.number().required(),
  TotaleHT: Joi.number().required(),
  descripcion: Joi.string().required(),
  Quantite: Joi.number().required(),
  TotaleTVA: Joi.number().required(),
  dateOfCreation: Joi.string().required(),
  methodPaiment: Joi.string().required(),
  link: Joi.string().required(),
});
