import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:1234/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/React Currency Input Field/);
});

test('can enter into input field', async ({ page }) => {
  await page.goto('http://localhost:1234/');

  await expect(page.locator('input#validationCustom01')).toHaveValue('£123.45');

  await page.locator('input#validationCustom01').clear();

  await expect(page.locator('input#validationCustom01')).toHaveValue('');

  await page.locator('input#validationCustom01').fill('99');

  await expect(page.locator('input#validationCustom01')).toHaveValue('£99');
});
