import Joi from 'joi';

export const scraperSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});
