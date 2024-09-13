import {describe, expect, test} from "@playwright/test";

describe('HeaderUI', () => {
    test('has title', async ({ page }) => {
        await page.goto('/');

        await expect(page).toHaveTitle("Umbrella Time Manager");
    });

    test('display logo in header', async ({ page }) => {
        await page.goto('/');

        const header = page.$('header');
        await expect(header).not.toBeNull();
        await expect(page.getByTestId('header-logo')).toBeVisible();
    });
});
