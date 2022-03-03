import * as GlassDoorService from './glassdoor/glassdoor.service';
import express from 'express';
import logger from '../../logger';

export async function scrapeUserProfileDataController(
  req: express.Request,
  res: express.Response
): Promise<express.Response> {
  const { username, password } = req.body;

  //check does data for that username exists
  //check expiration date

  const data = await GlassDoorService.fetchUserProfileData(username, password);

  return res.status(200).json({ ok: true, data });
}
