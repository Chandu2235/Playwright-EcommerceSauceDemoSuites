import { Page, Locator, expect, BrowserContext } from '@playwright/test';

interface SelectCityOption {
  label: string;
}

interface PageLocators {
  page: Page;
  cityDropdown: Locator;
  openWindowBtn: Locator;
  tableRows: Locator;
}

//1. Page Object – Dropdown + Table (Reusable)
export class AutomationPracticePage {
  private page: Page;
  private cityDropdown: Locator;
  private openWindowBtn: Locator;
  private tableRows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cityDropdown = page.locator('#dropdown-class-example');
    this.openWindowBtn = page.locator('#openwindow');
    this.tableRows = page.locator('.tableFixHead tbody tr');
  }

  async selectCity(city: string): Promise<void> {
    await this.cityDropdown.selectOption({ label: city });
  }

  async openNewWindow(context: BrowserContext): Promise<Page> {
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      this.openWindowBtn.click()
    ]);
    return newPage;
  }

  async getAmountSumForCity(city: string): Promise<number> {
    let sum: number = 0;
    const rowCount: number = await this.tableRows.count();

    for (let i: number = 0; i < rowCount; i++) {
      const cityText: string = await this.tableRows
        .nth(i)
        .locator('td')
        .nth(2)
        .innerText();

      if (cityText === city) {
        const amount: string = await this.tableRows
          .nth(i)
          .locator('td')
          .nth(3)
          .innerText();

        sum += Number(amount);
      }
    }
    return sum;
  }
}