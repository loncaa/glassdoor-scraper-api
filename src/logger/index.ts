import winston from 'winston';
import * as DevLoggerFactory from './logger.dev';

let logger: winston.Logger;
if (process.env['NODE_ENV'] === 'development') {
  logger = DevLoggerFactory.createLogger();
} else {
  logger = DevLoggerFactory.createLogger();
}

export default logger;
