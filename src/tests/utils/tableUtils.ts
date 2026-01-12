/**
 * Table Utilities for E-commerce Test Automation
 * Compatible with Playwright/Cypress frameworks
 */

export class TableUtils {
    /**
     * Get all rows from a table
     */
    static async getTableRows(page: any, tableSelector: string): Promise<any[]> {
        return await page.locator(`${tableSelector} tbody tr`).all();
    }

    /**
     * Get cell value by row and column index
     */
    static async getCellValue(
        page: any,
        tableSelector: string,
        rowIndex: number,
        colIndex: number
    ): Promise<string> {
        const cell = await page.locator(
            `${tableSelector} tbody tr:nth-child(${rowIndex + 1}) td:nth-child(${colIndex + 1})`
        );
        return await cell.textContent();
    }

    /**
     * Get row data as object
     */
    static async getRowData(
        page: any,
        tableSelector: string,
        rowIndex: number
    ): Promise<Record<string, string>> {
        const cells = await page.locator(`${tableSelector} tbody tr:nth-child(${rowIndex + 1}) td`).allTextContents();
        return cells.reduce((obj, cell, idx) => {
            obj[`col_${idx}`] = cell.trim();
            return obj;
        }, {} as Record<string, string>);
    }

    /**
     * Find row by cell value
     */
    static async findRowByCellValue(
        page: any,
        tableSelector: string,
        value: string
    ): Promise<number> {
        const rows = await this.getTableRows(page, tableSelector);
        for (let i = 0; i < rows.length; i++) {
            const text = await rows[i].textContent();
            if (text?.includes(value)) {
                return i;
            }
        }
        return -1;
    }

    /**
     * Click on a table cell
     */
    static async clickCell(
        page: any,
        tableSelector: string,
        rowIndex: number,
        colIndex: number
    ): Promise<void> {
        await page.locator(
            `${tableSelector} tbody tr:nth-child(${rowIndex + 1}) td:nth-child(${colIndex + 1})`
        ).click();
    }
}