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

/*
// tests/login.spec.ts
import { test, expect } from '../fixtures/test.fixtures';

test('login using injected service', async ({ authService, page }) => {
  await authService.login('user', 'pass');
  await expect(page).toHaveURL('/dashboard');
});
Now:

async function loginUser(authService: AuthService) {
  await authService.login('user', 'pass');
}

1. S — Single Responsibility Principle (SRP)

A class should have one reason to change.

In test automation:

Each class should do one thing:

A Page Object → interacts with UI

A Test → verifies behavior

A Service/Client → talks to APIs

A Data builder → prepares test data

❌ Bad

class LoginTest {
    void testLogin() {
        driver.findElement(...); // UI logic
        assertTrue(isUserInDB()); // DB logic
    }
}


✅ Good

class LoginPage {
    void login(String user, String pass) { ... }
}

class LoginTest {
    void testLogin() {
        loginPage.login(user, pass);
        assertTrue(userService.isLoggedIn(user));
    }
}


Why it matters:
When the UI changes, you update one place, not 50 tests.

2. O — Open/Closed Principle (OCP)

Open for extension, closed for modification.

In test automation:

You should be able to add new behavior without rewriting existing code.

❌ Bad

if (browser.equals("chrome")) { ... }
else if (browser.equals("firefox")) { ... }


✅ Good

interface BrowserDriver {
    WebDriver create();
}

class ChromeDriverFactory implements BrowserDriver { ... }
class FirefoxDriverFactory implements BrowserDriver { ... }


Now adding Edge doesn’t break existing tests.

3. L — Liskov Substitution Principle (LSP)

Subclasses should be usable wherever the parent class is expected.

In test automation:

Mocks, stubs, and real implementations should behave the same from the test’s perspective.

❌ Bad

class FakePaymentService extends PaymentService {
    void pay() {
        throw new UnsupportedOperationException();
    }
}


✅ Good

class FakePaymentService implements PaymentService {
    void pay() {
        // simulate successful payment
    }
}


Rule of thumb:
If replacing a real service with a fake breaks the test logic → LSP is violated.

4. I — Interface Segregation Principle (ISP)

Many small interfaces are better than one big one.

In test automation:

Don’t force tests or pages to implement methods they don’t use.

❌ Bad

interface PageActions {
    void click();
    void type();
    void uploadFile();
    void downloadFile();
}


✅ Good

interface Clickable { void click(); }
interface Typable { void type(String text); }


This keeps page objects lean and readable.

5. D — Dependency Inversion Principle (DIP)

Depend on abstractions, not concrete implementations.

In test automation:

Tests should not care how things are done—only what is done.

❌ Bad

LoginTest() {
    this.loginPage = new LoginPage(new ChromeDriver());
}


✅ Good

LoginTest(WebDriver driver) {
    this.loginPage = new LoginPage(driver);
}


Now:

Run tests in parallel
Switch browsers
Use remote drivers
Mock dependencies easily

How SOLID helps test automation in real life

✔ Easier maintenance when UI changes
✔ Faster debugging
✔ Cleaner Page Objects
✔ Easier scaling (more tests, more platforms)
✔ Less flaky tests

Swap authService with API or Fake

No test code changes

Perfect for parallel + CI

Solid principles uses  - less flaky test , maintainanace reduce.

single responsibility +  
open/closed +
liskov substitutions +
interface segregation principle +  
dependency inversion
*/

