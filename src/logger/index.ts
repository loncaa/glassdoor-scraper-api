import winston from 'winston';
import * as DevLoggerFactory from './logger.dev';

const env = process.env.NODE_ENV || 'development';
let logger: winston.Logger;

if (env === 'development') {
  logger = DevLoggerFactory.createLogger();
} else {
  logger = DevLoggerFactory.createLogger();
}

export default logger;
