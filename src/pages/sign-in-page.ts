import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';

/**
 * Sign In Page Object Model
 * Represents the NEPTHIC sign-in/login page
 */
export class SignInPage extends BasePage {
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

  // Sign In Form Elements
  readonly signInHeading: Locator;
  readonly signInSubHeading: Locator;
  readonly googleSignInButton: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly rememberMeLabel: Locator;
  readonly forgotPasswordLink: Locator;
  readonly signInSubmitButton: Locator;
  readonly dividerText: Locator;

  // Sign Up Link
  readonly signUpLink: Locator;
  readonly signUpLinkText: Locator;

  // Footer Elements
  readonly footer: Locator;
  readonly footerLogo: Locator;
  readonly footerDescription: Locator;
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
    this.themeToggleButton = page.locator('button[title="Switch to light mode"]').first();
    this.profileButton = page
      .getByRole('link', { name: '' })
      .filter({ has: page.locator('svg.lucide-user') })
      .first();
    this.cartButton = page.locator('a[href="/cart"] button').first();
    this.loginButton = page.getByRole('button', { name: 'Login' }).first();
    this.mobileMenuButton = page.locator('button[aria-haspopup="dialog"]');

    // Sign In Form
    this.signInHeading = page.getByRole('heading', { name: /Sign In|Login/i }).first();
    this.signInSubHeading = page.getByText(/Welcome back|Enter your credentials/i).first();
    this.googleSignInButton = page.getByRole('button', { name: /Sign in with Google/i });
    this.emailInput = page.locator('input[placeholder="Enter your email or username"]').first();
    this.passwordInput = page.locator('input[type="password"]').first();
    this.rememberMeCheckbox = page.locator('input[type="checkbox"]');
    this.rememberMeLabel = page.getByText('Remember me');
    this.forgotPasswordLink = page.getByRole('link', { name: /Forgot password|Forgot\?/i });
    this.signInSubmitButton = page.getByRole('button', { name: /Sign In|Login/i }).last();
    this.dividerText = page.getByText('Or sign in with email');

    // Sign Up Link
    this.signUpLink = page.getByRole('link', { name: 'Sign up' });
    this.signUpLinkText = page.getByText("Don't have an account?");

    // Footer Elements
    this.footer = page.locator('footer');
    this.footerLogo = page.locator('footer h3:has-text("NEPTHIC")');
    this.footerDescription = page.getByText('Premium streetwear for the next generation.');
    this.instagramLink = page.getByRole('link', { name: 'Instagram' });
    this.twitterLink = page.getByRole('link', { name: 'X (Twitter)' });
    this.tiktokLink = page.getByRole('link', { name: 'TikTok' });
    this.footerCopyright = page.getByText('© 2025 NEPTHIC. All rights reserved.');
  }

  /**
   * Navigate to sign in page
   */
  async navigateToSignIn(): Promise<void> {
    await this.goto('/sign-in');
  }

  /**
   * Fill email field
   */
  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  /**
   * Fill password field
   */
  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  /**
   * Fill sign in form with email and password
   */
  async fillSignInForm(email: string, password: string): Promise<void> {
    await this.fillEmail(email);
    await this.fillPassword(password);
  }

  /**
   * Check "Remember me" checkbox
   */
  async checkRememberMe(): Promise<void> {
    const isChecked = await this.rememberMeCheckbox.isChecked();
    if (!isChecked) {
      await this.rememberMeCheckbox.click();
    }
  }

  /**
   * Uncheck "Remember me" checkbox
   */
  async uncheckRememberMe(): Promise<void> {
    const isChecked = await this.rememberMeCheckbox.isChecked();
    if (isChecked) {
      await this.rememberMeCheckbox.click();
    }
  }

  /**
   * Submit sign in form
   */
  async submitSignIn(): Promise<void> {
    await this.signInSubmitButton.click();
  }

  /**
   * Sign in with Google
   */
  async signInWithGoogle(): Promise<void> {
    await this.googleSignInButton.click();
  }

  /**
   * Click forgot password link
   */
  async clickForgotPassword(): Promise<void> {
    await this.forgotPasswordLink.click();
  }

  /**
   * Click Sign Up link
   */
  async clickSignUpLink(): Promise<void> {
    await this.signUpLink.click();
  }

  /**
   * Complete sign in process
   */
  async signIn(email: string, password: string, rememberMe: boolean = false): Promise<void> {
    await this.fillSignInForm(email, password);
    if (rememberMe) {
      await this.checkRememberMe();
    }
    await this.submitSignIn();
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
   * Open mobile menu
   */
  async openMobileMenu(): Promise<void> {
    await this.mobileMenuButton.click();
  }

  /**
   * Verify sign in page is loaded
   */
  async verifySignInPageLoaded(): Promise<boolean> {
    return await this.signInHeading.isVisible();
  }

  /**
   * Verify email field is visible
   */
  async verifyEmailFieldVisible(): Promise<boolean> {
    return await this.emailInput.isVisible();
  }

  /**
   * Verify password field is visible
   */
  async verifyPasswordFieldVisible(): Promise<boolean> {
    return await this.passwordInput.isVisible();
  }

  /**
   * Verify all form fields are visible
   */
  async verifyAllFormFieldsVisible(): Promise<boolean> {
    const emailVisible = await this.emailInput.isVisible();
    const passwordVisible = await this.passwordInput.isVisible();
    const signInButtonVisible = await this.signInSubmitButton.isVisible();

    return emailVisible && passwordVisible && signInButtonVisible;
  }

  /**
   * Verify sign in button is enabled
   */
  async verifySignInButtonEnabled(): Promise<boolean> {
    return await this.signInSubmitButton.isEnabled();
  }

  /**
   * Get email input value
   */
  async getEmailValue(): Promise<string | null> {
    return await this.emailInput.inputValue();
  }

  /**
   * Get password input value
   */
  async getPasswordValue(): Promise<string | null> {
    return await this.passwordInput.inputValue();
  }

  /**
   * Verify "Remember me" is checked
   */
  async isRememberMeChecked(): Promise<boolean> {
    return await this.rememberMeCheckbox.isChecked();
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
  async getSignInHeadingText(): Promise<string> {
    return (await this.signInHeading.textContent()) || '';
  }

  /**
   * Verify Google sign in button is visible
   */
  async verifyGoogleSignInButtonVisible(): Promise<boolean> {
    return await this.googleSignInButton.isVisible();
  }

  /**
   * Verify sign up link is visible
   */
  async verifySignUpLinkVisible(): Promise<boolean> {
    return await this.signUpLink.isVisible();
  }

  /**
   * Verify forgot password link is visible
   */
  async verifyForgotPasswordLinkVisible(): Promise<boolean> {
    return await this.forgotPasswordLink.isVisible();
  }
}
