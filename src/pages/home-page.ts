import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';
import { HOMEPAGE } from '@fixtures/url';

/**
 * Home Page Object Model
 * Represents the NEPTHIC home/landing page
 */
export class HomePage extends BasePage {
  // Header Navigation Elements
  readonly logo: Locator;
  readonly dropsLink: Locator;
  readonly collectionsLink: Locator;
  readonly aboutLink: Locator;
  readonly themeToggleButton: Locator;
  readonly profileButton: Locator;
  readonly cartButton: Locator;
  readonly cartBadge: Locator;
  readonly logoutButton: Locator;
  readonly welcomeText: Locator;
  readonly mobileMenuButton: Locator;

  // Hero Section Elements
  readonly heroSection: Locator;
  readonly heroCanvas: Locator;
  readonly heroHeading: Locator;
  readonly heroSubheading: Locator;
  readonly shopLatestDropButton: Locator;

  // Latest Drops Section Elements
  readonly latestDropsSection: Locator;
  readonly latestDropsHeading: Locator;
  readonly latestDropsDescription: Locator;
  readonly latestDropsGrid: Locator;
  readonly noProductsMessage: Locator;
  readonly noProductsHint: Locator;

  // Newsletter Section Elements
  readonly newsletterSection: Locator;
  readonly stayUpdatedHeading: Locator;
  readonly stayUpdatedDescription: Locator;
  readonly emailInput: Locator;
  readonly subscribeButton: Locator;

  // Footer Elements
  readonly footer: Locator;
  readonly footerLogo: Locator;
  readonly footerDescription: Locator;
  readonly footerShopSection: Locator;
  readonly footerAboutSection: Locator;
  readonly footerFollowSection: Locator;
  readonly latestDropsFooterLink: Locator;
  readonly collectionsFooterLink: Locator;
  readonly allProductsFooterLink: Locator;
  readonly ourStoryFooterLink: Locator;
  readonly contactFooterLink: Locator;
  readonly faqFooterLink: Locator;
  readonly instagramLink: Locator;
  readonly twitterLink: Locator;
  readonly tiktokLink: Locator;
  readonly footerCopyright: Locator;

  constructor(page: Page) {
    super(page);

    // Header Navigation
    this.logo = page.locator('a[href="/"]').filter({ hasText: 'NEPTHIC' }).first();
    this.dropsLink = page.getByRole('link', { name: /^Drops$/ }).first();
    this.collectionsLink = page.getByRole('link', { name: /^Collections$/ }).first();
    this.aboutLink = page.getByRole('link', { name: /^About$/ }).first();
    this.themeToggleButton = page.locator('button[title*="Switch to"]').first();
    this.profileButton = page.locator('a[href="/profile"] button').first();
    this.cartButton = page.locator('a[href="/cart"] button').first();
    this.cartBadge = page
      .locator('a[href="/cart"] button')
      .locator('[class*="relative"] >> svg')
      .first();
    this.logoutButton = page.getByRole('button', { name: 'Logout' }).first();
    this.welcomeText = page.getByText(/Welcome, \w+/);
    this.mobileMenuButton = page.locator('button[aria-haspopup="dialog"]').last();

    // Hero Section
    this.heroSection = page.locator('section').filter({ has: page.locator('canvas') });
    this.heroCanvas = page.locator('canvas[data-engine="three.js r180"]');
    this.heroHeading = page.getByRole('heading', { name: 'NEPTHIC', level: 1 });
    this.heroSubheading = page.getByText(
      'Exclusive streetwear drops. Limited quantities. Premium quality.'
    );
    this.shopLatestDropButton = page
      .getByRole('link', { name: /Shop Latest Drop/ })
      .locator('button');

    // Latest Drops Section
    this.latestDropsSection = page.locator('section').filter({ hasText: 'Latest Drops' });
    this.latestDropsHeading = page.getByRole('heading', { name: 'Latest Drops' });
    this.latestDropsDescription = page.getByText('Exclusive pieces, limited quantities');
    this.latestDropsGrid = page
      .locator('section')
      .filter({ hasText: 'Latest Drops' })
      .locator('[class*="grid"]')
      .first();
    this.noProductsMessage = page.getByText('No products available at the moment');
    this.noProductsHint = page.getByText('Check back soon for new drops!');

    // Newsletter Section
    this.newsletterSection = page.locator('section').filter({ hasText: 'Stay Updated' });
    this.stayUpdatedHeading = page.getByRole('heading', { name: 'Stay Updated' });
    this.stayUpdatedDescription = page.getByText(
      'Be the first to know about new drops, exclusive releases, and special offers.'
    );
    this.emailInput = this.newsletterSection.locator('input[type="email"]');
    this.subscribeButton = this.newsletterSection.getByRole('button', { name: 'Subscribe' });

    // Footer
    this.footer = page.locator('footer');
    this.footerLogo = this.footer.getByRole('heading', { name: 'NEPTHIC' });
    this.footerDescription = this.footer.getByText('Premium streetwear for the next generation.');
    this.footerShopSection = this.footer.locator('h4').filter({ hasText: 'Shop' }).first();
    this.footerAboutSection = this.footer.locator('h4').filter({ hasText: 'About' }).first();
    this.footerFollowSection = this.footer.locator('h4').filter({ hasText: 'Follow' }).first();
    this.latestDropsFooterLink = this.footer.getByRole('link', { name: 'Latest Drops' });
    this.collectionsFooterLink = this.footer.getByRole('link', { name: 'Collections' });
    this.allProductsFooterLink = this.footer.getByRole('link', { name: 'All Products' });
    this.ourStoryFooterLink = this.footer.getByRole('link', { name: 'Our Story' });
    this.contactFooterLink = this.footer.getByRole('link', { name: 'Contact' });
    this.faqFooterLink = this.footer.getByRole('link', { name: 'FAQ' });
    this.instagramLink = this.footer.getByRole('link', { name: 'Instagram' });
    this.twitterLink = this.footer.getByRole('link', { name: 'Twitter' });
    this.tiktokLink = this.footer.getByRole('link', { name: 'TikTok' });
    this.footerCopyright = page.getByText('© 2025 NEPTHIC. All rights reserved.');
  }

  /**
   * Navigate to home page
   */
  async navigateToHomePage() {
    await this.goto(HOMEPAGE);
  }

  /**
   * Verify home page is loaded
   */
  async verifyHomePageLoaded(): Promise<boolean> {
    try {
      await this.heroHeading.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Click on Drops link
   */
  async clickDropsLink() {
    await this.dropsLink.click();
  }

  /**
   * Click on Collections link
   */
  async clickCollectionsLink() {
    await this.collectionsLink.click();
  }

  /**
   * Click on About link
   */
  async clickAboutLink() {
    await this.aboutLink.click();
  }

  /**
   * Click theme toggle button
   */
  async toggleTheme() {
    await this.themeToggleButton.click();
  }

  /**
   * Click on profile button
   */
  async clickProfileButton() {
    await this.profileButton.click();
  }

  /**
   * Click on cart button
   */
  async clickCartButton() {
    await this.cartButton.click();
  }

  /**
   * Click on logo to return to home
   */
  async clickLogo() {
    await this.logo.click();
  }

  /**
   * Click logout button
   */
  async clickLogout() {
    await this.logoutButton.click();
  }

  /**
   * Get welcome message text
   */
  async getWelcomeMessage(): Promise<string | null> {
    try {
      return await this.welcomeText.textContent();
    } catch {
      return null;
    }
  }

  /**
   * Verify user is logged in by checking welcome text
   */
  async isUserLoggedIn(): Promise<boolean> {
    try {
      await this.welcomeText.waitFor({ state: 'visible', timeout: 3000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Click Shop Latest Drop button
   */
  async clickShopLatestDrop() {
    await this.shopLatestDropButton.click();
  }

  /**
   * Verify hero section is visible
   */
  async isHeroSectionVisible(): Promise<boolean> {
    try {
      await this.heroSection.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Verify canvas is rendered (3D animation)
   */
  async isCanvasRendered(): Promise<boolean> {
    try {
      await this.heroCanvas.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get hero section heading text
   */
  async getHeroHeading(): Promise<string | null> {
    return await this.heroHeading.textContent();
  }

  /**
   * Get hero section subheading text
   */
  async getHeroSubheading(): Promise<string | null> {
    return await this.heroSubheading.textContent();
  }

  /**
   * Verify latest drops section is visible
   */
  async isLatestDropsSectionVisible(): Promise<boolean> {
    try {
      await this.latestDropsSection.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if no products message is displayed
   */
  async isNoProductsMessageDisplayed(): Promise<boolean> {
    try {
      await this.noProductsMessage.waitFor({ state: 'visible', timeout: 3000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get latest drops heading text
   */
  async getLatestDropsHeading(): Promise<string | null> {
    return await this.latestDropsHeading.textContent();
  }

  /**
   * Verify newsletter section is visible
   */
  async isNewsletterSectionVisible(): Promise<boolean> {
    try {
      await this.newsletterSection.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Enter email for newsletter subscription
   */
  async enterEmailForNewsletter(email: string) {
    await this.emailInput.fill(email);
  }

  /**
   * Click subscribe button
   */
  async clickSubscribe() {
    await this.subscribeButton.click();
  }

  /**
   * Subscribe to newsletter
   */
  async subscribeToNewsletter(email: string) {
    await this.enterEmailForNewsletter(email);
    await this.clickSubscribe();
  }

  /**
   * Get newsletter email input value
   */
  async getNewsletterEmailValue(): Promise<string | null> {
    return await this.emailInput.inputValue();
  }

  /**
   * Verify footer is visible
   */
  async isFooterVisible(): Promise<boolean> {
    try {
      await this.footer.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get footer logo text
   */
  async getFooterLogo(): Promise<string | null> {
    return await this.footerLogo.textContent();
  }

  /**
   * Click Latest Drops footer link
   */
  async clickLatestDropsFooterLink() {
    await this.latestDropsFooterLink.click();
  }

  /**
   * Click Collections footer link
   */
  async clickCollectionsFooterLink() {
    await this.collectionsFooterLink.click();
  }

  /**
   * Click All Products footer link
   */
  async clickAllProductsFooterLink() {
    await this.allProductsFooterLink.click();
  }

  /**
   * Click Our Story footer link
   */
  async clickOurStoryFooterLink() {
    await this.ourStoryFooterLink.click();
  }

  /**
   * Click Contact footer link
   */
  async clickContactFooterLink() {
    await this.contactFooterLink.click();
  }

  /**
   * Click FAQ footer link
   */
  async clickFAQFooterLink() {
    await this.faqFooterLink.click();
  }

  /**
   * Click Instagram link
   */
  async clickInstagramLink() {
    await this.instagramLink.click();
  }

  /**
   * Click Twitter link
   */
  async clickTwitterLink() {
    await this.twitterLink.click();
  }

  /**
   * Click TikTok link
   */
  async clickTikTokLink() {
    await this.tiktokLink.click();
  }

  /**
   * Get page title
   */
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Open mobile menu (hamburger button)
   */
  async openMobileMenu() {
    await this.mobileMenuButton.click();
  }

  /**
   * Verify mobile menu button is visible
   */
  async isMobileMenuButtonVisible(): Promise<boolean> {
    try {
      await this.mobileMenuButton.waitFor({ state: 'visible', timeout: 3000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if page is in dark mode
   */
  async isDarkMode(): Promise<boolean> {
    const htmlElement = this.page.locator('html');
    const classes = await htmlElement.getAttribute('class');
    return classes?.includes('dark') || false;
  }

  /**
   * Check if page is in light mode
   */
  async isLightMode(): Promise<boolean> {
    const isDark = await this.isDarkMode();
    return !isDark;
  }

  /**
   * Scroll to Latest Drops section
   */
  async scrollToLatestDropsSection() {
    await this.latestDropsSection.scrollIntoViewIfNeeded();
  }

  /**
   * Scroll to Newsletter section
   */
  async scrollToNewsletterSection() {
    await this.newsletterSection.scrollIntoViewIfNeeded();
  }

  /**
   * Scroll to Footer
   */
  async scrollToFooter() {
    await this.footer.scrollIntoViewIfNeeded();
  }

  /**
   * Get all footer section headings
   */
  async getFooterSectionHeadings(): Promise<string[]> {
    const headings = await this.footer.locator('h4').allTextContents();
    return headings;
  }

  /**
   * Verify all main page sections are visible
   */
  async verifyAllSectionsVisible(): Promise<boolean> {
    const heroVisible = await this.isHeroSectionVisible();
    const dropsVisible = await this.isLatestDropsSectionVisible();
    const newsletterVisible = await this.isNewsletterSectionVisible();
    const footerVisible = await this.isFooterVisible();

    return heroVisible && dropsVisible && newsletterVisible && footerVisible;
  }

  async verifyLogOutButtonVisible(): Promise<boolean> {
    try {
      await this.logoutButton.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }
}
