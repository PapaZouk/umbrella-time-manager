import {expect, test} from "@playwright/test";
import loginAsUser from "../helpers/AuthenticationHelper";

test.describe('EmployeeSelector', () => {
    test.beforeEach( async ({ page }) => {
        await page.goto('/');

        await loginAsUser(page, {username: "User", password: "password"});
    });

    test('display employee label', async ({ page }) => {
        const employeeLabel = await page.getByTestId('employee-selector-label');
        expect(await employeeLabel.textContent()).toBe('Wybierz pracownika');
    });

    test('should display and fill employee select correctly', async ({ page }) => {
        const employeeSelect = await page.locator('select[data-testid="employee-selector-select"]');
        expect(employeeSelect).toBeEnabled();

        await employeeSelect.selectOption({ index: 2 });

        const selectedEmployee = await employeeSelect.inputValue();
        expect(selectedEmployee).toBeDefined();
    });
});
