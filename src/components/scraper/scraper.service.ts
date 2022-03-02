import puppeteer from 'puppeteer';
import * as path from 'path';
import * as cheerio from 'cheerio';
import axios from 'axios';

import logger from '../../logger';

async function createBrowser(): Promise<puppeteer.Browser> {
  const browser = await puppeteer.launch({
    headless: false,
  });

  /**
     * await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    */

  return browser;
}

async function createPuppeteerPage(browser: puppeteer.Browser): Promise<puppeteer.Page> {
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 720 });

  return page;
}

async function loginToGlassDoorPage(
  browser: puppeteer.Browser,
  username: string,
  password: string
): Promise<puppeteer.Page> {
  const page = await createPuppeteerPage(browser);
  await page.goto('https://www.glassdoor.com/profile/login_input.htm', {
    waitUntil: 'networkidle0',
  });

  await page.type('#inlineUserEmail', username);
  await page.type('#inlineUserPassword', password);

  // click and wait for navigation
  await page.click(
    '#InlineLoginModule > div > div.mx-auto.my-0.maxw-sm-authInlineInner.px-std.px-sm-xxl.d-flex.flex-column.mw-400 > div > form > div.d-flex.align-items-center.flex-column > button > span'
  );
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
  await pageUserProfile.goto('https://www.glassdoor.com/member/profile/index.htm');

  await pageUserProfile.click(
    '#ProfilePhoto > div > div > div.profilePhotoBadge > div > div > div > div > div.BadgeModalStyles__closeBtn___3Uha1.py-sm.px-lg'
  );

  return pageUserProfile;
}

async function parseUserProfilePageContent(content: string) {
  //contact data: //section/div/div[2]/div[2]/div[*]/div[*]/div
}

export async function gatherUserProfileData(username: string, password: string) {
  const browser = await createBrowser();
  const loginPage = await loginToGlassDoorPage(browser, username, password);

  // Get cookies
  const cookies = await loginPage.cookies();
  await loginPage.close();

  const userProfilePage = await getUserProfilePage(browser, cookies);

  //download resume
  // @ts-ignore
  await userProfilePage._client.send('Page.setDownloadBehavior', {
    behavior: 'allow',
    downloadPath: path.join(__dirname, '../../../cvs'),
  });
  await userProfilePage.click(
    '#ProfileInfo > div > div.d-flex.no-gutters.justify-content-center.align-items-start.profileInfoStyle__actions___3-CvK > div:nth-child(2) > button'
  );

  const userProfilePageContent = await userProfilePage.content();
  await userProfilePage.close();
  await browser.close();

  const data = parseUserProfilePageContent(userProfilePageContent);
  //scrape user profile data
  return null;
}
