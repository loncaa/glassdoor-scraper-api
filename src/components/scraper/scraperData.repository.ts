import moment from 'moment';
import { UserProfileModel } from '../userProfile/userProfile.model';
import { ScraperDataModel, ScrapingStatus, UpdateScraperData } from './scraperData.model';

const SCRAPING_DATA_EXPIRES_IN = 2;

const InMemoryDatabase: Record<string, ScraperDataModel> = {};

export function getScrapedData(username): ScraperDataModel {
  return InMemoryDatabase[username];
}

export function createScrapingData(username): ScraperDataModel {
  const data: ScraperDataModel = {
    id: username,
    status: ScrapingStatus.SCRAPING,
    exp: moment().add(SCRAPING_DATA_EXPIRES_IN, 'm').unix(),
  };
  InMemoryDatabase[username] = data;

  return data;
}

export function checkIfScrapingDataExpiries(username) {
  const data = InMemoryDatabase[username];

  const expTime = moment.unix(data.exp);
  if (expTime.isBefore(moment())) {
    return true;
  }

  return false;
}

export function updateScrapingData(username, payload: UpdateScraperData): ScraperDataModel {
  const data: ScraperDataModel = { ...InMemoryDatabase[username], ...payload };
  InMemoryDatabase[username] = data;

  return data;
}

export function updateScrapingDataStatus(username, status: string): ScraperDataModel {
  const data: ScraperDataModel = { ...InMemoryDatabase[username], status };
  InMemoryDatabase[username] = data;

  return data;
}

export function updateScrapingDataUserProfileData(
  username,
  payload: UserProfileModel
): ScraperDataModel {
  const data: ScraperDataModel = { ...InMemoryDatabase[username], userProfile: payload };
  InMemoryDatabase[username] = data;

  return data;
}

export function removeScrapingData(username): ScraperDataModel {
  const data = { ...InMemoryDatabase[username] };
  delete InMemoryDatabase[username];
  return data;
}
