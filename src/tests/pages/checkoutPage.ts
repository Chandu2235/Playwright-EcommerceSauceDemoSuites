import { Page, Locator, expect } from '@playwright/test';

export class checkoutPage 
{
  private page: Page;

  private checkoutButton: Locator;
  private firstNameInput: Locator;
  private lastNameInput: Locator;
  private postalCodeInput: Locator;
  private continueBtn: Locator;
  private finishBtn: Locator;
  private orderConfirmationText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.postalCodeInput = page.locator('#postal-code');
    this.continueBtn = page.locator('//input[@data-test="continue"]');
    this.finishBtn = page.locator('//button[@data-test="finish"]');
    this.orderConfirmationText = page.locator('.complete-header');
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
    await this.page.waitForURL('**/checkout-step-one.html');
  }

  async enterCheckoutInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {    
    await expect(this.page).toHaveURL(/checkout-step-one/);

    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueBtn.click();
  }     
  
  async finishCheckout(): Promise<void> {     
    await expect(this.finishBtn).toBeVisible({ timeout: 5000 });
    await this.finishBtn.click();
  }                 
  
  async verifyOrderConfirmation(expectedText: string): Promise<void> {                
    await expect(this.orderConfirmationText).toHaveText(expectedText, { timeout: 5000 });
}       

}