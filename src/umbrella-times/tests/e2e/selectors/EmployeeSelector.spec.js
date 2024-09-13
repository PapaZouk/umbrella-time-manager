import {expect, test} from "@playwright/test";

test.describe('EmployeeSelector', () => {
    test('display employee label', async ({ page }) => {
        await page.goto('/');
        const employeeLabel = await page.getByTestId('employee-selector-label');
        expect(await employeeLabel.textContent()).toBe('Wybierz pracownika');
    });

    test('should display and fill employee select correctly', async ({ page }) => {
        await page.goto('/');

        const employeeSelect = await page.locator('select[data-testid="employee-selector-select"]');
        expect(employeeSelect).toBeEnabled();

        await employeeSelect.selectOption({ index: 2 });

        const selectedEmployee = await employeeSelect.inputValue();
        expect(selectedEmployee).toBeDefined();
    });
});
