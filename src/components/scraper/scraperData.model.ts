import { UserProfileModel } from '../userProfile/userProfile.model';

export const ScrapingStatus = {
  SCRAPING: 'scraping',
  DONE: 'done',
  FAILED: 'failed',
};

/**
 * @argument id is a username
 * @argument exp is time when scraped data expires and new scraping is needed
 */
export type ScraperDataModel = {
  id: string;
  status: string;
  userProfile?: UserProfileModel;
  exp: number;
};

export type UpdateScraperData = {
  status?: string;
  userProfile?: UserProfileModel;
  exp?: number;
};
