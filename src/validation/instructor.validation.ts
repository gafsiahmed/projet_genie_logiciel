import Joi from "joi";

export const instructorValidation = Joi.object({
  email: Joi.string().min(6).max(30).required().email(),
  password: Joi.string()
    .min(6)
    .max(50)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
  firstName: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
  role: Joi.string()
    .min(3)
    .max(30)
    .required()
    .valid("admin", "marketingManager", "instructor", "user"),
  phoneNumber: Joi.number().required(),
  training : Joi.string().required()
});

export const instructorValidationForUpdate = Joi.object({
  email: Joi.string().min(6).max(30).email().optional(),
  password: Joi.string()
    .min(6)
    .max(50)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .optional(),
  firstName: Joi.string().min(3).max(30).optional(),
  lastName: Joi.string().min(3).max(30).optional(),
  role: Joi.string()
    .min(3)
    .max(30)
    .optional()
    .valid("admin", "marketingManager", "instructor", "user"),
  phoneNumber: Joi.number().optional(),
  training : Joi.string().optional()
});
