import { Page, Locator, expect } from '@playwright/test';

export class addToCartPage 
{
  private page: Page;

  private addBackpackBtnLocator: Locator;
  private addBikeLightToCartLocator: Locator;
  private addJacketProductLocator: Locator;
  private cartIcon: Locator;
  private cartItems: Locator;

  constructor(page: Page) {
    this.page = page;

    this.addBackpackBtnLocator = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.addBikeLightToCartLocator = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
    this.addJacketProductLocator = page.locator('//button[@data-test="add-to-cart-sauce-labs-fleece-jacket"]');
    
    this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
    this.cartItems = page.locator('.cart_item');

  }

  async addBackpackBtn(): Promise<void> {
    await expect(this.addBackpackBtnLocator).toBeVisible({ timeout: 5000 });
    await this.addBackpackBtnLocator.click();
  }

   async addBikeLightToCart(): Promise<void> {
    await expect(this.addBikeLightToCartLocator).toBeVisible({ timeout: 5000 });
    await this.addBikeLightToCartLocator.click();
  }

   async addJacketProduct(): Promise<void> {
    await expect(this.addJacketProductLocator).toBeVisible({ timeout: 5000 });
    await this.addJacketProductLocator.click();
  }

  async verifyCartIconVisible(): Promise<void> {
    await expect(this.cartIcon).toBeVisible({ timeout: 5000 });
  }

  async verifyItemCount(expectedCount: number): Promise<void> {
    await expect(this.cartItems).toHaveCount(expectedCount);
  }

  async openCart(): Promise<void> {
    await this.cartIcon.click();
    await this.page.waitForURL(/cart.html/);
  }
}