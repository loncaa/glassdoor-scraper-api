import express from 'express';
import asyncHandler from 'express-async-handler';
import * as parserController from './scraper.controller';

const mapping = 'scraper';
const router = express.Router();

// @ts-ignore
router.post('/glassdoor/user', asyncHandler(parserController.parseUserProfileDataController));

export { router, mapping };
