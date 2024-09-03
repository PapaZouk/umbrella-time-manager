import {expect, test} from "@playwright/test";

test.describe('TimesController', () => {
    const timeControllerAddButton = 'time-controller-add-button';
    const checkInLabelId = 'time-selector-check-in-label';
    const checkOutLabelId = 'time-selector-check-out-label';
    const checkInInputId = 'time-selector-check-in-input';
    const checkOutInputId = 'time-selector-check-out-input';
    const timesSaveButtonId = 'times-input-save-button';
    const annualLeaveButtonId = 'time-controller-annual-leave-button';
    const businessTripAddButtonId = 'time-controller-business-trip-button';
    const errorMessagePopupId = 'error-message-popup';
    const monthInputId = 'month-selector-input';
    const daySelectId = 'day-selector-select';

    const selectDayErrorMessage = 'Wybierz dzień aby dodać godziny pracy.';
    const addEmployeeErrorMessage = 'Wybierz pracownika';
    const fillAllDataErrorMessage = 'Uzupełnij wszystkie dane';

    test('display add hours button', async ({ page }) => {
        await page.goto('/');

        const header = await page.getByTestId(timeControllerAddButton);

        await expect(header).toBeVisible();
        expect(await header.textContent()).toBe('Dodaj godziny');
    });

    test('display check-in and check-out labels when add hours button is clicked', async ({ page }) => {
        await page.goto('/');
        await page.getByTestId(timeControllerAddButton).click();

        const checkInLabel = await page.getByTestId(checkInLabelId);
        const checkOutLabel = await page.getByTestId(checkOutLabelId);

        await expect(checkInLabel).toBeVisible();
        await expect(checkOutLabel).toBeVisible();

        expect(await checkInLabel.textContent()).toBe('Przyjście');
        expect(await checkOutLabel.textContent()).toBe('Wyjście');
    });

    test('display check-in and check-out inputs when add hours button is clicked', async ({ page }) => {
        await page.goto('/');
        await page.getByTestId(timeControllerAddButton).click();

        const checkInInput = await page.getByTestId(checkInInputId);
        const checkOutInput = await page.getByTestId(checkOutInputId);

        await expect(checkInInput).toBeVisible();
        await expect(checkOutInput).toBeVisible();
    });

    test('hides check-in, check-out labels and inputs and save button when add times button was clicked', async ({ page }) => {
       await page.goto('/');
       await page.getByTestId(timeControllerAddButton).click();

       const checkInLabel = await page.getByTestId(checkInLabelId);
       const checkInInput = await page.getByTestId(checkInInputId);
       const checkOutLabel = await page.getByTestId(checkOutLabelId);
       const checkOutInput = await page.getByTestId(checkOutInputId);
       const timesSaveButton = await page.getByTestId(timesSaveButtonId);

       await expect(checkInLabel).toBeVisible();
       await expect(checkInInput).toBeVisible();
       await expect(checkOutLabel).toBeVisible();
       await expect(checkOutInput).toBeVisible();
       await expect(timesSaveButton).toBeVisible();

       await page.getByTestId(timeControllerAddButton).click();

       await page.waitForTimeout(200);

        await expect(checkInLabel).not.toBeVisible();
        await expect(checkInInput).not.toBeVisible();
        await expect(checkOutLabel).not.toBeVisible();
        await expect(checkOutInput).not.toBeVisible();
        await expect(timesSaveButton).not.toBeVisible();
    });

    test('hides check-in and check-out labels, inputs and save button when add annual leave button was clicked', async ({ page }) => {
       await page.goto('/');
       await page.getByTestId(timeControllerAddButton).click();

       const checkInLabel = await page.getByTestId(checkInLabelId);
       const checkInInput = await page.getByTestId(checkInInputId);
       const checkOutLabel = await page.getByTestId(checkOutLabelId);
       const checkOutInput = await page.getByTestId(checkOutInputId);
       const timesSaveButton = await page.getByTestId(timesSaveButtonId);

       await expect(checkInLabel).toBeVisible();
       await expect(checkInInput).toBeVisible();
       await expect(checkOutLabel).toBeVisible();
       await expect(checkOutInput).toBeVisible();
       await expect(timesSaveButton).toBeVisible();

       await page.getByTestId(annualLeaveButtonId).click();


        await expect(checkInLabel).not.toBeVisible();
        await expect(checkInInput).not.toBeVisible();
        await expect(checkOutLabel).not.toBeVisible();
        await expect(checkOutInput).not.toBeVisible();
        await expect(timesSaveButton).not.toBeVisible();
    });


        test('hides check-in and check-out labels, inputs and save button when add business trip button was clicked', async ({ page }) => {
            await page.goto('/');
            await page.getByTestId(timeControllerAddButton).click();

            const checkInLabel = await page.getByTestId(checkInLabelId);
            const checkInInput = await page.getByTestId(checkInInputId);
            const checkOutLabel = await page.getByTestId(checkOutLabelId);
            const checkOutInput = await page.getByTestId(checkOutInputId);
            const timesSaveButton = await page.getByTestId(timesSaveButtonId);

            await expect(checkInLabel).toBeVisible();
            await expect(checkInInput).toBeVisible();
            await expect(checkOutLabel).toBeVisible();
            await expect(checkOutInput).toBeVisible();
            await expect(timesSaveButton).toBeVisible();

            await page.getByTestId(businessTripAddButtonId).click();

            await expect(checkInLabel).not.toBeVisible();
            await expect(checkInInput).not.toBeVisible();
            await expect(checkOutLabel).not.toBeVisible();
            await expect(checkOutInput).not.toBeVisible();
            await expect(timesSaveButton).not.toBeVisible();
        });

    test('display annual leave button', async ({ page }) => {
        await page.goto('/');

        const annualLeaveButton = await page.getByTestId(annualLeaveButtonId);

        await expect(annualLeaveButton).toBeVisible();
        expect(await annualLeaveButton.textContent()).toBe('Urlop');
    });

    test('display business trip add button', async ({ page }) => {
        await page.goto('/');

        const addButton = await page.getByTestId(businessTripAddButtonId);

        await expect(addButton).toBeVisible();
        expect(await addButton.textContent()).toBe('Wyjazd służbowy');
    });

    test('when no data was filled and annual leave button was clicked, should display error message', async ({ page }) => {
        await page.goto('/');
        await page.getByTestId(annualLeaveButtonId).click();

        const errorMessage = await page.getByTestId(errorMessagePopupId);
        await expect(errorMessage).toBeVisible();
        expect(await errorMessage.textContent()).toBe(selectDayErrorMessage);

        await page.waitForTimeout(2000);

        await expect(errorMessage).not.toBeVisible();
    });

    test('when no data was filled and business trip button was clicked, should display error message', async ({ page }) => {
        await page.goto('/');
        await page.getByTestId(businessTripAddButtonId).click();

        const errorMessage = await page.getByTestId(errorMessagePopupId);
        await expect(errorMessage).toBeVisible();
        expect(await errorMessage.textContent()).toBe(selectDayErrorMessage);

        await page.waitForTimeout(2000);

        await expect(errorMessage).not.toBeVisible();
    });

    test('when month, day, times was filled but no employee was selected and save button was clicked, should display error message', async ({ page }) => {
       await page.goto('/');
       await page.getByTestId(monthInputId).fill('2024-08');
       await page.getByTestId(daySelectId).selectOption({ index: 2 });

       await page.getByTestId(timeControllerAddButton).click();

       await page.getByTestId(checkInInputId).fill('08:00');
       await page.getByTestId(checkOutInputId).fill('16:00');

       await page.getByTestId(timesSaveButtonId).click();


        const errorMessage = await page.getByTestId(errorMessagePopupId);
        await expect(errorMessage).toBeVisible();
        expect(await errorMessage.textContent()).toBe(fillAllDataErrorMessage);

        await page.waitForTimeout(2000);

        await expect(errorMessage).not.toBeVisible();
    });

    test('when month and day was filled but no employee was selected and annual leave button was clicked, should display error message', async ({ page }) => {
       await page.goto('/');
       await page.getByTestId(monthInputId).fill('2024-08');
       await page.getByTestId(daySelectId).selectOption({ index: 2 });

       await page.getByTestId(annualLeaveButtonId).click();

        const errorMessage = await page.getByTestId(errorMessagePopupId);
        await expect(errorMessage).toBeVisible();
        expect(await errorMessage.textContent()).toBe(addEmployeeErrorMessage);

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
