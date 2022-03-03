import puppeteer from 'puppeteer';

export async function createBrowser(): Promise<puppeteer.Browser> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  return browser;
}

export async function createPuppeteerPage(browser: puppeteer.Browser): Promise<puppeteer.Page> {
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 720 });

  return page;
}
