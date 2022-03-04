import Joi from 'joi';

export const userProfileSchema = Joi.object({
  u: Joi.string().required(),
});
