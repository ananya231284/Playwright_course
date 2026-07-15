
import playwrightConfig from "../playwright.config";
import {test, expect } from '@playwright/test';
test('Intro heading has correct text',async ({ page }) =>{
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'Docs' }).click();

  const heading = page.getByRole('heading' , { name: 'Introduction link to' })
  await expect(heading).toHaveText('Introduction')
  
  })