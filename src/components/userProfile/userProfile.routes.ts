import express from 'express';
import asyncHandler from 'express-async-handler';
import * as UserProfileController from './userProfile.controller';

const mapping = 'user';
const router = express.Router();
// @ts-ignore
router.get('/', asyncHandler(UserProfileController.getUserProfileData));

// @ts-ignore
router.delete('/', asyncHandler(UserProfileController.deleteUserProfileData));

export { router, mapping };
