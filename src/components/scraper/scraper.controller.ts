import ScraperQueue from './scraper.queue';
import express from 'express';
import logger from '../../logger';

import * as ScraperDataRepository from './scraperData.repository';

export async function scrapeUserProfileDataController(
  req: express.Request,
  res: express.Response
): Promise<express.Response> {
  const { username, password } = req.body;
  const { f } = req.query;
  const force = f === 'true';

  let data = await ScraperDataRepository.getScrapedData(username);
  if (force || !data || ScraperDataRepository.checkIfScrapingDataExpiries(username)) {
    data = await ScraperDataRepository.createScrapingData(username);
    await ScraperQueue.add({ username, password });
  }

  return res.status(200).json({ data });
}
