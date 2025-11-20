import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';
import { SIGNUP_PAGE } from '@fixtures/url';

/**
 * Sign Up Page Object Model
 * Represents the NEPTHIC sign-up/registration page
 */
export class SignUpPage extends BasePage {
  // Header Navigation Elements
  readonly logo: Locator;
  readonly dropsLink: Locator;
  readonly collectionsLink: Locator;
  readonly aboutLink: Locator;
  readonly themeToggleButton: Locator;
  readonly profileButton: Locator;
  readonly cartButton: Locator;
  readonly loginButton: Locator;
  readonly mobileMenuButton: Locator;

  // Sign Up Form Elements
  readonly signUpHeading: Locator;
  readonly signUpSubHeading: Locator;
  readonly googleSignUpButton: Locator;
  readonly fullNameInput: Locator;
  readonly usernameInput: Locator;
  readonly emailInput: Locator;
  readonly emailHint: Locator;
  readonly phoneInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly signUpSubmitButton: Locator;
  readonly dividerText: Locator;

  // Sign In Link
  readonly signInLink: Locator;
  readonly signInLinkText: Locator;

  // Verification Form
  readonly verificationCodeInput: Locator;
  readonly verificationCodeSubmitButton: Locator;

  // Footer Elements
  readonly footer: Locator;
  readonly footerLogo: Locator;
  readonly footerDescription: Locator;
  readonly footerShopLinks: Locator;
  readonly footerAboutLinks: Locator;
  readonly instagramLink: Locator;
  readonly twitterLink: Locator;
  readonly tiktokLink: Locator;
  readonly footerCopyright: Locator;

  constructor(page: Page) {
    super(page);

    // Header Navigation
    this.logo = page.locator('a:has-text("NEPTHIC")').first();
    this.dropsLink = page.getByRole('link', { name: 'Drops' }).first();
    this.collectionsLink = page.getByRole('link', { name: 'Collections' }).first();
    this.aboutLink = page.getByRole('link', { name: 'About' }).first();
    this.themeToggleButton = page.locator('button[title*="Switch to"]').first();
    this.profileButton = page.locator('a[href="/profile"]').first();
    this.cartButton = page.locator('a[href="/cart"] button').first();
    this.loginButton = page.getByRole('button', { name: 'Login' }).first();
    this.mobileMenuButton = page.locator('button[aria-haspopup="dialog"]');

    // Sign Up Form
    this.signUpHeading = page.getByRole('heading', { name: 'Join NEPTHIC' });
    this.signUpSubHeading = page.getByText('Create your account to get started');
    this.googleSignUpButton = page.getByRole('button', { name: /Sign up with Google/i });
    this.fullNameInput = page.locator('input[name="fullName"]');
    this.usernameInput = page.locator('input[name="username"]');
    this.emailInput = page.locator('input[name="email"]');
    this.emailHint = page.getByText('Verification code will be sent');
    this.phoneInput = page.locator('input[name="phone"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.confirmPasswordInput = page.locator('input[name="confirmPassword"]');
    this.signUpSubmitButton = page.getByRole('button', { name: 'Sign Up', exact: true });
    this.dividerText = page.getByText('Or sign up with email');

    // Sign In Link
    this.signInLink = page.getByRole('link', { name: 'Sign in' });
    this.signInLinkText = page.getByText('Already a member?');

    // Verification form Elements
    this.verificationCodeInput = page.getByRole('textbox');
    this.verificationCodeSubmitButton = page.getByRole('button', { name: 'Verify' })

    // Footer Elements
    this.footer = page.locator('footer');
    this.footerLogo = page.locator('footer h3:has-text("NEPTHIC")');
    this.footerDescription = page.getByText('Premium streetwear for the next generation.');
    this.footerShopLinks = page
      .locator('footer')
      .getByRole('link', { name: /Latest Drops|Collections/i });
    this.footerAboutLinks = page
      .locator('footer')
      .getByRole('link', { name: /Our Story|Policies|Contact/i });
    this.instagramLink = page.getByRole('link', { name: 'Instagram' });
    this.twitterLink = page.getByRole('link', { name: 'X (Twitter)' });
    this.tiktokLink = page.getByRole('link', { name: 'TikTok' });
    this.footerCopyright = page.getByText('© 2025 NEPTHIC. All rights reserved.');
  }

  /**
   * Navigate to sign up page
   */
  async navigateToSignUp(): Promise<void> {
    await this.goto(SIGNUP_PAGE);
  }

  /**
   * Fill full name field
   */
  async fillFullName(fullName: string): Promise<void> {
    await this.fullNameInput.fill(fullName);
  }

  /**
   * Fill username field
   */
  async fillUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  /**
   * Fill email field
   */
  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  /**
   * Fill phone number field
   */
  async fillPhoneNumber(phone: string): Promise<void> {
    await this.phoneInput.fill(phone);
  }

  /**
   * Fill password field
   */
  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  /**
   * Fill confirm password field
   */
  async fillConfirmPassword(confirmPassword: string): Promise<void> {
    await this.confirmPasswordInput.fill(confirmPassword);
  }

  /**
   * Fill all required sign up fields
   */
  async fillSignUpForm(formData: {
    fullName: string;
    username: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
  }): Promise<void> {
    await this.fillFullName(formData.fullName);
    await this.fillUsername(formData.username);
    await this.fillEmail(formData.email);
    await this.fillPhoneNumber(formData.phone);
    await this.fillPassword(formData.password);
    await this.fillConfirmPassword(formData.confirmPassword);
  }


  /**
   * Fill in the OTP for sign up
   */
  async fillVerificationCode(code: string): Promise<void> {
    await this.verificationCodeInput.fill(code);
  }

  /**
   * Submit verification code
   */
  async submitVerificationCode(): Promise<void> {
    await this.verificationCodeSubmitButton.click();
  }

  /**
   * Submit sign up form
   */
  async submitSignUp(): Promise<void> {
    await this.signUpSubmitButton.click();
  }

  /**
   * Sign up with Google
   */
  async signUpWithGoogle(): Promise<void> {
    await this.googleSignUpButton.click();
  }

  /**
   * Click Sign In link
   */
  async clickSignInLink(): Promise<void> {
    await this.signInLink.click();
  }

  /**
   * Toggle theme
   */
  async toggleTheme(): Promise<void> {
    await this.themeToggleButton.click();
  }

  /**
   * Click profile button
   */
  async clickProfileButton(): Promise<void> {
    await this.profileButton.click();
  }

  /**
   * Click cart button
   */
  async clickCartButton(): Promise<void> {
    await this.cartButton.click();
  }

  /**
   * Click logo to navigate home
   */
  async clickLogo(): Promise<void> {
    await this.logo.click();
  }

  /**
   * Navigate to Drops page
   */
  async navigateToDrops(): Promise<void> {
    await this.dropsLink.click();
  }

  /**
   * Navigate to Collections page
   */
  async navigateToCollections(): Promise<void> {
    await this.collectionsLink.click();
  }

  /**
   * Navigate to About page
   */
  async navigateToAbout(): Promise<void> {
    await this.aboutLink.click();
  }

  /**
   * Navigate to Login page
   */
  async navigateToLogin(): Promise<void> {
    await this.loginButton.click();
  }

  /**
   * Open mobile menu
   */
  async openMobileMenu(): Promise<void> {
    await this.mobileMenuButton.click();
  }

  /**
   * Verify sign up page is loaded
   */
  async verifySignUpPageLoaded(): Promise<boolean> {
    return await this.signUpHeading.isVisible();
  }

  /**
   * Verify full name field is visible
   */
  async verifyFullNameFieldVisible(): Promise<boolean> {
    return await this.fullNameInput.isVisible();
  }

  /**
   * Verify all form fields are visible
   */
  async verifyAllFormFieldsVisible(): Promise<boolean> {
    const fullNameVisible = await this.fullNameInput.isVisible();
    const usernameVisible = await this.usernameInput.isVisible();
    const emailVisible = await this.emailInput.isVisible();
    const phoneVisible = await this.phoneInput.isVisible();
    const passwordVisible = await this.passwordInput.isVisible();
    const confirmPasswordVisible = await this.confirmPasswordInput.isVisible();

    return (
      fullNameVisible &&
      usernameVisible &&
      emailVisible &&
      phoneVisible &&
      passwordVisible &&
      confirmPasswordVisible
    );
  }

  /**
   * Verify sign up button is enabled
   */
  async verifySignUpButtonEnabled(): Promise<boolean> {
    return await this.signUpSubmitButton.isEnabled();
  }

  /**
   * Get full name input value
   */
  async getFullNameValue(): Promise<string | null> {
    return await this.fullNameInput.inputValue();
  }

  /**
   * Get email input value
   */
  async getEmailValue(): Promise<string | null> {
    return await this.emailInput.inputValue();
  }

  /**
   * Get username input value
   */
  async getUsernameValue(): Promise<string | null> {
    return await this.usernameInput.inputValue();
  }

  /**
   * Get phone input value
   */
  async getPhoneValue(): Promise<string | null> {
    return await this.phoneInput.inputValue();
  }

  /**
   * Verify footer is visible
   */
  async verifyFooterVisible(): Promise<boolean> {
    return await this.footer.isVisible();
  }

  /**
   * Verify footer links are present
   */
  async verifyFooterLinksPresent(): Promise<boolean> {
    const instagramVisible = await this.instagramLink.isVisible();
    const twitterVisible = await this.twitterLink.isVisible();
    const tiktokVisible = await this.tiktokLink.isVisible();

    return instagramVisible && twitterVisible && tiktokVisible;
  }

  /**
   * Get page heading text
   */
  async getSignUpHeadingText(): Promise<string> {
    return (await this.signUpHeading.textContent()) || '';
  }

  /**
   * Verify email hint is displayed
   */
  async verifyEmailHintDisplayed(): Promise<boolean> {
    return await this.emailHint.isVisible();
  }

  /**
   * Verify Google sign up button is visible
   */
  async verifyGoogleSignUpButtonVisible(): Promise<boolean> {
    return await this.googleSignUpButton.isVisible();
  }

  /**
   * Verify sign in link is visible
   */
  async verifySignInLinkVisible(): Promise<boolean> {
    return await this.signInLink.isVisible();
  }
}
