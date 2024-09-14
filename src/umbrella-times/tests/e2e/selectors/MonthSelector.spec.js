import {test, expect} from '@playwright/test';
import loginAsUser from "../helpers/AuthenticationHelper";

test.describe('MonthSelector', () => {
  test.beforeEach( async ({ page }) => {
    await page.goto('/');

    await loginAsUser(page, {username: "User", password: "password"});
  });

  test('display label for calendar month', async ({ page }) => {
    const monthSelectorLabel = await page.getByTestId('month-selector-label');
    expect(await monthSelectorLabel.textContent()).toBe('Wybierz miesiąc:');
  });

  test('should fill month input correctly', async ({ page }) => {
    await page.locator('input[data-testid="month-selector-input"]').fill('2024-08');

    const monthInputValue = await page
        .locator('input[data-testid="month-selector-input"]')
        .inputValue();
    expect(monthInputValue).toBe('2024-08');
  });
});
