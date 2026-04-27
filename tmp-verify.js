const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://www.kriso.ee/');
  const accept = page.getByRole('button', { name: 'Nõustun' });
  console.log('accept visible', await accept.isVisible());
  if (await accept.isVisible()) await accept.click();
  const input = page.getByPlaceholder('Pealkiri, autor, ISBN, mrksna');
  console.log('placeholder visible', await input.isVisible());
  console.log('input count', await input.count());
  if (await input.count() > 0) {
    console.log('input outerHTML', await input.first().evaluate(el => el.outerHTML));
  }
  const button = page.getByRole('button', { name: 'Search' });
  console.log('search button count', await button.count());
  console.log('button visible', await button.isVisible());
  await browser.close();
})();