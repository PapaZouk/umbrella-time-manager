import {test, expect} from "@playwright/test";


test.describe('TimeSelector', () => {
    const checkInInputId = 'time-selector-check-in-input';
    const checkOutInputId = 'time-selector-check-out-input';
    const annualLeaveButtonId = 'time-selector-annual-leave-button';
    const monthInputId = 'month-selector-input';
    const daySelectId = 'day-selector-select';
    const employeeSelectId = 'employee-selector-select';
    const selectorAddButtonId = 'time-selector-add-button';
    const errorMessagePopupId = 'error-message-popup';

    const fillAllDataErrorMessage = 'Uzupełnij wszystkie dane';
    const selectDayErrorMessage = 'Wybierz dzień aby dodać godziny pracy.';
    const noEmployeeSelectedErrorMessage = 'Wybierz pracownika';

   test('when no data was filled and add button was clicked, should display error message', async ({ page }) => {
      await page.goto('/');
      await page.getByTestId(selectorAddButtonId).click();

      const errorMessage = await page.getByTestId(errorMessagePopupId);
      await expect(errorMessage).toBeVisible();
      expect(await errorMessage.textContent()).toBe(fillAllDataErrorMessage);

      await page.waitForTimeout(2000);

      await expect(errorMessage).not.toBeVisible();
   });

   test('when no data was filled and annual leave button was clicked, should display error message', async ({ page }) => {
      await page.goto('/');
      await page.getByTestId(annualLeaveButtonId).click();

      const errorMessage = await page.getByTestId(errorMessagePopupId);
      await expect(errorMessage).toBeVisible();
      expect(await errorMessage.textContent()).toBe(selectDayErrorMessage)

      await page.waitForTimeout(2000);

      await expect(errorMessage).not.toBeVisible();
   });

   test('when only check-in time is provided and add button was clicked, should display error message', async ({ page }) => {
      await page.goto('/');

      const checkInInput = await page.getByTestId(checkInInputId);
      await checkInInput.fill('08:00');

      await page.getByTestId(selectorAddButtonId).click();

      const errorMessage = await page.getByTestId(errorMessagePopupId);
      await expect(errorMessage).toBeVisible();
      expect(await errorMessage.textContent()).toBe(fillAllDataErrorMessage);

      await page.waitForTimeout(2000);
      await expect(errorMessage).not.toBeVisible();
   });

   test('when only check-out time is provided and add button was clicked, should display error message', async ({ page }) => {
      await page.goto('/');

      const checkInInput = await page.getByTestId(checkOutInputId);
      await checkInInput.fill('15:00');

      await page.getByTestId(selectorAddButtonId).click();

      const errorMessage = await page.getByTestId(errorMessagePopupId);
      await expect(errorMessage).toBeVisible();
      expect(await errorMessage.textContent()).toBe(fillAllDataErrorMessage);

      await page.waitForTimeout(2000);
      await expect(errorMessage).not.toBeVisible();
   });

   test('when both check-in and check-out time is provided but no other data, should display error message', async ({ page }) => {
      await page.goto('/');

      await page.getByTestId(checkInInputId).fill('08:20');
      await page.getByTestId(checkOutInputId).fill('15:55');
      await page.getByTestId(selectorAddButtonId).click();

      const errorMessage = await page.getByTestId(errorMessagePopupId);
      await expect(errorMessage).toBeVisible();
      expect(await errorMessage.textContent()).toBe(fillAllDataErrorMessage);

      await page.waitForTimeout(2000);
      await expect(errorMessage).not.toBeVisible();
   });

   test('when month, day, check-in, checkOut are selected but not employee, should display error message', async ({ page }) => {
      await page.goto('/');

      await page.getByTestId(monthInputId).fill('2024-08');
      await page.getByTestId(daySelectId).selectOption('2');
      await page.getByTestId(checkInInputId).fill('09:00');
      await page.getByTestId(checkOutInputId).fill('16:20');

      await page.getByTestId(selectorAddButtonId).click();

      const errorMessage = await page.getByTestId(errorMessagePopupId);
      await expect(errorMessage).toBeVisible();
      expect(await errorMessage.textContent()).toBe(fillAllDataErrorMessage);

      await page.waitForTimeout(2000);
      await expect(errorMessage).not.toBeVisible();
   });

   test('when month, day and employee are selected, but not check-in and check-out, should display error message', async ({ page }) => {
      await page.goto('/');

      await page.getByTestId(monthInputId).fill('2024-08');
      await page.getByTestId(daySelectId).selectOption('1');
      await page.getByTestId(employeeSelectId).selectOption({ index: 1 });

      await page.getByTestId(selectorAddButtonId).click();

      const errorMessage = await page.getByTestId(errorMessagePopupId);
      await expect(errorMessage).toBeVisible();
      expect(await errorMessage.textContent()).toBe(fillAllDataErrorMessage);

      await page.waitForTimeout(2000);
      await expect(errorMessage).not.toBeVisible();
   });

   test('when month, day, employee and check-in are selected, but not check-out, should display error message', async ({ page }) => {
      await page.goto('/');

      await page.getByTestId(monthInputId).fill('2024-08');
      await page.getByTestId(daySelectId).selectOption('5');
      await page.getByTestId(employeeSelectId).selectOption({ index: 2 });
      await page.getByTestId(checkInInputId).fill('07:55');

      await page.getByTestId(selectorAddButtonId).click();

      const errorMessage = await page.getByTestId(errorMessagePopupId);
      await expect(errorMessage).toBeVisible();
      expect(await errorMessage.textContent()).toBe(fillAllDataErrorMessage);

      await page.waitForTimeout(2000);
      await expect(errorMessage).not.toBeVisible();
   });

   test('when month, day, employee and check-out are selected, but not check-in, should display error message', async ({ page }) => {
      await page.goto('/');

      await page.getByTestId(monthInputId).fill('2024-08');
      await page.getByTestId(daySelectId).selectOption('5');
      await page.getByTestId(employeeSelectId).selectOption({ index: 1 });
      await page.getByTestId(checkOutInputId).fill('16:25');

      await page.getByTestId(selectorAddButtonId).click();

      const errorMessage = await page.getByTestId(errorMessagePopupId);
      await expect(errorMessage).toBeVisible();
      expect(await errorMessage.textContent()).toBe(fillAllDataErrorMessage);

      await page.waitForTimeout(2000);
      await expect(errorMessage).not.toBeVisible();
   });

   test('when month selected but no other data, clicking annual leave button should display error message', async ({ page }) => {
      await page.goto('/');
      await page.getByTestId(monthInputId).fill('2024-05');
      await page.getByTestId(annualLeaveButtonId).click();

      const errorMessage = await page.getByTestId(errorMessagePopupId);
      await expect(errorMessage).toBeVisible();
      expect(await errorMessage.textContent()).toBe(selectDayErrorMessage);

      await page.waitForTimeout(2000);
      await expect(errorMessage).not.toBeVisible();
   });

   test('when month and day selected, but not employee, clicking annual leave button should display error message', async ({ page }) => {
      await page.goto('/');
      await page.getByTestId(monthInputId).fill('2024-09');
      await page.getByTestId(daySelectId).selectOption('2');

      await page.getByTestId(annualLeaveButtonId).click();

      const errorMessage = await page.getByTestId(errorMessagePopupId);
      await expect(errorMessage).toBeVisible();
      expect(await errorMessage.textContent()).toBe(noEmployeeSelectedErrorMessage);

      await page.waitForTimeout(2000);
      await expect(errorMessage).not.toBeVisible();
   });
});
