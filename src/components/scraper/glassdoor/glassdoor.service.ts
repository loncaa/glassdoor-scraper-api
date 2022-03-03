import puppeteer from 'puppeteer';
import * as path from 'path';
import * as cheerio from 'cheerio';
import { createBrowser, createPuppeteerPage } from '../puppeteer.helper';
import * as GlassDoorScraper from './glassdoor.scraper';

import logger from '../../../logger';
import { UserData } from '../userData.type';

const LOGIN_URL = 'https://www.glassdoor.com/profile/login_input.htm';
const PROFILE_URL = 'https://www.glassdoor.com/member/profile/index.htm';

async function loginToGlassDoorPage(
  browser: puppeteer.Browser,
  username: string,
  password: string
): Promise<puppeteer.Page> {
  const page = await createPuppeteerPage(browser);
  await page.goto(LOGIN_URL, {
    waitUntil: 'networkidle0',
  });

  await page.type('#inlineUserEmail', username);
  await page.type('#inlineUserPassword', password);

  // click and wait for navigation
  await page.click('#InlineLoginModule form button');
  await page.waitForNavigation({ waitUntil: 'networkidle0' });

  return page;
}

async function getUserProfilePage(
  browser: puppeteer.Browser,
  cookies: puppeteer.Protocol.Network.CookieParam[]
): Promise<puppeteer.Page> {
  // Use cookies in another tab or browser
  const pageUserProfile = await createPuppeteerPage(browser);
  await pageUserProfile.setCookie(...cookies);
  // Open the page as a logged-in user
  await pageUserProfile.goto(PROFILE_URL, {
    waitUntil: 'networkidle0',
  });

  return pageUserProfile;
}

export async function fetchUserProfileData(username: string, password: string) {
  const browser = await createBrowser();
  const loginPage = await loginToGlassDoorPage(browser, username, password);

  // Get cookies
  const cookies = await loginPage.cookies();
  await loginPage.close();

  const userProfilePage = await getUserProfilePage(browser, cookies);

  //click close button
  await userProfilePage.click(
    '#ProfilePhoto div.profilePhotoBadge div.BadgeModalStyles__closeBtn___3Uha1'
  );

  //download resume
  // @ts-ignore
  await userProfilePage._client.send('Page.setDownloadBehavior', {
    behavior: 'allow',
    downloadPath: path.join(__dirname, '../../../../cvs'),
  });
  await userProfilePage.click(
    '#ProfileInfo > div > div.d-flex.no-gutters.justify-content-center.align-items-start.profileInfoStyle__actions___3-CvK > div:nth-child(2) > button'
  );

  await userProfilePage.waitForXPath('//section/p');

  //await userProfilePage.screenshot({ path: path.join(__dirname, 'ss.png') });

  //retrieve page content and start scraping data
  const pageContent = await userProfilePage.content(); //TODO not returning whole html content
  const $ = cheerio.load(pageContent);

  const general = GlassDoorScraper.scrapeUserGeneralInfo($);
  const about = GlassDoorScraper.scrapeUserIntroduction($);
  const experiences = GlassDoorScraper.scrapeUserExperience($);
  const educations = GlassDoorScraper.scrapeUserEducation($);
  const skills = GlassDoorScraper.scrapeUserSkills($);
  const licenseesAndCertificates = GlassDoorScraper.scrapeUserLicensesAndCertificates($);

  const serializedFullName = general.fullName.trim().replace(/ /g, '_');
  const response: UserData = {
    general,
    downloadUri: `/cv/${serializedFullName}.pdf`,
    educations,
    licenseesAndCertificates,
    experiences,
    about,
    skills,
  };

  await userProfilePage.close();
  await browser.close();

  //const data = await scrapeUserProfilePageContent(userProfilePageContent);
  //scrape user profile data
  return response;
}
