import { StatusCodes } from 'http-status-code';
import * as createError from 'http-errors';

import logger from '../logger';

export function handleNoHttpErrors(err, req, res, next) {
  if (err instanceof createError.HttpError) {
    return next(err);
  }

  return next(createError(StatusCodes.INTERNAL_SERVER_ERROR, err.message, err.stack));
}

export function handleErrors(err, req, res, next) {
  logger.error(err);

  res
    .status(err.status || StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ ok: false, message: err.message });
}
