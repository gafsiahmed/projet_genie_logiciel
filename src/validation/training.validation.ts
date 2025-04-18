import Joi from "joi";

export const trainingValidation = Joi.object({
  name: Joi.string().min(6).max(30).required(),
  description: Joi.string().min(6).max(300).required(),
  price: Joi.number().required(),
  category: Joi.string()
    .min(6)
    .max(30)
    .required()
    .valid(
      "Developpement Web 1",
      "Developpement Web 2",
      "Developpement Web 3",
      "Design",
      "Marketing",
      "Python",
      "UX/UI",
      "Junior",
      "Data science"
    ),
});
