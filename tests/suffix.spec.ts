import { test, expect, type Locator } from '@playwright/test';

const nbsp = ' ';

const getCaret = (input: Locator) => input.evaluate((el: HTMLInputElement) => el.selectionStart);

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:1235/');
});

test('keeps the caret before the currency when typing decimals in sv-SE', async ({ page }) => {
  const input = page.locator('#sv-se');
  const suffix = `${nbsp}kr`;

  await input.click();

  for (const [key, value] of [
    ['1', `1${suffix}`],
    ['2', `12${suffix}`],
    [',', `12,${suffix}`],
    ['5', `12,5${suffix}`],
  ]) {
    await page.keyboard.press(key);

    await expect(input).toHaveValue(value);
    await expect.poll(() => getCaret(input)).toBe(value.length - suffix.length);
  }
});

test('keeps the caret before a custom suffix when typing decimals', async ({ page }) => {
  const input = page.locator('#custom-suffix');
  const suffix = ' kg';

  await input.click();

  for (const [key, value] of [
    ['1', `1${suffix}`],
    ['2', `12${suffix}`],
    ['.', `12.${suffix}`],
    ['5', `12.5${suffix}`],
  ]) {
    await page.keyboard.press(key);

    await expect(input).toHaveValue(value);
    await expect.poll(() => getCaret(input)).toBe(value.length - suffix.length);
  }
});
