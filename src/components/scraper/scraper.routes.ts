import express from 'express';
import asyncHandler from 'express-async-handler';

import * as ParserController from './scraper.controller';
import * as ValidatorMiddleware from '../../middleware/validator.middleware';

import { scraperSchema } from './scraper.vschema';

const mapping = 'scraper';
const router = express.Router();

router.post(
  '/glassdoor/userprofile',
  ValidatorMiddleware.validateBody(scraperSchema),
  // @ts-ignore
  asyncHandler(ParserController.scrapeUserProfileDataController)
);

export { router, mapping };
