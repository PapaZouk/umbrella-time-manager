module.exports = {
  testEnvironment: 'jsdom',
  testMatch: [
      '<rootDir>src/umbrella-times/tests/unit/**/*.test.{js,jsx}',
      '<rootDir>src/umbrella-web-common/tests/unit/**/*.test.{js,jsx}'
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
  roots: [
      '<rootDir>/src/umbrella-times/tests/unit/',
      '<rootDir>/src/umbrella-web-common/tests/unit/',
  ],
  setupFilesAfterEnv: ['<rootDir>/src/umbrella-times/tests/setupTests.js'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/umbrella-times/src/**/*.{js,jsx}',
    'src/umbrella-web-common/src/**/*.{js,jsx}',
    '!src/umbrella-times/src/**/*.d.ts',
    '!src/umbrella-times/src/resources**/*.{js,jsx}',
    '!src/umbrella-times/src/contracts/**/*.{js,jsx}',
    '!src/umbrella-times/src/features/utils/**/*.{js,jsx}',
    '!src/main.jsx',
    '!src/**/index.js',
    '!src/umbrella-times/src/features/utils/**/*.{js,jsx}',
    '!src/umbrella-times/src/features/business/styles/**/*.{js,jsx}',
    '!src/umbrella-times/tests/unit/_mocks/**/*.{js,jsx}',
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
