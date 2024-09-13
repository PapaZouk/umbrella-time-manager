import {test, expect} from '@playwright/test';

test.describe('MonthSelector', () => {
  test('display label for calendar month', async ({ page }) => {
    await page.goto('/');
    const monthSelectorLabel = await page.getByTestId('month-selector-label');
    expect(await monthSelectorLabel.textContent()).toBe('Wybierz miesiąc:');
  });

  test('should fill month input correctly', async ({ page }) => {
    await page.goto('/');

    await page.locator('input[data-testid="month-selector-input"]').fill('2024-08');

    const monthInputValue = await page
        .locator('input[data-testid="month-selector-input"]')
        .inputValue();
    expect(monthInputValue).toBe('2024-08');
  });
});
