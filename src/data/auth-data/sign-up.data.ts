export const validCredentials = {
  fullName: 'John Doe',
  username: 'johndoe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
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
