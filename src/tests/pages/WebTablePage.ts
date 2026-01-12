import { Page, Locator, expect } from '@playwright/test';
//2. Page Object for Fixed Header Table
export class WebTablePage {
  readonly page: Page;
  readonly table: Locator;
  readonly rows: Locator;
  readonly totalAmountLabel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.table = page.locator('.tableFixHead table');
    this.rows = this.table.locator('tbody tr');
    this.totalAmountLabel = page.locator('.totalAmount');
  }

  /* ---------- Row / Column Utilities ---------- */

  async getRowCount(): Promise<number> {
    return await this.rows.count();
  }

  async getCellValue(rowIndex: number, colIndex: number): Promise<string> {
    return await this.rows
      .nth(rowIndex)
      .locator('td')
      .nth(colIndex)
      .innerText();
  }

  /* ---------- Business-Level Actions ---------- */

  async getAmountSum(): Promise<number> {
    let sum = 0;
    const rowCount = await this.getRowCount();

    for (let i = 0; i < rowCount; i++) {
      const amountText = await this.getCellValue(i, 3);
      sum += Number(amountText);
    }
    return sum;
  }

  async getDisplayedTotal(): Promise<number> {
    const text = await this.totalAmountLabel.innerText();
    return Number(text.split(':')[1].trim());
  }

  async validateTotalAmount() {
    const calculated = await this.getAmountSum();
    const displayed = await this.getDisplayedTotal();
    expect(calculated).toBe(displayed);
  }
}
