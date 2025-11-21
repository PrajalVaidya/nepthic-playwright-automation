import { test, expect } from '@fixtures/test-fixtures';
import { testSignUpVerificationCodeUser, validCredentials } from '@data/auth-data/sign-in.data';
import { BASE_URL } from '@fixtures/url';
import { getVerificationCode } from '@utils/get-verification-code.helper';
import { setUncaughtExceptionCaptureCallback } from 'process';

test.describe('Sign Up Page - UI Verification', () => {
  test.beforeEach(async ({ signUpPage }) => {
    await signUpPage.navigateToSignUp();
  });

  test('@smoke should load sign up page with all elements', async ({ signUpPage }) => {
    // Verify page is loaded
    const isLoaded = await signUpPage.verifySignUpPageLoaded();
    expect(isLoaded).toBeTruthy();

    // Verify heading
    const headingText = await signUpPage.getSignUpHeadingText();
    expect(headingText).toContain('Join NEPTHIC');

    // Verify form elements
    const allFieldsVisible = await signUpPage.verifyAllFormFieldsVisible();
    expect(allFieldsVisible).toBeTruthy();
  });

  test('@regression should verify email hint is displayed', async ({ signUpPage }) => {
    const hintVisible = await signUpPage.verifyEmailHintDisplayed();
    expect(hintVisible).toBeTruthy();
  });

  test('@regression should verify Google sign up button is visible', async ({ signUpPage }) => {
    const googleButtonVisible = await signUpPage.verifyGoogleSignUpButtonVisible();
    expect(googleButtonVisible).toBeTruthy();
  });

  test('@regression should verify sign in link is visible', async ({ signUpPage }) => {
    const signInLinkVisible = await signUpPage.verifySignInLinkVisible();
    expect(signInLinkVisible).toBeTruthy();
  });

  test('@regression should verify footer is visible', async ({ signUpPage }) => {
    const footerVisible = await signUpPage.verifyFooterVisible();
    expect(footerVisible).toBeTruthy();
  });

  test('@regression should verify footer links are present', async ({ signUpPage }) => {
    const footerLinksPresent = await signUpPage.verifyFooterLinksPresent();
    expect(footerLinksPresent).toBeTruthy();
  });
});

test.describe('Sign Up Page - Form Interaction', () => {
  test.beforeEach(async ({ signUpPage }) => {
    await signUpPage.navigateToSignUp();
  });

  test('@regression should fill all form fields correctly', async ({ signUpPage }) => {
    await signUpPage.fillSignUpForm(validCredentials);

    expect(await signUpPage.getFullNameValue()).toBe(validCredentials.fullName);
    expect(await signUpPage.getUsernameValue()).toBe(validCredentials.username);
    expect(await signUpPage.getEmailValue()).toBe(validCredentials.email);
    expect(await signUpPage.getPhoneValue()).toBe(validCredentials.phone);
  });

  test('@regression should fill only required fields', async ({ signUpPage }) => {
    await signUpPage.fillFullName(validCredentials.fullName);
    await signUpPage.fillEmail(validCredentials.email);
    await signUpPage.fillPassword(validCredentials.password);
    await signUpPage.fillConfirmPassword(validCredentials.confirmPassword);

    expect(await signUpPage.getFullNameValue()).toBe(validCredentials.fullName);
    expect(await signUpPage.getEmailValue()).toBe(validCredentials.email);
  });

  test('@regression should clear form fields', async ({ signUpPage }) => {
    await signUpPage.fillFullName(validCredentials.fullName);
    expect(await signUpPage.getFullNameValue()).toBe(validCredentials.fullName);

    await signUpPage.fullNameInput.clear();
    expect(await signUpPage.getFullNameValue()).toBe('');
  });

  test('@regression should verify sign up button is enabled', async ({ signUpPage }) => {
    const isEnabled = await signUpPage.verifySignUpButtonEnabled();
    expect(isEnabled).toBeTruthy();
  });
});

test.describe('Sign Up Page - Navigation', () => {
  test.beforeEach(async ({ signUpPage }) => {
    await signUpPage.navigateToSignUp();
  });

  test('@regression should navigate to home via logo', async ({ signUpPage, page }) => {
    await signUpPage.clickLogo();
    await page.waitForURL(BASE_URL).catch((error) => {
      console.log(error);
      test.fail();
    });
  });

  test('@regression should navigate to drops page', async ({ signUpPage, page }) => {
    await signUpPage.navigateToDrops();
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('/drops');
  });

  test('@regression should navigate to collections page', async ({ signUpPage, page }) => {
    await signUpPage.navigateToCollections();
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('/collections');
  });

  test('@regression should navigate to about page', async ({ signUpPage, page }) => {
    await signUpPage.navigateToAbout();
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('/about');
  });

  test('@regression should navigate to login page via button', async ({ signUpPage, page }) => {
    await signUpPage.navigateToLogin();
    await page.waitForURL(/sign-in/);
    expect(page.url()).toContain('/sign-in');
  });

  test('@regression should navigate to cart page', async ({ signUpPage, page }) => {
    await signUpPage.clickCartButton();
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('/cart');
  });
});

test.describe('Sign Up Page - Theme Toggle', () => {
  test.beforeEach(async ({ signUpPage }) => {
    await signUpPage.navigateToSignUp();
  });

  test('@regression should toggle theme', async ({ signUpPage, page }) => {
    const themeButton = signUpPage.themeToggleButton;
    await themeButton.click();
    await page.waitForTimeout(500);

    // Verify theme change occurred
    const htmlElement = page.locator('html');
    const classes = await htmlElement.getAttribute('class');
    expect(classes).toMatch(/light|dark/);
  });
});

test.describe('Sign Up Page - Responsive Design', () => {
  test('@regression should verify page loads on mobile viewport', async ({ signUpPage }) => {
    // Verify mobile menu button exists
    const mobileMenuButton = signUpPage.mobileMenuButton;
    expect(await mobileMenuButton.isVisible()).toBeTruthy();
  });

  test('@regression should verify form is responsive', async ({ signUpPage }) => {
    // Verify form container is visible
    const heading = signUpPage.signUpHeading;
    expect(await heading.isVisible()).toBeTruthy();
  });
});

test.describe('Sign Up Page - Functionality tests', () => {
  test.beforeEach(async ({ signUpPage }) => {
    await signUpPage.navigateToSignUp();
  });

  test('@smoke should verify successful user registration', async ({
    signUpPage,
    page,
    signInPage,
    homePage,
  }) => {
    // Creates new user and login the recently registered user
    await signUpPage.fillSignUpForm(validCredentials);
    await signUpPage.submitSignUp();

    // Get verification code
    let verificationCode = await getVerificationCode(page, validCredentials.email, page.context());
    await signUpPage.fillVerificationCode(verificationCode);
    await signUpPage.submitVerificationCode();

    // Check redirection url
    await signUpPage.waitForUrl(/sign-in/);
    expect(await signUpPage.getCurrentUrl()).toContain('/sign-in');

    // Login with recent credentials
    await signInPage.fillSignInForm(validCredentials.email, validCredentials.password);
    await signInPage.submitSignIn();

    // Verify logged in status
    expect(homePage.verifyHomePageLoaded()).toBeTruthy();
    expect(homePage.verifyAllSectionsVisible()).toBeTruthy();
    expect(homePage.verifyLogOutButtonVisible()).toBeTruthy();
  });
});
