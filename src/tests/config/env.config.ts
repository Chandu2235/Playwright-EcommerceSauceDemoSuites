// env.config.ts
// Environment configuration for Ecommerce Sauce Demo Suites

interface EnvConfig {
    baseUrl: string;
    apiEndpoint: string;
    timeout: number;
}

const config: EnvConfig = {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    apiEndpoint: process.env.API_ENDPOINT || '/api/v1',
    timeout: parseInt(process.env.TIMEOUT || '5000', 10),
};

export default config;
/*
Here are the one-line differences, precisely and clearly:
env.config.ts → Centralized place to define environment-specific values
 (URLs, credentials, timeouts, feature flags).
playwright.config.ts → Controls Playwright test execution behavior 
(browsers, reporters, retries, parallelism, baseURL).
tsconfig.json → Defines TypeScript compiler rules 
(target JS version, module system, path aliases, strictness).

In one sentence:
env.config.ts manages what your tests use, 
playwright.config.ts manages how tests run, and 
tsconfig.json manages how TypeScript compiles.
*/

/*
practicing (BrowserContext, multi-window, web tables, dropdowns, role-based flows). Each is summarized in one short line, as requested.

Best Websites to Replicate Your Complete Scenario

1. Sauce Demo
URL: https://www.saucedemo.com

→ Login roles, product tables, cart flow, session handling (ideal for end-to-end + context isolation).

2. Automation Practice (Rahul Shetty)
URL: https://rahulshettyacademy.com/AutomationPractice

→ Web tables, dropdowns, alerts, multiple windows, frames (perfect for UI mechanics).

3. Test Automation Playground
URL: https://testautomationpractice.blogspot.com

→ Tables, dropdowns, popups, date pickers, buttons (great for locator + data extraction).

4. OrangeHRM Demo
URL: https://opensource-demo.orangehrmlive.com

→ Role-based login (Admin/User), dashboards, tables (excellent for multi-context users).

5. The Internet (Herokuapp)
URL: https://the-internet.herokuapp.com

→ Multiple windows, dropdowns, tables, auth, alerts (classic interview favorite).

My Recommendation (Based on Your Current Flow)

If your goal is to replicate everything in one short, controlled setup:

Primary:
➡ Rahul Shetty Automation Practice (UI mechanics + tables + windows)

Secondary (Realistic App):
➡ Sauce Demo (real e-commerce + sessions + role simulation)

How This Maps to What You’re Learning
Concept	Website
BrowserContext (multi users)	Sauce Demo / OrangeHRM
Multiple windows	Herokuapp / Rahul Shetty
Web tables	Rahul Shetty / Blogspot
Dropdowns	All above
Interview-ready practice	Herokuapp

*/