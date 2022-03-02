import * as createError from 'http-errors';
import { StatusCodes } from 'http-status-code';
import * as express from 'express';

import LoggerMiddleware from './middleware/logger.middleware';
import { router } from './routes';

import { handleNoHttpErrors, handleErrors } from './middleware/error.middleware';
import logger from './logger';
import helmet from 'helmet';
import xss from 'xss';

const port = process.env['PORT'] || 3001;

export function startExpressServer() {
    const app = express();

    app.use(helmet());
    app.use(xss);

    app.use(LoggerMiddleware);

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use(express.static('public'));
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

    return app;
}
