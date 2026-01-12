import { Browser } from '@playwright/test';

export async function createSession(browser: Browser, url: string) {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(url);
  return { context, page };
}
//const admin = await createSession(browser, '/admin');
//const user = await createSession(browser, '/user');
//Multiple BrowserContexts go inside .spec.ts files under tests/
//Usage in Test
//“In Playwright, BrowserContexts model real users.
//Since test cases define user interactions, 
// multiple contexts must be created at the test level, not inside page objects.
//This allows clean session isolation and supports role-based and SSO scenarios.”
//✅ One BrowserContext = One User
//✅ Pages are attached to contexts
//✅ POMs remain reusable and clean