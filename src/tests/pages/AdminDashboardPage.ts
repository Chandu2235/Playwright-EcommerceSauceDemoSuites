import { Page, expect } from '@playwright/test';

export class AdminDashboardPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async verifyAdminAccess() {
    await expect(this.page.locator('#admin-dashboard')).toBeVisible();
  }
}
