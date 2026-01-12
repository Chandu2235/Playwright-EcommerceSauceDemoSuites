import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { AdminDashboardPage } from '../pages/AdminDashboardPage';
import { UserDashboardPage } from '../pages/UserDashboardPage';

test('Admin and User login in parallel sessions', async ({ browser }) => {

  // ---------- SESSION 1 : Admin ----------
  const adminContext = await browser.newContext();
  const adminPage = await adminContext.newPage();

  const adminLogin = new LoginPage(adminPage);
  await adminLogin.login('adminUser', 'adminPass');

  const adminDashboard = new AdminDashboardPage(adminPage);
  await adminDashboard.verifyAdminAccess();

  // ---------- SESSION 2 : Normal User ----------
  const userContext = await browser.newContext();
  const userPage = await userContext.newPage();

  const userLogin = new LoginPage(userPage);
  await userLogin.login('normalUser', 'userPass');

  const userDashboard = new UserDashboardPage(userPage);
  await userDashboard.verifyUserAccess();

  await adminContext.close();
  await userContext.close();
});

/*
5. Handling Multiple Sessions (Parallel BrowserContexts)
Why This Matters
Simulates multiple users
Required for SSO, role-based testing, multi-login
Handling Multiple Windows / Tabs (Key Concept)
Strategy
BrowserContext → session isolation
context.waitForEvent('page') → capture new tab/window
Each window has its own Page object
Same POM can be reused across windows
*/

/*
You add “Multiple BrowserContexts (parallel sessions)” ONLY in the test layer, never in:
Page Object classes
Utility classes
Playwright config
BrowserContexts represent users, and users belong to test scenarios, not page objects.
*/

//Multiple BrowserContexts go inside .spec.ts files under tests/
/*-------- Web Table Handling --------

    async getRowCount(): Promise<number> {
        return await this.tableRows.count();
    } 

    async getCellValue(rowIndex: number, colIndex: number): Promise<string> {       
    return await this.tableRows
      .nth(rowIndex)
      .locator('td')
      .nth(colIndex)
      .innerText();
    }
    async validateCellContains(             
    rowIndex: number,
    colIndex: number,
    expected: string            
    ) {
    const actual = await this.getCellValue(rowIndex, colIndex);
    expect(actual).toContain(expected);
    }
    
    -------- Dropdown Handling -------- 
    async selectCountry(country: string) {          
    await this.countryDropdown.selectOption({ label: country });
    }
    async getSelectedCountry(): Promise<string> {
    return await this.countryDropdown.inputValue();
    }
*/

/*
Why NOT in Page Objects?
❌ Wrong (Common Mistake)
export class LoginPage {
  constructor(browser) {
    this.context = await browser.newContext(); // ❌ WRONG
  }
}
Why this is bad:
Page Objects should not create users
Breaks test control
Impossible to coordinate multiple users
Fails in parallel execution
*/

/*
I see you’re asking about the role of Promises during framework initialization in the context of your async getCellValue(...) method.

Let’s break it down.

1. What Your Code Does
Ts

Copy code
async getCellValue(rowIndex: number, colIndex: number): Promise<string> {
  return await this.tableRows
    .nth(rowIndex)
    .locator('td')
    .nth(colIndex)
    .innerText();
}
async: Marks the function as asynchronous, meaning it always returns a Promise.
await: Pauses execution inside the function until the Promise returned by .innerText() resolves.
.innerText(): In Playwright (or similar frameworks), this is an asynchronous DOM query that returns a Promise<string>.
2. Role of Promises in Framework Initialization
When a test automation framework (like Playwright, Protractor, Cypress, etc.) starts:

Environment Setup

The framework initializes browser contexts, pages, and locators.
Many of these operations are asynchronous (network calls, browser process startup, DOM readiness).
Promises are used to defer execution until these steps complete.
Command Scheduling

Frameworks queue actions (clicks, text retrieval, navigation) as Promise-returning tasks.
Your getCellValue method fits into this queue — it won’t run until the framework is ready.
Synchronization

Promises ensure that test steps run in the correct order.
Without Promises, your code could try to read a cell before the table is rendered.
3. Why Promises Are Critical Here
Non-blocking: The framework can start multiple async operations without freezing the main thread.
Deterministic flow: await ensures that each step completes before moving to the next.
Error handling: If .innerText() fails (e.g., element not found), the Promise rejects, and you can catch the error.
4. Example in Context
Ts

Copy code
// Framework initialization
await page.goto('https://example.com/table');

// Using your method
const cellValue = await getCellValue(2, 3);
console.log('Cell value:', cellValue);
Here:

page.goto() returns a Promise that resolves when navigation finishes.
getCellValue() returns a Promise that resolves when the cell text is retrieved.
The framework ensures both happen in sequence.
✅ Summary:
During framework initialization, Promises act as the control mechanism that ensures all asynchronous setup tasks (browser launch, page load, element readiness) finish before your test code runs. In your method, the Promise returned by .innerText() is part of that chain, guaranteeing you get the correct cell value only after the DOM is ready.

If you want, I can rewrite your method to make it more robust with error handling and timeout safety so it’s safer during initialization.
Do you want me to do that?

*/