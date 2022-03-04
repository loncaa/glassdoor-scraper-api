//import { StatusCodes } from 'http-status-codes';
const { StatusCodes } = require('http-status-codes');

import express from 'express';
import createError from 'http-errors';

import logger from '../logger';

export function handleNoHttpErrors(
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (err instanceof createError.HttpError) {
    return next(err);
  }

  return next(createError(StatusCodes.INTERNAL_SERVER_ERROR, err.message));
}

export function handleErrors(
  err: createError.HttpError,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  logger.error(err);

  const status = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
  res.status(status).json({ statusCode: status, message: err.message });
}
