import {expect, test} from "@playwright/test";

test.describe('TimeSelectorUI', () => {
    const timeSelectorH3Id = 'time-selector-h3';
    const selectorCheckInLabelId = 'time-selector-check-in-label';
    const selectorCheckOutLabelId = 'time-selector-check-out-label';
    const checkInInputId = 'time-selector-check-in-input';
    const checkOutInputId = 'time-selector-check-out-input';
    const annualLeaveButtonId = 'time-selector-annual-leave-button';
    const selectorAddButtonId = 'time-selector-add-button';

test('display header with correct value', async ({ page }) => {
    await page.goto('/');

    const header = await page.getByTestId(timeSelectorH3Id);

    await expect(header).toBeVisible();
    expect(await header.textContent()).toBe('Wybierz godziny pracy');
});

test('display check-in and check-out labels', async ({ page }) => {
    await page.goto('/');

    const checkInLabel = await page.getByTestId(selectorCheckInLabelId);
    const checkOutLabel = await page.getByTestId(selectorCheckOutLabelId);

    await expect(checkInLabel).toBeVisible();
    await expect(checkOutLabel).toBeVisible();

    expect(await checkInLabel.textContent()).toBe('Przyjście');
    expect(await checkOutLabel.textContent()).toBe('Wyjście');
});

test('display check-in input for time', async ({ page }) => {
    await page.goto('/');
    const checkInInput = await page.getByTestId(checkInInputId);
    await expect(checkInInput).toBeVisible();
});

test('display check-out input for time', async ({ page }) => {
    await page.goto('/');
    const checkInInput = await page.getByTestId(checkOutInputId);
    await expect(checkInInput).toBeVisible();
});

test('display annual leave button', async ({ page }) => {
    await page.goto('/');

    const annualLeaveButton = await page.getByTestId(annualLeaveButtonId);

    await expect(annualLeaveButton).toBeVisible();
    expect(await annualLeaveButton.textContent()).toBe('Urlop');
});

test('display add time button', async ({ page }) => {
    await page.goto('/');

    const addButton = await page.getByTestId(selectorAddButtonId);

    await expect(addButton).toBeVisible();
    expect(await addButton.textContent()).toBe('Dodaj');
});
});
