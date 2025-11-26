import { faker } from '@faker-js/faker';

export const validCredentials = {
  fullName: 'test',
  username: 'test',
  email: 'testuser@yopmail.com',
  phone: faker.phone.number({ style: 'international' }),
  password: 'test@123',
  confirmPassword: 'test@123',
};
export const testAlreadyRegisteredUser = {
  fullName: 'test',
  username: 'test',
  email: 'testuser@yopmail.com',
  phone: faker.phone.number({ style: 'international' }),
  password: 'test-123',
  confirmPassword: 'test@123',
};

export const testSignUpVerificationCodeUser = {
  fullName: 'test',
  username: 'test',
  email: 'testuser@yopmail.com',
  phone: faker.phone.number({ style: 'international' }),
  password: 'test@123',
  confirmPassword: 'test@123',
};

export const errorMessages = {
  invalidEmail: 'Please enter a valid email address',
  passwordMismatch: 'Passwords do not match',
  passwordTooWeak: 'Password must be at least 8 characters',
  usernameTaken: 'Username is already taken',
  emailTaken: 'Email is already registered',
  missingField: 'This field is required',
  invalidCredentials: 'Invalid email or password',
};

export const successMessages = {
  signUpSuccess: 'Account created successfully',
  signInSuccess: 'Signed in successfully',
  verificationSent: 'Verification code sent to your email',
};
