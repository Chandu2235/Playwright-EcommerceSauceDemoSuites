import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.ts';
import { addToCartPage } from '../pages/addToCartPage.ts';

test('Add product to cart using POM', async ({ page }) => {

    //calling the login test steps to perform login before adding items to cart
    const login = new LoginPage(page);
    await login.navigateToLoginPage();
    await login.login('standard_user', 'secret_sauce');

    //Maximize the browser window
    await page.setViewportSize({ width: 1920, height: 1080 });

    const inventoryPage = new addToCartPage(page);
    await inventoryPage.addBackpackBtn();
    await inventoryPage.addBikeLightToCart();
    await inventoryPage.addJacketProduct();
    await inventoryPage.verifyCartIconVisible();

    await page.click('[data-test="shopping-cart-link"]');
    await inventoryPage.verifyItemCount(3);
});
export { addToCartPage as AddedToCartItems };