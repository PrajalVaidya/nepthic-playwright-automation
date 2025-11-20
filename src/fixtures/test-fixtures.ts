import { test as base } from '@playwright/test';
import { Page } from '@playwright/test';
import { SignUpPage } from '@pages/sign-up-page';
import { SignInPage } from '@pages/sign-in-page';

export type TestFixtures = {
  /**
   * Custom page fixture with pre-configured settings
   */
  customPage: Page;
  /**
   * Sign Up Page Object
   */
  signUpPage: SignUpPage;
  /**
   * Sign In Page Object
   */
  signInPage: SignInPage;
};

export const test = base.extend<TestFixtures>({
  customPage: async ({ page }, use) => {
    // Set default timeout
    page.setDefaultTimeout(10000);
    page.setDefaultNavigationTimeout(30000);

    // Log navigation events
    page.on('framenavigated', (frame) => {
      console.log(`Navigated to: ${frame.url()}`);
    });

    await use(page);
  },

  signUpPage: async ({ page }, use) => {
    // Set default timeout
    page.setDefaultTimeout(10000);
    page.setDefaultNavigationTimeout(30000);

    const signUpPage = new SignUpPage(page);
    await use(signUpPage);
  },

  signInPage: async ({ page }, use) => {
    // Set default timeout
    page.setDefaultTimeout(10000);
    page.setDefaultNavigationTimeout(30000);

    const signInPage = new SignInPage(page);
    await use(signInPage);
  },
});

export { expect } from '@playwright/test';
