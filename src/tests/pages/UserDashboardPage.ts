import { Page, expect } from '@playwright/test';

export class UserDashboardPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async verifyUserAccess() {
    await expect(this.page.locator('#user-dashboard')).toBeVisible();
  }
}
