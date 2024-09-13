module.exports = {
  testEnvironment: 'jsdom',
  testMatch: [
      '<rootDir>src/umbrella-times/tests/unit/**/*.test.{js,jsx}'
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    '^.+\\.(css|less|scss|sass)$': 'jest-transform-stub',
    '^.+\\.(svg)$': 'jest-transform-stub',
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/src/umbrella-times/tests/unit/_mocks/fileMock.js',
  },
  testPathIgnorePatterns: [
    "/node_modules/",
    "/src/umbrella-times/tests/e2e/"
  ],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  roots: ['<rootDir>/src/umbrella-times/tests/unit/'],
  setupFilesAfterEnv: ['<rootDir>/src/umbrella-times/tests/setupTests.js'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/umbrella-times/**/*.{js,jsx,ts,tsx}',
    '!src/umbrella-times/**/*.d.ts',
    '!src/umbrella-times/resources**/*.{js,jsx,ts,tsx}',
    '!src/umbrella-times/contracts/**/*.{js,jsx,ts,tsx}',
    '!src/umbrella-times/utils/**/*.{js,jsx,ts,tsx}',
    '!src/main.jsx',
    '!src/**/index.js',
    '!src/umbrella-times/features/utils/**/*.{js,jsx,ts,tsx}',
    '!src/umbrella-times/features/business/styles/**/*.{js,jsx,ts,tsx}',
    '!src/umbrella-times/tests/unit/_mocks/**/*.{js,jsx,ts,tsx}',
  ],
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 75,
      lines: 75,
      statements: 75,
    },
  },
};
