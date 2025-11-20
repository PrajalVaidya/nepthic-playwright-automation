import { timeouts } from '@data/test-data';
import { Page } from '@playwright/test';

export async function getVerificationCode(
  page: Page,
  email: string,
  context: any
): Promise<string> {
  const newPage = await context.newPage();
  let otp;
  await newPage.goto('https://www.yopmail.com');
  await newPage.getByRole('textbox', { name: 'Login' }).fill(email);
  await newPage.getByRole('button', { name: '' }).click();
  await newPage.waitForSelector('iframe[name="ifinbox"]');

  while (
    !(await newPage
      .locator('iframe[name="ifinbox"]')
      .contentFrame()
      .getByRole('button')
      .first()
      .isVisible())
  ) {
    // Refresh the list
    await newPage.getByRole('button', { name: '' }).click();
    await newPage.waitForTimeout(2500);
  }

  await newPage
    .locator('iframe[name="ifinbox"]')
    .contentFrame()
    .getByRole('button')
    .first()
    .click();

  const emailText = await newPage
    .locator('iframe[name="ifinbox"]')
    .contentFrame()
    .getByRole('button')
    .first()
    .textContent();

  if (emailText?.includes('NEPTHIC')) {
    if (
      page
        .locator('iframe[name="ifmail"]')
        .contentFrame()
        .getByText(/[0-9]{6}/)
    ) {
      otp = await newPage
        .locator('iframe[name="ifmail"]')
        .contentFrame()
        .getByText(/[0-9]{6}/)
        .textContent();
    }

    return otp.trim();
  }
  return 'Verification email not found';
}
