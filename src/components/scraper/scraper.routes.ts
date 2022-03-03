import express from 'express';
import asyncHandler from 'express-async-handler';
import * as ParserController from './scraper.controller';

const mapping = 'scraper';
const router = express.Router();

// @ts-ignore
router.post('/glassdoor/user', asyncHandler(ParserController.scrapeUserProfileDataController));

export { router, mapping };
