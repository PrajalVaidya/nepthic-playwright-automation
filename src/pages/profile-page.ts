import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';

/**
 * Profile Page Object Model
 */
export class ProfilePage extends BasePage {
  readonly heading: Locator;
  readonly subheading: Locator;
  readonly fullNameInput: Locator;
  readonly usernameInput: Locator;
  readonly phoneInput: Locator;
  readonly emailInput: Locator;
  readonly roleInput: Locator;
  readonly updateProfileButton: Locator;
  readonly profileButton: Locator;
  readonly ordersTab: Locator;
  readonly favoritesTab: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Personal Information' });
    this.subheading = page.getByText('Update your personal details and account information');
    this.fullNameInput = page.locator('input[id="name"]');
    this.usernameInput = page.locator('input[id="username"]');
    this.phoneInput = page.locator('input[id="phone"]');
    this.emailInput = page.locator('input[id="email"]');
    this.roleInput = page.locator('input[id="role"]');
    this.updateProfileButton = page.getByRole('button', { name: 'Update Profile' });

    // Navigation Tabs
    this.profileButton = page.locator('a[href="/profile"] button').first();
    this.ordersTab = page.getByRole('button', { name: 'Orders' });
    this.favoritesTab = page.getByRole('button', { name: 'Favorites' });
  }

  /**
   * Verify profile page is loaded
   */
  async verifyProfilePageLoaded(): Promise<boolean> {
    try {
      await this.heading.waitFor({ state: 'visible', timeout: 5000 });
      await this.subheading.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Go to profile page
   */
  async goToProfilePage(): Promise<void> {
    await this.profileButton.click({ force: true });
  }

  /**
   * Verify all form fields are visible
   */
  async verifyAllFormFieldsVisible(): Promise<boolean> {
    try {
      await this.fullNameInput.waitFor({ state: 'visible' });
      await this.usernameInput.waitFor({ state: 'visible' });
      await this.phoneInput.waitFor({ state: 'visible' });
      await this.emailInput.waitFor({ state: 'visible' });
      await this.roleInput.waitFor({ state: 'visible' });
      await this.updateProfileButton.waitFor({ state: 'visible' });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get Full Name value
   */
  async getFullName(): Promise<string> {
    return await this.fullNameInput.inputValue();
  }

  /**
   * Get Username value
   */
  async getUsername(): Promise<string> {
    return await this.usernameInput.inputValue();
  }

  /**
   * Get Email value
   */
  async getEmail(): Promise<string> {
    return await this.emailInput.inputValue();
  }

  /**
   * Update profile information
   */
  async updateProfile(fullName: string, userName: string, phone: string): Promise<void> {
    await this.fullNameInput.fill(fullName);
    await this.phoneInput.fill(phone);
    await this.usernameInput.fill(userName);
    await this.updateProfileButton.click();
  }
}
