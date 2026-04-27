const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://www.kriso.ee/');
  const locator = page.locator('input[placeholder="Pealkiri, autor, ISBN, mrksna"]');
  console.log('count', await locator.count());
  if (await locator.count() > 0) console.log(await locator.first().evaluate(el => el.outerHTML));
  await browser.close();
})();