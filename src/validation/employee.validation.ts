import Joi from 'joi';




export const employeeValidation = Joi.object({
    firstName: Joi.string().min(2).max(10).required(),
    lastName: Joi.string().min(2).max(10).required(),
    email: Joi.string().min(6).max(30).required().email(),
    phoneNumber: Joi.number().required(),
    cin: Joi.number().required(),
    poste: Joi.string().required(),
  });
  