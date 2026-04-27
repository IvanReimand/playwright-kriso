const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://www.kriso.ee/');
  console.log('readyState', await page.evaluate(() => document.readyState));
  console.log('query input', await page.evaluate(() => {
    const el = document.querySelector('input#top-search-text');
    return el ? el.outerHTML : null;
  }));
  console.log('query placeholder', await page.evaluate(() => {
    const el = document.querySelector('input[placeholder]');
    return el ? el.outerHTML : null;
  }));
  await browser.close();
})();