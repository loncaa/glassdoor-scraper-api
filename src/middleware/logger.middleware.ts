import logger from '../logger';
import * as morgan from 'morgan';

const stream = {
  write: (message) => {
    logger.info(`${message.trim()}`);
  },
};

const skip = () => {
  const env = process.env.NODE_ENV || 'development';
  return env !== 'development';
};

var loggerFormat = ':method :url :status :response-time ms - :res[content-length]';
// Build the morgan middleware
export default morgan(loggerFormat, { stream, skip });
