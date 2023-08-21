import { validateRegex } from '#/shared/utils/validations';

describe('Password validation', () => {
  const passwordRegex = validateRegex.password;

  test('should accept valid passwords', () => {
    expect(passwordRegex.test('password1@')).toBe(true);
    expect(passwordRegex.test('passWORD1@')).toBe(true);
    expect(passwordRegex.test('Pa$$w0rd')).toBe(true);
    expect(passwordRegex.test('password with spaces1@')).toBe(true);
  });

  test('should reject passwords that are too short', () => {
    expect(passwordRegex.test('short1@')).toBe(false);
    expect(passwordRegex.test('pass1@')).toBe(false);
    expect(passwordRegex.test('P@ssw0r')).toBe(false);
  });

  test('should reject passwords that do not contain a letter', () => {
    expect(passwordRegex.test('1234567@')).toBe(false);
    expect(passwordRegex.test('1234567@8')).toBe(false);
    expect(passwordRegex.test('@#$%^&*1')).toBe(false);
  });

  test('should reject passwords that do not contain a number', () => {
    expect(passwordRegex.test('password@')).toBe(false);
    expect(passwordRegex.test('Password@')).toBe(false);
    expect(passwordRegex.test('Pa$$word')).toBe(false);
  });

  test('should reject passwords that do not contain a special character', () => {
    expect(passwordRegex.test('password1')).toBe(false);
    expect(passwordRegex.test('Passw0rd')).toBe(false);
    expect(passwordRegex.test('passwordwithspecialcharacters1')).toBe(false);
  });

  test('should reject passwords that contain invalid special characters', () => {
    expect(passwordRegex.test('password1+')).toBe(false);
    expect(passwordRegex.test('password1=')).toBe(false);
  });

  test('should accept passwords with exactly 8 characters', () => {
    expect(passwordRegex.test('pa$sw0r8')).toBe(true);
    expect(passwordRegex.test('PASSWORD')).toBe(false);
  });

  test('should accept passwords longer than 8 characters', () => {
    expect(passwordRegex.test('password123@')).toBe(true);
    expect(
      passwordRegex.test('verylongpasswordwithspecialcharacters1234567890@'),
    ).toBe(true);
  });
});

describe('Username validation', () => {
  const usernameRegex = validateRegex.username;

  test('should accept valid usernames', () => {
    expect(usernameRegex.test('username')).toBe(true);
    expect(usernameRegex.test('user.name')).toBe(true);
    expect(usernameRegex.test('user+name')).toBe(true);
    expect(usernameRegex.test('user_name')).toBe(true);
    expect(usernameRegex.test('user123')).toBe(true);
    expect(usernameRegex.test('USER')).toBe(true);
  });

  test('should accept empty usernames', () => {
    expect(usernameRegex.test('')).toBe(true);
  });

  test('should reject usernames with invalid characters', () => {
    expect(usernameRegex.test('user?name')).toBe(false);
    expect(usernameRegex.test('user&name')).toBe(false);
    expect(usernameRegex.test('user,name')).toBe(false);
    expect(usernameRegex.test('user#name')).toBe(false);
  });

  test('should accept long usernames', () => {
    const longUsername = 'a'.repeat(1000);
    expect(usernameRegex.test(longUsername)).toBe(true);
  });
});
