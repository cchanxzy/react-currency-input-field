import { test, expect, type Locator } from '@playwright/test';

const caret = (input: Locator) => input.evaluate((el: HTMLInputElement) => el.selectionStart);

test.describe('editing a £ input', () => {
  let input: Locator;

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:1234/');
    input = page.locator('input#validationCustom01');
    await input.clear();
  });

  test('formats digits typed into an empty input', async () => {
    await input.pressSequentially('1234567');

    await expect(input).toHaveValue('£1,234,567');
    expect(await caret(input)).toBe('£1,234,567'.length);
  });

  test('inserts a digit in the middle of an existing value', async () => {
    await input.pressSequentially('1234');
    await expect(input).toHaveValue('£1,234');

    await input.press('ArrowLeft');
    await input.press('ArrowLeft');
    await input.press('9');

    await expect(input).toHaveValue('£12,934');
    expect(await caret(input)).toBe('£12,9'.length);
  });

  test('removes the last digit with Backspace and regroups', async () => {
    await input.pressSequentially('1234');
    await expect(input).toHaveValue('£1,234');

    await input.press('Backspace');
    await input.press('Backspace');
    await expect(input).toHaveValue('£12');
  });

  test('replaces the whole value when everything is selected', async () => {
    await input.pressSequentially('1234');
    await expect(input).toHaveValue('£1,234');

    await input.press('ControlOrMeta+a');
    await input.pressSequentially('56');

    await expect(input).toHaveValue('£56');
  });

  test('steps the value with ArrowUp and ArrowDown', async () => {
    await input.pressSequentially('10');

    await input.press('ArrowUp');
    await expect(input).toHaveValue('£11');

    await input.press('ArrowDown');
    await input.press('ArrowDown');
    await expect(input).toHaveValue('£9');
  });
});

test.describe('editing a de-DE € input', () => {
  let input: Locator;

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:1234/');
    input = page.locator('input#validationCustom04');
    await input.clear();
  });

  test('formats digits typed into an empty input', async () => {
    await input.pressSequentially('1234567');

    await expect(input).toHaveValue('1.234.567\u00a0€');
  });

  test('types a decimal with the comma separator', async () => {
    await input.pressSequentially('12,5');

    await expect(input).toHaveValue('12,5\u00a0€');
  });

  test('steps the value with ArrowUp and ArrowDown', async () => {
    await input.pressSequentially('10');

    await input.press('ArrowUp');
    await expect(input).toHaveValue('11\u00a0€');

    await input.press('ArrowDown');
    await input.press('ArrowDown');
    await expect(input).toHaveValue('9\u00a0€');
  });
});
