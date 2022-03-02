import * as ParserService from './scraper.service';
import express from 'express';
import logger from '../../logger';

export async function parseUserProfileDataController(
  req: express.Request,
  res: express.Response
): Promise<express.Response> {
  const { username, password } = req.body;

  return res.status(200).json({ ok: true });
}
