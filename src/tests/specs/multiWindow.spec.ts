import { test, BrowserContext, Page } from '@playwright/test';
import { PageDataHandle } from '../pages/PageDataHandle';

test('BrowserContext-based multiple window data handling', async ({ browser }) => {
  
  /* -------- Create Browser Context -------- */
  const context: BrowserContext = await browser.newContext();
  const page: Page = await context.newPage();

  await page.goto('https://www.saucedemo.com/multi-window-test'); // Example URL

  const mainPageData = new PageDataHandle(page);

  /* -------- Web Table Validation in Main Page -------- */
  const rowCount = await mainPageData.getRowCount();

  for (let i = 0; i < rowCount; i++) {
    const cellValue = await mainPageData.getCellValue(i, 1);
    console.log(`Row ${i} Column 1 Value: ${cellValue}`);
  }

  /* -------- Open New Window -------- */
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.click('#openNewWindow') // button/link that opens new tab
  ]);

  await newPage.waitForLoadState();

  const childPageData = new PageDataHandle(newPage);

  /* -------- Dropdown Handling in New Window -------- */
  await childPageData.selectCountry('India');
  const selected = await childPageData.getSelectedCountry();
  console.log('Selected country:', selected);

  /* -------- Web Table Validation in Child Window -------- */
  await childPageData.validateCellContains(0, 2, 'Active');

  await context.close();
});

/*
6. Enterprise Best Practices (Very Important)
DO
Keep locators in constructor
Keep actions in methods
Keep assertions separate
Use BrowserContext for isolation
Reuse same POM across windows

“In Playwright, each BrowserContext represents an isolated user session.
Each tab or window is a Page object inside that context.
For multi-window automation, we wait for the page event on the context, then attach a Page Object Model to the newly opened window.
Web tables are handled via row-column locators, and dropdowns via selectOption.”
*/