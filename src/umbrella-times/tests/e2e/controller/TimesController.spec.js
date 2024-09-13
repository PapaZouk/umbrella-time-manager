import {expect, test} from "@playwright/test";

test.describe('TimesController', () => {
    const timeControllerAddButton = 'time-controller-add-button';
    const addDayOffButton = 'time-controller-day-off-button';
    const businessTripAddButtonId = 'time-controller-business-trip-button';
    const errorMessagePopupId = 'error-message-popup';
    const monthInputId = 'month-selector-input';
    const daySelectId = 'day-selector-select';

    const addEmployeeErrorMessage = 'Wybierz pracownika';
    const selectMonthErrorMessage = 'Wybierz miesiąc';

    test('display add hours button', async ({ page }) => {
        await page.goto('/');

        const header = await page.getByTestId(timeControllerAddButton);

        await expect(header).toBeVisible();
        expect(await header.textContent()).toBe('Dodaj godziny');
    });

    test('display add day off button', async ({ page }) => {
        await page.goto('/');

        const annualLeaveButton = await page.getByTestId(addDayOffButton);

        await expect(annualLeaveButton).toBeVisible();
    });

    test('display business trip add button', async ({ page }) => {
        await page.goto('/');

        const addButton = await page.getByTestId(businessTripAddButtonId);

        await expect(addButton).toBeVisible();
        expect(await addButton.textContent()).toBe('Wyjazd służbowy');
    });

    test('when no data was filled and business trip button was clicked, should display error message', async ({ page }) => {
        await page.goto('/');
        await page.getByTestId(businessTripAddButtonId).click();

        const errorMessage = await page.getByTestId(errorMessagePopupId);
        await expect(errorMessage).toBeVisible();
        expect(await errorMessage.textContent()).toBe(selectMonthErrorMessage);

        await page.waitForTimeout(2000);

        await expect(errorMessage).not.toBeVisible();
    });

    test('when month and day was filled but no employee was selected and business trip button was clicked, should display error message', async ({ page }) => {
        await page.goto('/');
        await page.getByTestId(monthInputId).fill('2024-08');
        await page.getByTestId(daySelectId).selectOption({ index: 2 });

        await page.getByTestId(businessTripAddButtonId).click();

        const errorMessage = await page.getByTestId(errorMessagePopupId);
        await expect(errorMessage).toBeVisible();
        expect(await errorMessage.textContent()).toBe(addEmployeeErrorMessage);

        await page.waitForTimeout(2000);

        await expect(errorMessage).not.toBeVisible();
    });
});
