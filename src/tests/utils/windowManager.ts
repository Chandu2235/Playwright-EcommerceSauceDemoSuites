import { browser } from '@wdio/globals';

export class WindowManager {
    /**
     * Get the current window handle
     */
    static async getCurrentWindowHandle(): Promise<string> {
        return await browser.getWindowHandle();
    }

    /**
     * Get all available window handles
     */
    static async getAllWindowHandles(): Promise<string[]> {
        return await browser.getWindowHandles();
    }

    /**
     * Switch to a specific window by handle
     */
    static async switchToWindow(handle: string): Promise<void> {
        await browser.switchToWindow(handle);
    }

    /**
     * Switch to the last opened window
     */
    static async switchToLastWindow(): Promise<void> {
        const handles = await this.getAllWindowHandles();
        const lastHandle = handles[handles.length - 1];
        await this.switchToWindow(lastHandle);
    }

    /**
     * Close the current window
     */
    static async closeCurrentWindow(): Promise<void> {
        await browser.closeWindow();
    }

    /**
     * Get window size
     */
    static async getWindowSize(): Promise<{ width: number; height: number }> {
        return await browser.getWindowSize();
    }

    /**
     * Set window size
     */
    static async setWindowSize(width: number, height: number): Promise<void> {
        await browser.setWindowSize(width, height);
    }

    /**
     * Maximize window
     */
    static async maximizeWindow(): Promise<void> {
        await browser.maximizeWindow();
    }
}