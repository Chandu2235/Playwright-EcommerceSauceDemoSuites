import { test, expect } from '@playwright/test';
import { AutomationPracticePage } from '../pages/AutomationPracticePage';
//2. Test – Multiple Windows + Dropdown Dependency
test('Dropdown driven table validation across multiple windows', async ({ browser }) => {

  // ---------- USER SESSION ----------
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

  const practicePage = new AutomationPracticePage(page);

  // ---------- STEP 1: Select City ----------
  const selectedCity = 'Chennai';
  await practicePage.selectCity(selectedCity);

  // ---------- STEP 2: Open New Window ----------
  const childPage = await practicePage.openNewWindow(context);

  const childPracticePage = new AutomationPracticePage(childPage);

  // ---------- STEP 3: Table Dependency ----------
  const sumForCity =
    await childPracticePage.getAmountSumForCity(selectedCity);

  console.log(`Total Amount for ${selectedCity}:`, sumForCity);

  // Logical assertion (example)
  expect(sumForCity).toBeGreaterThan(0);

  await context.close();
});

/*
3. Why This Design Is Correct (Important)
Separation of Concerns
Test → defines user journey and data dependency
Page Object → encapsulates UI structure and extraction logic
BrowserContext → models user session
Page → models window/tab

“I store dropdown-selected values in the test layer and reuse them in a child window to drive table validations.
The new window is captured via BrowserContext.waitForEvent('page'), and the same Page Object is reused to read a fixed-header table.
This ensures session consistency, avoids duplication, and enables data-driven assertions.”

5. What You Now Fully Know (Skill Check)
You can now confidently handle:
Multi-window Playwright automation
BrowserContext session modeling
Fixed header web tables
Dropdown → table dependency
Enterprise-grade POM design
*/
