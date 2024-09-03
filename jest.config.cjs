module.exports = {
  testEnvironment: 'jsdom',
  testMatch: [
      '<rootDir>src/tests/unit/**/*.test.{js,jsx}'
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    '^.+\\.(css|less|scss|sass)$': 'jest-transform-stub',
    '^.+\\.(svg)$': 'jest-transform-stub',
  },
  testPathIgnorePatterns: [
    "/node_modules/",
    "/src/tests/e2e/"
  ],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  roots: ['<rootDir>/src/tests/unit/'],
  setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.js'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/resources**/*.{js,jsx,ts,tsx}',
    '!src/contracts/**/*.{js,jsx,ts,tsx}',
    '!src/utils/**/*.{js,jsx,ts,tsx}',
    '!src/main.jsx',
    '!src/**/index.js',
    '!src/features/utils/**/*.{js,jsx,ts,tsx}',
    '!src/features/business/styles/**/*.{js,jsx,ts,tsx}',
    '!src/tests/unit/_mocks/**/*.{js,jsx,ts,tsx}',
  ],
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 75,
      lines: 75,
      statements: 75,
    },
  },
};
