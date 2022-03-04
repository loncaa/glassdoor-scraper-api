import Queue from 'bull';

import * as GlassDoorScraper from './glassdoor/glassdoor.scraper';
import { ScrapingStatus } from './scraperData.model';

import * as ScraperDataRepository from './scraperData.repository';
import * as UserDataRepository from '../userProfile/userProfile.repository';

const scraperQueue = new Queue('glassdoor scraper');

scraperQueue.process(async function (job) {
  const { username, password } = job.data;
  return await GlassDoorScraper.scrapeUserProfileData(username, password);
});

scraperQueue.on('failed', async function (job, err) {
  const { username } = job.data;
  console.log(`Job ${job.id} failed ${JSON.stringify(err)}`);

  const payload = {
    status: ScrapingStatus.FAILED,
    message: err.message,
  };
  await ScraperDataRepository.updateScrapingData(username, payload);
});

scraperQueue.on('completed', async function (job, scrapedData) {
  const { username } = job.data;
  const userProfile = await UserDataRepository.createUserProfile(username, scrapedData);

  const payload = {
    status: ScrapingStatus.DONE,
    userProfile,
  };
  await ScraperDataRepository.updateScrapingData(username, payload);
});

export default scraperQueue;
