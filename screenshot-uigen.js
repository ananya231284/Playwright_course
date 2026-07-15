const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT = 'C:/Users/anany/AppData/Local/Temp/claude/C--Users-anany-OneDrive-Documents-Claude-Project-uigen/91efc087-60dd-403d-804a-e63d059e331e/scratchpad/screenshots';
fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1400, height: 900 });

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(OUT, '1-home.png'), fullPage: false });
  console.log('Screenshot saved: 1-home.png');

  // Type a prompt
  const textarea = page.locator('textarea').first();
  await textarea.waitFor({ timeout: 8000 });
  await textarea.fill('create a pricing card component');
  await page.screenshot({ path: path.join(OUT, '2-prompt-typed.png') });
  console.log('Screenshot saved: 2-prompt-typed.png');

  await textarea.press('Enter');
  console.log('Prompt submitted, waiting for generation...');

  // Wait for response to complete (look for non-streaming state)
  await page.waitForTimeout(12000);
  await page.screenshot({ path: path.join(OUT, '3-after-generation.png') });
  console.log('Screenshot saved: 3-after-generation.png');

  // Switch to code view
  const codeTab = page.locator('[data-value="code"]').first();
  if (await codeTab.isVisible({ timeout: 3000 }).catch(() => false)) {
    await codeTab.click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(OUT, '4-code-view.png') });
    console.log('Screenshot saved: 4-code-view.png');
  }

  await browser.close();
  console.log('Done. Screenshots at:', OUT);
})().catch(err => { console.error(err); process.exit(1); });
