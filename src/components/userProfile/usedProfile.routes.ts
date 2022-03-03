import express from 'express';
import asyncHandler from 'express-async-handler';
import * as UserProfileController from './usedProfile.controller';

const mapping = 'user';
const router = express.Router();

router.get('/', asyncHandler(UserProfileController.getScrapedUserProfileData));
router.delete('/', asyncHandler(UserProfileController.deleteScrapedUserProfileData));

export { router, mapping };
