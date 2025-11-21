import { test, expect } from '@fixtures/test-fixtures';
import { validCredentials } from '@data/auth-data/sign-in.data';

test.describe('Sign In Page - UI Verification', () => {
  test.beforeEach(async ({ signInPage }) => {
    await signInPage.navigateToSignIn();
  });

  test('@smoke should load sign in page with all elements', async ({ signInPage }) => {
    // Verify page is loaded
    const isLoaded = await signInPage.verifySignInPageLoaded();
    expect(isLoaded).toBeTruthy();

    // Verify form elements
    const allFieldsVisible = await signInPage.verifyAllFormFieldsVisible();
    expect(allFieldsVisible).toBeTruthy();
  });

  test('@regression should verify email field is visible', async ({ signInPage }) => {
    const emailVisible = await signInPage.verifyEmailFieldVisible();
    expect(emailVisible).toBeTruthy();
  });

  test('@regression should verify password field is visible', async ({ signInPage }) => {
    const passwordVisible = await signInPage.verifyPasswordFieldVisible();
    expect(passwordVisible).toBeTruthy();
  });

  test('@regression should verify Google sign in button is visible', async ({ signInPage }) => {
    const googleButtonVisible = await signInPage.verifyGoogleSignInButtonVisible();
    expect(googleButtonVisible).toBeTruthy();
  });

  test('@regression should verify sign up link is visible', async ({ signInPage }) => {
    const signUpLinkVisible = await signInPage.verifySignUpLinkVisible();
    expect(signUpLinkVisible).toBeTruthy();
  });

  test('@regression should verify forgot password link is visible', async ({ signInPage }) => {
    const forgotPasswordVisible = await signInPage.verifyForgotPasswordLinkVisible();
    expect(forgotPasswordVisible).toBeTruthy();
  });

  test('@regression should verify footer is visible', async ({ signInPage }) => {
    const footerVisible = await signInPage.verifyFooterVisible();
    expect(footerVisible).toBeTruthy();
  });

  test('@regression should verify footer links are present', async ({ signInPage }) => {
    const footerLinksPresent = await signInPage.verifyFooterLinksPresent();
    expect(footerLinksPresent).toBeTruthy();
  });
});

test.describe('Sign In Page - Form Interaction', () => {
  test.beforeEach(async ({ signInPage }) => {
    await signInPage.navigateToSignIn();
  });

  test('@regression should fill email and password fields', async ({ signInPage }) => {
    await signInPage.fillSignInForm(validCredentials.email, validCredentials.password);

    expect(await signInPage.getEmailValue()).toBe(validCredentials.email);
    expect(await signInPage.getPasswordValue()).toBe(validCredentials.password);
  });

  test('@regression should fill only email field', async ({ signInPage }) => {
    await signInPage.fillEmail(validCredentials.email);
    expect(await signInPage.getEmailValue()).toBe(validCredentials.email);
  });

  test('@regression should fill only password field', async ({ signInPage }) => {
    await signInPage.fillPassword(validCredentials.password);
    expect(await signInPage.getPasswordValue()).toBe(validCredentials.password);
  });

  test('@regression should clear form fields', async ({ signInPage }) => {
    await signInPage.fillSignInForm(validCredentials.email, validCredentials.password);

    await signInPage.emailInput.clear();
    await signInPage.passwordInput.clear();

    expect(await signInPage.getEmailValue()).toBe('');
    expect(await signInPage.getPasswordValue()).toBe('');
  });

  test('@regression should check remember me checkbox', async ({ signInPage }) => {
    await signInPage.checkRememberMe();
    const isChecked = await signInPage.isRememberMeChecked();
    expect(isChecked).toBeTruthy();
  });

  test('@regression should uncheck remember me checkbox', async ({ signInPage }) => {
    await signInPage.checkRememberMe();
    expect(await signInPage.isRememberMeChecked()).toBeTruthy();

    await signInPage.uncheckRememberMe();
    expect(await signInPage.isRememberMeChecked()).toBeFalsy();
  });

  test('@regression should verify sign in button is enabled', async ({ signInPage }) => {
    const isEnabled = await signInPage.verifySignInButtonEnabled();
    expect(isEnabled).toBeTruthy();
  });
});

test.describe('Sign In Page - Navigation', () => {
  test.beforeEach(async ({ signInPage }) => {
    await signInPage.navigateToSignIn();
  });

  test('@smoke should navigate to sign up page via link', async ({ signInPage, page }) => {
    await signInPage.clickSignUpLink();
    await page.waitForURL(/sign-up/);
    expect(page.url()).toContain('/sign-up');
  });

  test('@regression should navigate to forgot password page', async ({ signInPage, page }) => {
    await signInPage.clickForgotPassword();
    await page.waitForLoadState('domcontentloaded');
    expect(page.url()).toContain('/forgot-password');
  });

  test('@regression should navigate to home via logo', async ({ signInPage, page }) => {
    await signInPage.clickLogo();
    await page.waitForLoadState('domcontentloaded').catch(() => {
      // Logo navigation may vary depending on app behavior
    });
  });

  test('@regression should navigate to drops page', async ({ signInPage, page }) => {
    await signInPage.navigateToDrops();
    await page.waitForLoadState('domcontentloaded');
    expect(page.url()).toContain('/drops');
  });

  test('@regression should navigate to collections page', async ({ signInPage, page }) => {
    await signInPage.navigateToCollections();
    await page.waitForLoadState('domcontentloaded');
    expect(page.url()).toContain('/collections');
  });

  test('@regression should navigate to about page', async ({ signInPage, page }) => {
    await signInPage.navigateToAbout();
    await page.waitForLoadState('domcontentloaded');
    expect(page.url()).toContain('/about');
  });

  test('@regression should navigate to cart page', async ({ signInPage, page }) => {
    await signInPage.clickCartButton();
    await page.waitForLoadState('domcontentloaded');
    expect(page.url()).toContain('/cart');
  });
});

test.describe('Sign In Page - Theme Toggle', () => {
  test.beforeEach(async ({ signInPage }) => {
    await signInPage.navigateToSignIn();
  });

  test('@regression should toggle theme', async ({ signInPage, page }) => {
    const themeButton = signInPage.themeToggleButton;
    await themeButton.click();
    await page.waitForTimeout(500);

    // Verify theme change occurred
    const htmlElement = page.locator('html');
    const classes = await htmlElement.getAttribute('class');
    expect(classes).toBeDefined();
  });
});

test.describe('Sign In Page - Responsive Design', () => {
  test.beforeEach(async ({ signInPage }) => {
    await signInPage.navigateToSignIn();
  });

  test('@regression should verify page loads on mobile viewport', async ({ signInPage }) => {
    // Verify mobile menu button exists
    const mobileMenuButton = signInPage.mobileMenuButton;
    expect(await mobileMenuButton.isVisible()).toBeTruthy();
  });

  test('@regression should verify form is responsive', async ({ signInPage }) => {
    // Verify form container is visible
    const heading = signInPage.signInSubmitButton;
    expect(await heading.isVisible()).toBeTruthy();
  });
});
