import { faker } from '@faker-js/faker';
/**
 * Sign Up and Sign In Test Data
 */
const fullName = faker.person.fullName();
const email =
  fullName
    .trim()
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]/g, '') +
  faker.number.int(10000) +
  '@yopmail.com';


export const validCredentials = {
  fullName: fullName,
  username: faker.internet.username().replace(/[^a-zA-Z0-9]/g, ''),
  email: email,
  phone: faker.phone.number({ style: 'international' }),
  password: 'SecurePassword123!',
  confirmPassword: 'SecurePassword123!',
};

export const testSignUpVerificationCodeUser = {
  fullName: 'test',
  username: 'test',
  email: 'testuser@yopmail.com',
  phone: faker.phone.number({ style: 'international' }),
  password: 'test@123',
  confirmPassword: 'test@123',
};

export const invalidCredentials = {
  email: 'invalid@example.com',
  password: 'WrongPassword123!',
};

export const testEmails = {
  valid: 'test.user@example.com',
  invalid: 'notanemail',
  unregistered: 'unregistered@example.com',
};

export const testPasswords = {
  weak: '123456',
  valid: 'StrongPass123!',
  mismatch: 'DifferentPass123!',
};

export const testUsernames = {
  valid: 'testuser123',
  taken: 'johndoe',
  invalid: 'user@name',
};

export const testPhoneNumbers = {
  valid: '+1 (555) 987-6543',
  invalid: '123',
  us: '(555) 123-4567',
};

export const testNames = {
  valid: 'Jane Smith',
  short: 'J',
  long: 'j'.repeat(50),
  specialChars: "Jean-Pierre O'Brien",
};

export const signInFormData = {
  validForm: {
    email: validCredentials.email,
    password: validCredentials.password,
  },
  invalidForm: {
    email: invalidCredentials.email,
    password: invalidCredentials.password,
  },
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
