import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.ts';

test('User should be able to login with valid credentials', async ({ page }) => {
const loginPage = new LoginPage(page);

// Navigate to login page
await loginPage.navigateToLoginPage();

// Perform login action
await loginPage.login('standard_user', 'secret_sauce');

// Validate if login was successful
await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

export { LoginPage as LoggedInfo };

