const { StatusCodes } = require('http-status-codes');
import createError from 'http-errors';
import express from 'express';
import logger from '../../logger';

import * as UserProfileRepository from './userProfile.repository';

/**
 *
 */
export async function getUserProfileData(
  req: express.Request,
  res: express.Response
): Promise<express.Response> {
  const { u: username } = req.query;

  const profile = UserProfileRepository.getUserProfile(username);
  if (!profile) {
    logger.info(`Profile with username ${username} not scraped jet.`);

    throw createError(StatusCodes.NOT_FOUND, `Cannot find profile with username ${username}.`);
  }

  return res.status(200).json({ profile });
}

/**
 *
 */
export async function deleteUserProfileData(
  req: express.Request,
  res: express.Response
): Promise<express.Response> {
  const { u: username } = req.query;

  const profile = UserProfileRepository.deleteUserProfile(username);
  if (!profile) {
    logger.info(`Profile with username ${username} not scraped jet.`);

    throw createError(StatusCodes.NOT_FOUND, `Cannot find profile with username ${username}.`);
  }

  return res.status(200).json({ profile });
}
