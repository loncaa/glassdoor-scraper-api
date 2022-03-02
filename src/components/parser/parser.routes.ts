import * as express from 'express';
import * as asyncHandler from 'express-async-handler';
import * as parserController from './parser.controller';

const mapping = 'parser';
const router = express.Router();

router.post('/user', asyncHandler(parserController.parseUserProfileDataController));

export { router, mapping };