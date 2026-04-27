const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://www.kriso.ee/');
  const accept = page.getByRole('button', { name: 'Nõustun' });
  if (await accept.isVisible()) await accept.click();
  const input = page.getByRole('textbox', { name: 'Pealkiri, autor, ISBN, märksõna' }).first();
  await input.fill('harry potter');
  await page.getByRole('button', { name: 'Search' }).click();
  await page.waitForTimeout(2000);
  const add0 = page.getByRole('link', { name: 'Lisa ostukorvi' }).first();
  await add0.click();
  await page.waitForTimeout(2000);
  const wrapper = await page.locator('#wnd-modal-wrapper').elementHandle();
  console.log('wrapper exists', Boolean(wrapper));
  if (wrapper) {
    console.log(await wrapper.evaluate(el => el.outerHTML.slice(0, 400)));
  }
  const buttons = await page.locator('button, a').all();
  console.log('buttons count', buttons.length);
  for (let i = 0; i < Math.min(20, buttons.length); i++) {
    const btn = buttons[i];
    console.log(i, await btn.evaluate(el => el.outerText.trim()), await btn.evaluate(el => el.outerHTML.includes('wnd')));
  }
  await browser.close();
})();