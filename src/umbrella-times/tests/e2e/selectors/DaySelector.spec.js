import {expect, test} from "@playwright/test";
import loginAsUser from "../helpers/AuthenticationHelper";


test.describe('DaySelector', () => {
    const monthInputId = 'month-selector-input';
    const daySelectorSelectId = 'day-selector-select';
    const errorMessagePopupId = 'error-message-popup';
    const weekendDayErrorMessage = 'Wybrany dzień jest weekendem. Proszę wybrać dzień roboczy';
    const holidayErrorMessage = 'Wybrany dzień jest świętem. Proszę wybrać dzień roboczy';

    test.beforeEach( async ({ page }) => {
        await page.goto('/');

        await loginAsUser(page, {username: "User", password: "password"});
    });

    test('display label day', async ({ page }) => {
        const daySelectorLabel = await page.getByTestId('day-selector-input');
        expect(await daySelectorLabel.textContent()).toBe('Wybierz dzień:');
    });

    test('when set up month, should display month days in selector', async  ({ page }) => {
        await page.locator('input[data-testid="month-selector-input"]').fill("2024-08");

        const select = await page.locator('select[data-testid="day-selector-select"]');
        const optionCount = await select.locator('option').count();
        const dayCount = optionCount - 1;

        expect(dayCount).toBeGreaterThan(0);
    });

    test('when no month selected, should no day be available', async ({ page }) => {
       const select = await page.locator('select[data-testid="day-selector-select"]');
       const optionCount = await select.locator('option').count();
       const dayCount = optionCount - 1;

       expect(dayCount).toEqual(0);
    });

    test('when given day is a weekend, should display error message', async ({ page }) => {
       await page.getByTestId(monthInputId).fill('2024-08')
       await page.getByTestId(daySelectorSelectId).selectOption('3');

       const errorMessage = await page.getByTestId(errorMessagePopupId);
       await expect(errorMessage).toBeVisible();
       expect(await errorMessage.textContent()).toBe(weekendDayErrorMessage);

       await page.waitForTimeout(2000);
       await expect(errorMessage).not.toBeVisible();
    });

    test('when given day is a holiday, should display error message', async ({ page }) => {
       await page.getByTestId(monthInputId).fill('2024-08')
       await page.getByTestId(daySelectorSelectId).selectOption('15');

       const errorMessage = await page.getByTestId(errorMessagePopupId);
       await expect(errorMessage).toBeVisible();
       expect(await errorMessage.textContent()).toBe(holidayErrorMessage);

       await page.waitForTimeout(2000);
       await expect(errorMessage).not.toBeVisible();
    });

    test('should fill day selector correctly', async ({ page }) => {
        await page.locator('input[data-testid="month-selector-input"]').fill('2024-08');

        const daySelect = page.locator('select[data-testid="day-selector-select"]');
        expect(daySelect).toBeEnabled();

        await daySelect.selectOption('2');

        const selectedOption = await daySelect.inputValue();
        expect(selectedOption).toBe('2');
    });
});
