require('dotenv').config();

module.exports = {
  setupFiles: ['dotenv/config'],
  testEnvironment: 'jest-environment-jsdom',
  testEnvironmentOptions: {
    html: '<html lang="en"></html>',
    url: 'http://localhost:3000',
    userAgent: 'Agent/007',
  },
  testPathIgnorePatterns: ['/node_modules/', '/config/'],
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js',
  },
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
};
