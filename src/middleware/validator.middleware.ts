const { StatusCodes } = require('http-status-codes');
import createError from 'http-errors';

export function validateBody(schema) {
  return (req, res, next) => {
    const { error: requestError } = schema.validate(req.body);
    if (requestError) {
      const { details } = requestError;
      const message = details.map((i) => i.message).join(',');

      return next(
        createError(StatusCodes.BAD_REQUEST, `Request body validation failed: ${message}`)
      );
    }

    next();
  };
}

export function validateQuery(schema) {
  return (req, res, next) => {
    const { error: requestError } = schema.validate(req.query);
    if (requestError) {
      const { details } = requestError;
      const message = details.map((i) => i.message).join(',');

      return next(
        createError(StatusCodes.BAD_REQUEST, `Request query validation failed: ${message}`)
      );
    }

    next();
  };
}
