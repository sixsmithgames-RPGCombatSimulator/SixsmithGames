import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: ['<rootDir>/tests/jest/**/*.test.ts'],
  testPathIgnorePatterns: ['<rootDir>/tests/playwright/', '<rootDir>/.next/'],
  modulePathIgnorePatterns: ['<rootDir>/.next/'],
  watchPathIgnorePatterns: ['<rootDir>/.next/'],
};

export default createJestConfig(config);
