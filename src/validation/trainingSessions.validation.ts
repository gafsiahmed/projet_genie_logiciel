import Joi from "joi";

export const trainingSessionValidation = Joi.object({
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  instructor: Joi.string().required(),
  students: Joi.array(),
  training: Joi.string().required(),
});
