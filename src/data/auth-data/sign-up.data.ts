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

export const testPasswords = {
  weak: '123456',
  valid: 'StrongPass123!',
  mismatch: 'DifferentPass123!',
};

export const signUpFormData = {
  validForm: {
    fullName: validCredentials.fullName,
    username: validCredentials.username,
    email: validCredentials.email,
    phone: validCredentials.phone,
    password: validCredentials.password,
    confirmPassword: validCredentials.confirmPassword,
  },
  mismatchedPasswords: {
    fullName: validCredentials.fullName,
    username: validCredentials.username,
    email: validCredentials.email,
    phone: validCredentials.phone,
    password: validCredentials.password,
    confirmPassword: testPasswords.mismatch,
  },
  weakPassword: {
    fullName: validCredentials.fullName,
    username: validCredentials.username,
    email: validCredentials.email,
    phone: validCredentials.phone,
    password: testPasswords.weak,
    confirmPassword: testPasswords.weak,
  },
};
