import puppeteer from 'puppeteer';
import { TwitterClient } from 'twitter-api-client';
import fs from 'fs';

const twitterClient = new TwitterClient({
  apiKey: '',
  apiSecret: '',
  accessToken: '',
  accessTokenSecret: ''
});

async function changebanner() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://joyful-cannoli-c639e3.netlify.app/', {"waitUntil" : "networkidle0"});

    await page.waitForSelector('#screenshot');
    const element = await page.$('#screenshot');
    await element.screenshot({path: 'screenshot.png'});

    await browser.close();

    var image_base64 = fs.readFileSync('./screenshot.png', 'base64');
    await twitterClient.accountsAndUsers
    .accountUpdateProfileBanner({
      banner: image_base64,
    })
    .then(() => {
      console.log("Upload to Twitter done");
    }) 
    .catch(err => {
      console.log(err);
    })
 };

