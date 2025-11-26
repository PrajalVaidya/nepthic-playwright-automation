import { Page } from '@playwright/test';

/**
 * Base page class with common functionality
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a path
   */
  async goto(path: string) {
    await this.page.goto(path);
  }

  /**
   * Get page title
   */
  async getTitle(): Promise<string> {
    return this.page.title();
  }

  /**
   * Get current URL
   */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * Wait for URL to match pattern
   */
  async waitForUrl(urlPattern: string | RegExp) {
    await this.page.waitForURL(urlPattern);
  }

  /**
   * Reload page
   */
  async reload() {
    await this.page.reload();
  }

  /**
   * Go back in browser history
   */
  async goBack() {
    await this.page.goBack();
  }

  /**
   * Go forward in browser history
   */
  async goForward() {
    await this.page.goForward();
  }

  /**
   * Wait for specific time
   */
  async waitForTimeout(ms: number) {
    await this.page.waitForTimeout(ms);
  }

  /**
   * Execute JavaScript on page
   */
  async executeScript<T>(script: string | ((arg: any) => any), args?: any): Promise<T> {
    return this.page.evaluate(script, args) as Promise<T>;
  }
}
