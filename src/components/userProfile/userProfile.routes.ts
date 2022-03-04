import express from 'express';
import asyncHandler from 'express-async-handler';

import * as UserProfileController from './userProfile.controller';
import * as ValidatorMiddleware from '../../middleware/validator.middleware';

import { userProfileSchema } from './userProfile.vschema';

const mapping = 'user';
const router = express.Router();

router.get(
  '/',
  ValidatorMiddleware.validateQuery(userProfileSchema),
  // @ts-ignore
  asyncHandler(UserProfileController.getUserProfileData)
);

router.delete(
  '/',
  ValidatorMiddleware.validateQuery(userProfileSchema),
  // @ts-ignore
  asyncHandler(UserProfileController.deleteUserProfileData)
);

export { router, mapping };
