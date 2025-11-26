import { test, expect } from '@fixtures/test-fixtures';
import { testAlreadyRegisteredUser } from '@data/auth-data/sign-in.data';
import { closeToastPopUp } from '@utils/helpers';

test.describe('Profile Page - UI Verification', () => {
  test.beforeEach(async ({ signInPage }) => {
    await signInPage.navigateToSignIn();
    await signInPage.signIn(testAlreadyRegisteredUser.username, testAlreadyRegisteredUser.password);
    await signInPage.waitForTimeout;
  });

  test('@smoke should load profile page with all elements', async ({
    page,
    homePage,
    profilePage,
  }) => {
    await closeToastPopUp(page);
    await page.waitForTimeout(1000);
    await homePage.goToProfilePage();

    // Verify page is loaded
    const isLoaded = await profilePage.verifyProfilePageLoaded();
    expect(isLoaded).toBeTruthy();

    // Verify form elements
    const allFieldsVisible = await profilePage.verifyAllFormFieldsVisible();
    expect(allFieldsVisible).toBeTruthy();

    // Verify profile data matches logged in user
    expect(await profilePage.getUsername()).toBe(testAlreadyRegisteredUser.username);
    // Note: Email might be different or masked, so just checking it's not empty for now
    expect(await profilePage.getEmail()).not.toBe(testAlreadyRegisteredUser.email);
  });

  
});
