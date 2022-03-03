import puppeteer from 'puppeteer';
import * as path from 'path';
import * as cheerio from 'cheerio';
import { createBrowser, createPuppeteerPage } from '../puppeteer.helper';
import * as GlassDoorScraperHelper from './glassdoor.helper';

import logger from '../../../logger';
import { UserProfile } from '../../userProfile/userProfile.type';

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

export async function scrapeUserProfileData(username: string, password: string) {
  const browser = await createBrowser();
  const loginPage = await loginToGlassDoorPage(browser, username, password);

  // Get cookies
  const cookies = await loginPage.cookies();
  await loginPage.close();

  const userProfilePage = await getUserProfilePage(browser, cookies);

  //click close button
  try {
    await userProfilePage.click(
      '#ProfilePhoto div.profilePhotoBadge div.BadgeModalStyles__closeBtn___3Uha1'
    );
  } catch (err: any) {
    logger.error(err.message);
  }

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

  //retrieve page content and start scraping data
  const pageContent = await userProfilePage.content(); //TODO not returning whole html content
  const $ = cheerio.load(pageContent);

  const sections = $('section');
  const general = GlassDoorScraperHelper.scrapeUserGeneralInfo(sections, $);
  const about = GlassDoorScraperHelper.scrapeUserIntroduction(sections, $);
  const experiences = GlassDoorScraperHelper.scrapeUserExperience(sections, $);
  const educations = GlassDoorScraperHelper.scrapeUserEducation(sections, $);
  const skills = GlassDoorScraperHelper.scrapeUserSkills(sections, $);
  const licenseesAndCertificates = GlassDoorScraperHelper.scrapeUserLicensesAndCertificates(
    sections,
    $
  );

  const serializedFullName = general.fullName.trim().replace(/ /g, '_');
  const response: UserProfile = {
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

  return response;
}
