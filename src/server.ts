import path from 'path';
import createError from 'http-errors';
//import { StatusCodes } from 'http-status-codes';
const { StatusCodes } = require('http-status-codes');
import express from 'express';

import LoggerMiddleware from './middleware/logger.middleware';
import { router } from './routes';

import { handleNoHttpErrors, handleErrors } from './middleware/error.middleware';
import logger from './logger';
import helmet from 'helmet';

const port = process.env['PORT'] || 3001;

const app = express();

app.use(helmet());

app.use(LoggerMiddleware);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//expose cvs folder as static folder
app.use('/cv', express.static(path.join(__dirname, '../cvs')));
app.use('/api', router);

app.listen({ port }, () => {
  logger.info(`🚀 Server ready at http://localhost:${port}`);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(StatusCodes.NOT_FOUND));
});

// error handler
app.use(handleNoHttpErrors);
app.use(handleErrors);
