import { test } from '@playwright/test';
import { checkoutPage } from '../pages/checkoutPage.ts';
import { addToCartPage } from '../pages/addToCartPage.ts';
import { LoginPage } from '../pages/loginPage.ts';

test('Checkout end to end process using POM', async ({ page }) => {

 // ---------- LOGIN ----------
  const login = new LoginPage(page);
  await login.navigateToLoginPage();
  await login.login('standard_user', 'secret_sauce');

  // ---------- ADD TO CART ----------
  const cart = new addToCartPage(page);
  await cart.addBackpackBtn();
  await cart.addBikeLightToCart();
  await cart.addJacketProduct();
  await cart.verifyCartIconVisible();
  await cart.openCart();
  await cart.verifyItemCount(3);

  // ---------- CHECKOUT ----------
  const checkout = new checkoutPage(page);
  await checkout.proceedToCheckout();
  await checkout.enterCheckoutInformation('John', 'Doe', '411001');
  await checkout.finishCheckout();
  await checkout.verifyOrderConfirmation('Thank you for your order!');

});
export { checkoutPage as CheckoutProcess };
