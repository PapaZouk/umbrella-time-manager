export default async function loginAsUser(page, { username, password }) {
    await page.fill('input[data-testid="login-input"]', username);

    await page.fill('input[data-testid="password-input"]', password);

    await page.click('button[data-testid="auth-submit-button"]');

    await page.waitForSelector('h3[data-testid="welcome-message"]');
}
