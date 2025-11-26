import { test, expect } from '@fixtures/test-fixtures';
import { validCredentials } from '@data/auth-data/sign-up.data';
import { BASE_URL } from '@fixtures/url';
import { getVerificationCode } from '@utils/get-verification-code.helper';

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
  const verificationCode = await getVerificationCode(page, validCredentials.email, page.context());
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
