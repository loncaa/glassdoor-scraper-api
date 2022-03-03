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

  return res.status(200).json({ profile });
}
