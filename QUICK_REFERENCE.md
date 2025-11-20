# Quick Reference - POM Usage Guide

## 📖 Common Test Patterns

### Pattern 1: Simple Page Verification

```typescript
test('verify sign up page loads', async ({ signUpPage }) => {
  await signUpPage.navigateToSignUp();
  expect(await signUpPage.verifySignUpPageLoaded()).toBeTruthy();
});
```

### Pattern 2: Form Filling & Submission

```typescript
test('complete sign up', async ({ signUpPage }) => {
  await signUpPage.navigateToSignUp();
  await signUpPage.fillSignUpForm(
    'John Doe',
    'johndoe',
    'john@example.com',
    '+1-555-1234',
    'SecurePass123!',
    'SecurePass123!'
  );
  await signUpPage.submitSignUp();
});
```

### Pattern 3: Navigation Testing

```typescript
test('navigate to sign in', async ({ signUpPage, page }) => {
  await signUpPage.navigateToSignUp();
  await signUpPage.clickSignInLink();
  await page.waitForURL(/sign-in/);
  expect(page.url()).toContain('/sign-in');
});
```

### Pattern 4: Data Retrieval & Assertion

```typescript
test('verify form data', async ({ signUpPage }) => {
  await signUpPage.navigateToSignUp();
  await signUpPage.fillEmail('test@example.com');
  const email = await signUpPage.getEmailValue();
  expect(email).toBe('test@example.com');
});
```

### Pattern 5: Using Test Data

```typescript
import { validCredentials } from '@data/sign-in-sign-up-data';

test('sign in with valid credentials', async ({ signInPage }) => {
  await signInPage.navigateToSignIn();
  await signInPage.fillSignInForm(validCredentials.email, validCredentials.password);
  await signInPage.submitSignIn();
});
```

### Pattern 6: Checkbox Operations

```typescript
test('verify remember me checkbox', async ({ signInPage }) => {
  await signInPage.navigateToSignIn();
  await signInPage.checkRememberMe();
  expect(await signInPage.isRememberMeChecked()).toBeTruthy();
});
```

### Pattern 7: Theme Toggle

```typescript
test('toggle light/dark theme', async ({ signUpPage, page }) => {
  await signUpPage.navigateToSignUp();
  await signUpPage.toggleTheme();
  const htmlClass = await page.locator('html').getAttribute('class');
  expect(htmlClass).toBeDefined();
});
```

### Pattern 8: Multi-Step Workflow

```typescript
test('complete registration flow', async ({ signUpPage, page }) => {
  // Step 1: Navigate to sign up
  await signUpPage.navigateToSignUp();

  // Step 2: Verify page loaded
  expect(await signUpPage.verifyAllFormFieldsVisible()).toBeTruthy();

  // Step 3: Fill form
  await signUpPage.fillSignUpForm(
    'Jane Doe',
    'janedoe',
    'jane@example.com',
    '+1-555-5678',
    'SecurePass456!',
    'SecurePass456!'
  );

  // Step 4: Submit
  await signUpPage.submitSignUp();

  // Step 5: Verify success (adjust based on actual response)
  await page.waitForLoadState('networkidle');
});
```

## 🔧 Most Used Methods

### SignUpPage

```typescript
// Navigation
await signUpPage.navigateToSignUp()
await signUpPage.clickSignInLink()
await signUpPage.navigateToDrops()

// Form Filling
await signUpPage.fillFullName('John')
await signUpPage.fillEmail('john@example.com')
await signUpPage.fillPassword('Secure123!')
await signUpPage.fillSignUpForm(...)

// Verification
await signUpPage.verifySignUpPageLoaded()
await signUpPage.verifyAllFormFieldsVisible()
await signUpPage.verifyEmailHintDisplayed()

// Data Retrieval
await signUpPage.getFullNameValue()
await signUpPage.getEmailValue()
```

### SignInPage

```typescript
// Navigation
await signInPage.navigateToSignIn();
await signInPage.clickSignUpLink();
await signInPage.clickForgotPassword();

// Form Operations
await signInPage.fillSignInForm(email, password);
await signInPage.checkRememberMe();
await signInPage.submitSignIn();

// Complete Sign In
await signInPage.signIn(email, password, (rememberMe = false));

// Verification
await signInPage.verifySignInPageLoaded();
await signInPage.verifyAllFormFieldsVisible();
await signInPage.isRememberMeChecked();
```

## 🏷️ Test Tags

Run tests by tag:

```bash
# Run smoke tests only
npm test --grep @smoke

# Run regression tests
npm test --grep @regression

# Run skipped tests
npm test --grep @wip
```

Available tags in tests:

- `@smoke` - Critical functionality tests
- `@regression` - Full regression suite
- `@wip` - Work in progress (skipped)

## 🌐 Running Tests by Browser

```bash
# Chrome
npm run test:chrome

# Firefox
npm run test:firefox

# Safari
npm run test:webkit

# All mobile
npm run test:mobile

# All tests
npm test
```

## 📱 Mobile Testing

Tests automatically run on:

- Pixel 5 (Android)
- iPhone 12 (iOS)
- Desktop viewports (Chromium, Firefox, WebKit)

Adjust viewports in `playwright.config.ts` projects section.

## 🐛 Debugging Tests

### UI Mode

```bash
npm run test:ui
# Opens interactive browser UI for test debugging
```

### Headed Mode

```bash
npm run test:headed
# Shows browser window during test execution
```

### Debug Mode

```bash
npm run test:debug
# Opens Playwright Inspector for step-by-step execution
```

### Generate Selectors

```bash
npx playwright codegen https://dev.nepthic.com/sign-up
# Opens browser to generate selectors for new elements
```

## 📊 Viewing Reports

```bash
# Show HTML report
npm run report

# Report location
./reports/html/index.html
```

Report includes:

- Test execution timeline
- Pass/fail status
- Screenshots on failure
- Videos of failed tests
- Error traces

## 🔍 Accessing Elements

### From SignUpPage

```typescript
const page = signUpPage.page;

// Get elements
const heading = signUpPage.signUpHeading;
const emailInput = signUpPage.emailInput;

// Perform Playwright operations
await heading.scrollIntoViewIfNeeded();
const text = await emailInput.getAttribute('placeholder');
```

### Raw Playwright Usage

```typescript
// Still have access to page object
test('raw playwright', async ({ page }) => {
  await page.goto('/sign-up');
  await page.fill('input[name="email"]', 'test@example.com');
});
```

## 📝 Creating New Test Suites

```typescript
import { test, expect } from '@fixtures/test-fixtures';
import { signUpPage } from '@pages';

test.describe('New Feature Tests', () => {
  test.beforeEach(async ({ signUpPage }) => {
    // Setup
    await signUpPage.navigateToSignUp();
  });

  test('@smoke should test feature', async ({ signUpPage }) => {
    // Your test
  });
});
```

## 🔐 Security

**Never commit credentials:**

```typescript
// ❌ WRONG
const email = 'real@email.com';

// ✅ CORRECT
import { validCredentials } from '@data/sign-in-sign-up-data';
const email = validCredentials.email;

// Or use environment variables
const email = process.env.TEST_EMAIL;
```

## 🚨 Common Issues

### Locator Timeout

```typescript
// Increase timeout for specific locator
await signUpPage.emailInput.fill(email, { timeout: 15000 });

// Or wait for element first
await signUpPage.emailInput.waitFor({ state: 'visible' });
```

### Strict Mode Violation

```typescript
// Use more specific locator
readonly signUpButton = page.getByRole('button', { name: 'Sign Up', exact: true });

// Or use first()
readonly buttons = page.getByRole('button').first();
```

### Network Issues

```typescript
// Wait for network idle
await page.waitForLoadState('networkidle');

// Or specific navigation
await page.waitForURL(/sign-in/);
```

## 📚 Related Documentation

- **POM_DOCUMENTATION.md** - Comprehensive reference
- **playwright.config.ts** - Test configuration
- **Playwright Docs** - https://playwright.dev

## 💡 Tips & Tricks

1. **Use Test Data**: Keep data in `sign-in-sign-up-data.ts`
2. **Reuse Methods**: Page methods are your friends
3. **Add Tags**: Use @smoke, @regression for filtering
4. **Check Reports**: View HTML reports for debugging
5. **Use Codegen**: Generate selectors with Playwright codegen
6. **Update Locators**: Locators change with UI updates
7. **Run Parallel**: Playwright runs tests in parallel by default

## 🎓 Learn More

Read POM_DOCUMENTATION.md for:

- Full method reference
- All available locators
- Best practices
- Troubleshooting
- Future enhancements
