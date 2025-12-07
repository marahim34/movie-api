import Joi from "joi";

const movieSchema = Joi.object({
    title: Joi.string().min(1).max(200).required(),
    director: Joi.string().min(1).max(200).required(),
    year: Joi.number()
    .integer()
    .min(1888)
    .max(new Date().getFullYear())
    .required(),
})


export const validateMovie = (req, res, next) => {
  const { error, value } = movieSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    return res.status(400).json({
      error: error.details[0].message, 
    });
  }

  req.body = value;
  next();
};

