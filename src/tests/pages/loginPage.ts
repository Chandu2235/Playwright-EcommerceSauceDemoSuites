import { Page,expect } from '@playwright/test';

export class LoginPage 
{

readonly page: Page;
readonly usernameInput = '#username';
readonly passwordInput = '#password';
readonly loginButton = '#loginButton';

constructor(page: Page) 
{
    this.page = page;   
}

async navigateToLoginPage() 
{
    await this.page.goto('https://www.saucedemo.com/');
    //Maximize the browser window
    await this.page.setViewportSize({ width: 1920, height: 1080 });
    // await this.login(username, password);
}

async login(username: string, password: string) 
{
    // Fill in username.
    await this.page.getByPlaceholder('Username').fill(username);
    // Fill in password.
    await this.page.getByPlaceholder('Password').fill(password);

    // Click the login button after it becomes visible.
    const loginBtn = this.page.locator('#login-button');
    await expect(loginBtn).toBeVisible({ timeout: 5000 });
    await loginBtn.click();
}
}
