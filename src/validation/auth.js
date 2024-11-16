import Joi from 'joi';
import { emailRegexp } from '../constants/users.js';

//singup
export const authRegisterShema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

//signin
export const authLoginShema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
