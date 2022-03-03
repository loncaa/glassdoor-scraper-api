import express from 'express';
import logger from '../../logger';

/**
 *
 */
export async function getScrapedUserProfileData(
  req: express.Request,
  res: express.Response
): Promise<express.Response> {
  const { u: username } = req.query;

  //check does data for that username exists
  //check expiration date

  return res.status(200).json({ ok: true });
}

/**
 *
 */
export async function deleteScrapedUserProfileData(
  req: express.Request,
  res: express.Response
): Promise<express.Response> {
  const { u: username } = req.query;

  //check does data for that username exists
  //check expiration date

  return res.status(200).json({ ok: true });
}
