import * as UserProfileRepository from './userProfile.repository';
import * as ScraperDataRepository from '../scraper/scraperData.repository';
import { UserProfileModel } from './userProfile.model';

export function deleteUserProfile(username: string): UserProfileModel {
  ScraperDataRepository.removeScrapingData(username);
  return UserProfileRepository.removeUserProfile(username);
}
