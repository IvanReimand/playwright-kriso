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
  await page.getByRole('link', { name: 'Lisa ostukorvi' }).first().click();
  await page.waitForTimeout(2000);
  const wrapperHandle = await page.locator('#wnd-modal-wrapper').elementHandle();
  const nodes = await wrapperHandle.evaluate(wrapper => {
    const buttons = Array.from(wrapper.querySelectorAll('button, a'));
    return buttons.map(el => ({text: el.innerText.trim(), tag: el.tagName, outer: el.outerHTML.slice(0,200)}));
  });
  console.log(JSON.stringify(nodes.slice(0,40), null, 2));
  await browser.close();
})();