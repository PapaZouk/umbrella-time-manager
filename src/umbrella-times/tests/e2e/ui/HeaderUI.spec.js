import {describe, expect, test} from "@playwright/test";
import loginAsUser from "../helpers/AuthenticationHelper";

describe('HeaderUI', () => {
    test.beforeEach( async ({ page }) => {
        await page.goto('/');

        await loginAsUser(page, {username: "User", password: "password"});
    });

    test('has title', async ({ page }) => {
        await expect(page).toHaveTitle("Umbrella Time Manager");
    });

    test('display logo in header', async ({ page }) => {
        const header = page.$('header');
        await expect(header).not.toBeNull();
        await expect(page.getByTestId('header-logo')).toBeVisible();
    });
});
