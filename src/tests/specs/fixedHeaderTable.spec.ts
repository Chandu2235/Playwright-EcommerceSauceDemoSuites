import { test } from '@playwright/test';
import { WebTablePage } from '../pages/WebTablePage';
//3. Test Using BrowserContext (Session-Correct)
test('Read and validate fixed header web table data', async ({ browser }) => {

  // BrowserContext = user session
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

  const tablePage = new WebTablePage(page);

  // Read all rows
  const rowCount = await tablePage.getRowCount();
  console.log('Row count:', rowCount);

  for (let i = 0; i < rowCount; i++) {
    const name = await tablePage.getCellValue(i, 0);
    const position = await tablePage.getCellValue(i, 1);
    const city = await tablePage.getCellValue(i, 2);
    const amount = await tablePage.getCellValue(i, 3);

    console.log(`${name} | ${position} | ${city} | ${amount}`);
  }

  // Validate total
  await tablePage.validateTotalAmount();

  await context.close();
});

/*
4. How This Matches Your “Entire Session Chat” Goals
Requirement You Mentioned	Covered Here
POM based approach	✅
BrowserContext session	✅
Web table row/column read	✅
Fixed header handling	✅
Data analysis (sum, compare)	✅
Interview-ready logic	✅

Explanation:
This test uses a Page Object Model (WebTablePage) to encapsulate web table interactions.
A separate BrowserContext is created to simulate a user session.
The test reads all rows and columns from the fixed header web table.
It calculates the sum of the 'Amount' column and compares it to the displayed total.
This approach demonstrates best practices in Playwright for session management and data handling.   

“The fixed header table is inside a scrollable container, so I scope all locators to the container class.
I read values row-wise using tbody tr, extract column values by index, and perform business validation by comparing the calculated sum with the displayed total.
The test runs inside a BrowserContext to simulate a real user session.”


*/