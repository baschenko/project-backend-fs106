import Joi from 'joi';
import { typeList } from '../constants/movies.js';

export const movieAddSchema = Joi.object({
  title: Joi.string().required().min(3).max(6),
  director: Joi.string().required().messages({
    'any.required': `режисера треба вказати`,
  }),
  releaseYear: Joi.number().min(1985).required(),
  type: Joi.string().valid(...typeList),
});

export const movieUpdateSchema = Joi.object({
  title: Joi.string(),
  director: Joi.string(),
  type: Joi.string().valid(...typeList),
  releaseYear: Joi.number().min(1985),
});
