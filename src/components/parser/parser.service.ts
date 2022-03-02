import * as puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';
import axios from 'axios';

import logger from '../../logger';

async function createBrowser() {
    return puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
}

export async function gatherUserProfileData(username, password) {

    //download user cv and store to server
    //scrape user profile data
    return null;
}