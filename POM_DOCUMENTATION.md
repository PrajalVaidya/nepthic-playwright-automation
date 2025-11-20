# Page Object Model (POM) Documentation

## Overview

This document describes the Page Object Model structure for the NEPTHIC application's Sign Up and Sign In pages. The POM follows industry best practices for test automation, providing a maintainable and scalable framework for UI automation testing.

## Project Structure

```
src/
├── pages/
│   ├── base-page.ts           # Base class with common page methods
│   ├── sign-up-page.ts        # Sign Up page POM
│   ├── sign-in-page.ts        # Sign In page POM
│   └── index.ts               # Page exports
├── tests/
│   ├── sign-up/
│   │   └── signUp.spec.ts     # Sign Up test suite
│   └── sign-in/
│       └── signIn.spec.ts     # Sign In test suite
├── fixtures/
│   ├── test-fixtures.ts       # Custom test fixtures with POM instances
│   └── url.ts                 # Application URL constants
├── data/
│   ├── test-data.ts           # Common test data
│   ├── sign-in-sign-up-data.ts # Sign In/Sign Up test data
│   └── index.ts               # Data exports
└── utils/
    └── helpers.ts             # Utility helper functions
```

## Page Object Models

### BasePage Class

**File**: `src/pages/base-page.ts`

Base class providing common page functionality:

```typescript
// Common Methods
async goto(path: string): Promise<void>
async getTitle(): Promise<string>
async getCurrentUrl(): Promise<string>
async waitForUrl(urlPattern: string | RegExp): Promise<void>
async reload(): Promise<void>
async goBack(): Promise<void>
async goForward(): Promise<void>
async waitForTimeout(ms: number): Promise<void>
async executeScript<T>(script: string | Function, args?: unknown[]): Promise<T>
```

### SignUpPage Class

**File**: `src/pages/sign-up-page.ts`

Represents the NEPTHIC sign-up/registration page with all form elements and navigation.

#### Key Locators

**Header Navigation:**

- `logo` - NEPTHIC logo
- `dropsLink` - Navigation to Drops page
- `collectionsLink` - Navigation to Collections
- `aboutLink` - Navigation to About page
- `themeToggleButton` - Light/Dark theme toggle
- `profileButton` - User profile button
- `cartButton` - Shopping cart button
- `loginButton` - Login/Sign In button
- `mobileMenuButton` - Mobile menu toggle

**Sign Up Form:**

- `signUpHeading` - "Join NEPTHIC" heading
- `signUpSubHeading` - Form subtitle
- `googleSignUpButton` - Google OAuth button
- `fullNameInput` - Full name input field
- `usernameInput` - Username input field
- `emailInput` - Email input field
- `emailHint` - Email verification hint text
- `phoneInput` - Phone number input field
- `passwordInput` - Password input field
- `confirmPasswordInput` - Confirm password input field
- `signUpSubmitButton` - Sign Up submit button
- `dividerText` - "Or sign up with email" text

**Navigation Links:**

- `signInLink` - Link to Sign In page
- `signInLinkText` - "Already a member?" text

**Footer:**

- `footer` - Footer container
- `footerLogo` - Footer NEPTHIC logo
- `footerDescription` - Footer description text
- `instagramLink` - Instagram link
- `twitterLink` - X (Twitter) link
- `tiktokLink` - TikTok link
- `footerCopyright` - Copyright text

#### Key Methods

```typescript
// Navigation
async navigateToSignUp(): Promise<void>
async clickSignInLink(): Promise<void>
async navigateToDrops(): Promise<void>
async navigateToCollections(): Promise<void>
async navigateToAbout(): Promise<void>
async navigateToLogin(): Promise<void>

// Form Filling
async fillFullName(fullName: string): Promise<void>
async fillUsername(username: string): Promise<void>
async fillEmail(email: string): Promise<void>
async fillPhoneNumber(phone: string): Promise<void>
async fillPassword(password: string): Promise<void>
async fillConfirmPassword(confirmPassword: string): Promise<void>
async fillSignUpForm(fullName, username, email, phone, password, confirmPassword): Promise<void>
async submitSignUp(): Promise<void>

// Interactions
async signUpWithGoogle(): Promise<void>
async toggleTheme(): Promise<void>
async clickProfileButton(): Promise<void>
async clickCartButton(): Promise<void>
async clickLogo(): Promise<void>
async openMobileMenu(): Promise<void>

// Verification
async verifySignUpPageLoaded(): Promise<boolean>
async verifyFullNameFieldVisible(): Promise<boolean>
async verifyAllFormFieldsVisible(): Promise<boolean>
async verifySignUpButtonEnabled(): Promise<boolean>
async verifyFooterVisible(): Promise<boolean>
async verifyFooterLinksPresent(): Promise<boolean>
async verifyEmailHintDisplayed(): Promise<boolean>
async verifyGoogleSignUpButtonVisible(): Promise<boolean>
async verifySignInLinkVisible(): Promise<boolean>

// Data Retrieval
async getFullNameValue(): Promise<string | null>
async getEmailValue(): Promise<string | null>
async getUsernameValue(): Promise<string | null>
async getPhoneValue(): Promise<string | null>
async getSignUpHeadingText(): Promise<string>
```

### SignInPage Class

**File**: `src/pages/sign-in-page.ts`

Represents the NEPTHIC sign-in/login page with form elements and navigation.

#### Key Locators

Similar structure to SignUpPage with sign-in specific elements:

- `signInHeading` - Sign In heading
- `googleSignInButton` - Google OAuth button
- `emailInput` - Email input
- `passwordInput` - Password input
- `rememberMeCheckbox` - Remember me checkbox
- `rememberMeLabel` - Remember me label
- `forgotPasswordLink` - Forgot password link
- `signInSubmitButton` - Sign In submit button
- `signUpLink` - Link to Sign Up page

#### Key Methods

```typescript
// Navigation
async navigateToSignIn(): Promise<void>
async clickSignUpLink(): Promise<void>
async clickForgotPassword(): Promise<void>

// Form Filling
async fillEmail(email: string): Promise<void>
async fillPassword(password: string): Promise<void>
async fillSignInForm(email: string, password: string): Promise<void>

// Checkbox Handling
async checkRememberMe(): Promise<void>
async uncheckRememberMe(): Promise<void>

// Interactions
async submitSignIn(): Promise<void>
async signInWithGoogle(): Promise<void>
async signIn(email: string, password: string, rememberMe?: boolean): Promise<void>

// Verification
async verifySignInPageLoaded(): Promise<boolean>
async verifyEmailFieldVisible(): Promise<boolean>
async verifyPasswordFieldVisible(): Promise<boolean>
async verifyAllFormFieldsVisible(): Promise<boolean>
async verifySignInButtonEnabled(): Promise<boolean>
async verifyForgotPasswordLinkVisible(): Promise<boolean>

// Data Retrieval
async getEmailValue(): Promise<string | null>
async getPasswordValue(): Promise<string | null>
async isRememberMeChecked(): Promise<boolean>
```

## Test Fixtures

**File**: `src/fixtures/test-fixtures.ts`

Custom Playwright test fixtures providing:

```typescript
type TestFixtures = {
  customPage: Page; // Pre-configured page with timeouts
  signUpPage: SignUpPage; // Sign Up POM instance
  signInPage: SignInPage; // Sign In POM instance
};
```

### Usage in Tests

```typescript
import { test, expect } from '@fixtures/test-fixtures';

test('sign up test', async ({ signUpPage }) => {
  await signUpPage.navigateToSignUp();
  await signUpPage.fillSignUpForm(...);
  await signUpPage.submitSignUp();
});
```

## Test Data

**File**: `src/data/sign-in-sign-up-data.ts`

Centralized test data including:

- Valid credentials
- Invalid credentials
- Test emails, passwords, usernames, phone numbers
- Error messages
- Success messages
- Application URLs

## Test Suites

### Sign Up Tests

**File**: `src/tests/sign-up/signUp.spec.ts`

Test categories:

- **UI Verification** - Verify all page elements load correctly
- **Form Interaction** - Test form field population and validation
- **Navigation** - Test navigation links and page transitions
- **Theme Toggle** - Test theme switching functionality
- **Responsive Design** - Test mobile responsiveness

### Sign In Tests

**File**: `src/tests/sign-in/signIn.spec.ts`

Test categories:

- **UI Verification** - Verify all page elements load correctly
- **Form Interaction** - Test form field population and checkbox handling
- **Navigation** - Test navigation links and page transitions
- **Theme Toggle** - Test theme switching functionality
- **Responsive Design** - Test mobile responsiveness

## Best Practices Implemented

### 1. **Page Object Encapsulation**

- All page elements are private locators
- Public methods expose functionality without exposing implementation details

### 2. **Reusable Components**

- BasePage provides common functionality
- Shared fixtures reduce code duplication

### 3. **Separation of Concerns**

- Pages contain element locators and page interactions
- Tests contain test logic and assertions
- Data files contain test data constants

### 4. **Meaningful Method Names**

- Methods clearly describe their action
- Verification methods begin with "verify"
- Getter methods begin with "get"

### 5. **Type Safety**

- TypeScript provides strong typing
- Custom fixtures provide type-safe page objects

### 6. **Maintainability**

- Locators are centralized and easy to update
- Test data is separated from tests
- Changes to page structure only require POM updates

### 7. **Scalability**

- Easy to add new pages by extending BasePage
- Fixtures can be extended with new page objects
- Test data can be expanded without affecting tests

## Common Usage Patterns

### Basic Navigation and Verification

```typescript
test('should load sign up page', async ({ signUpPage }) => {
  await signUpPage.navigateToSignUp();
  expect(await signUpPage.verifySignUpPageLoaded()).toBeTruthy();
});
```

### Form Filling and Submission

```typescript
test('should submit sign up form', async ({ signUpPage }) => {
  await signUpPage.navigateToSignUp();
  await signUpPage.fillSignUpForm(
    'John Doe',
    'johndoe',
    'john@example.com',
    '555-1234',
    'Password123!',
    'Password123!'
  );
  await signUpPage.submitSignUp();
});
```

### Navigation Testing

```typescript
test('should navigate to sign in page', async ({ signUpPage, page }) => {
  await signUpPage.navigateToSignUp();
  await signUpPage.clickSignInLink();
  await page.waitForURL(/sign-in/);
  expect(page.url()).toContain('/sign-in');
});
```

### Data Retrieval and Verification

```typescript
test('should verify form values', async ({ signUpPage }) => {
  await signUpPage.navigateToSignUp();
  await signUpPage.fillEmail('test@example.com');
  expect(await signUpPage.getEmailValue()).toBe('test@example.com');
});
```

## Running Tests

```bash
# Run all tests
npm test

# Run only sign up tests
npm test signUp.spec.ts

# Run only sign in tests
npm test signIn.spec.ts

# Run tests with @smoke tag
npm test --grep @smoke

# Run tests in UI mode
npm run test:ui

# Run tests in headed mode
npm run test:headed
```

## Future Enhancements

1. Add more page objects for additional pages (Drops, Collections, Dashboard)
2. Implement API fixtures for backend testing
3. Add visual regression testing
4. Implement performance testing
5. Add accessibility testing
6. Create utility functions for common assertions
7. Implement data-driven testing with external data sources

## Troubleshooting

### Locator Issues

- Check if page structure has changed
- Verify selectors using Playwright Inspector: `npx playwright codegen`
- Update locators in POM and tests accordingly

### Test Timeouts

- Increase timeout values in playwright.config.ts
- Add additional wait conditions in tests
- Check if elements are hidden or disabled

### Navigation Issues

- Verify BASE_URL in configuration
- Check URL patterns in wait conditions
- Ensure navigation URLs are correct in url.ts

## References

- [Playwright Documentation](https://playwright.dev)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
