import { chromium, Page } from '@playwright/test';
import { validCredentials } from '@data/auth-data/sign-up.data';
import { getVerificationCode } from '@utils/get-verification-code.helper';
import { SignUpPage } from '@pages/sign-up-page';
import { SignInPage } from '@pages/sign-in-page';
import { testAlreadyRegisteredUser } from '@data/auth-data/sign-in.data';
import { BASE_URL } from '@fixtures/url';
import dotenv from 'dotenv';

dotenv.config();

async function createUser(formData: object, page: Page) {
  const signUpPage = new SignUpPage(page);
  const signInPage = new SignInPage(page);
  await signUpPage.navigateToSignUp();
  await signUpPage.fillSignUpForm(testAlreadyRegisteredUser);
  await signUpPage.submitSignUp();
  const verificationCode = await getVerificationCode(
    page,
    testAlreadyRegisteredUser.email,
    page.context()
  );
  await signUpPage.fillVerificationCode(verificationCode);
  await signUpPage.submitVerificationCode();
  await signUpPage.waitForUrl(/sign-in/);
  await signInPage.fillSignInForm(
    testAlreadyRegisteredUser.email,
    testAlreadyRegisteredUser.password
  );
  await signInPage.submitSignIn();
  console.log('User created successfully!');
}

async function main() {
  const baseUrl = process.env.BASE_URL || BASE_URL;

  const browser = await chromium.launch({
    headless: false,
  });
  const context = await browser.newContext({
    baseURL: baseUrl,
  });
  const page = await context.newPage();

  try {
    await createUser(testAlreadyRegisteredUser, page);
  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
    await context.close();
    await browser.close();
  }
}

main();
