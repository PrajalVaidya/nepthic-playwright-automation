import { expect, Page } from '@playwright/test';

/**
 * Wait for network idle
 */
export async function waitForNetworkIdle(page: Page, timeout = 5000) {
  await page.waitForLoadState('networkidle', { timeout });
}

/**
 * Wait for DOM to be ready
 */
export async function waitForDomReady(page: Page) {
  await page.waitForLoadState('domcontentloaded');
}

/**
 * Scroll to element
 */
export async function scrollToElement(page: Page, selector: string) {
  const element = page.locator(selector);
  await element.scrollIntoViewIfNeeded();
}

/**
 * Check if element is visible
 */
export async function isElementVisible(page: Page, selector: string): Promise<boolean> {
  const element = page.locator(selector);
  return element.isVisible();
}

/**
 * Get text content from element
 */
export async function getElementText(page: Page, selector: string): Promise<string> {
  const element = page.locator(selector);
  return element.textContent() as Promise<string>;
}

/**
 * Fill input field with clear
 */
export async function fillInput(page: Page, selector: string, value: string) {
  const input = page.locator(selector);
  await input.clear();
  await input.fill(value);
}

/**
 * Wait and click element
 */
export async function waitAndClick(page: Page, selector: string, timeout = 5000) {
  const element = page.locator(selector);
  await element.waitFor({ state: 'visible', timeout });
  await element.click();
}

/**
 * Take screenshot with timestamp
 */
export async function takeScreenshot(page: Page, name: string) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  await page.screenshot({ path: `./reports/${name}-${timestamp}.png` });
}

export async function closeToastPopUp(page:Page){
  await page.getByRole('button', { name: 'Close toast' }).click();
}
