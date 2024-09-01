import {test, expect, describe} from '@playwright/test';

describe('Selectors', () => {
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

  test('display label day', async ({ page }) => {
    await page.goto('/');
    const daySelectorLabel = await page.getByTestId('day-selector-input');
    expect(await daySelectorLabel.textContent()).toBe('Wybierz dzień:');
  });

  test('when set up month, should display month days in selector', async  ({ page }) => {
    await page.goto('/');

    await page.locator('input[data-testid="month-selector-input"]').fill("2024-08");

    const select = await page.locator('select[data-testid="day-selector-select"]');
    const optionCount = await select.locator('option').count();
    const dayCount = optionCount - 1;

    expect(dayCount).toBeGreaterThan(0);
  });

  test('should fill day selector correctly', async ({ page }) => {
    await page.goto('/');
    await page.locator('input[data-testid="month-selector-input"]').fill('2024-08');

    const daySelect = page.locator('select[data-testid="day-selector-select"]');
    expect(daySelect).toBeEnabled();

    await daySelect.selectOption('2');

    const selectedOption = await daySelect.inputValue();
    expect(selectedOption).toBe('2');
  });

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
