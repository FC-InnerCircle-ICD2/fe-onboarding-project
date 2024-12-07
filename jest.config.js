export default {
    transform: {
      "^.+\\.jsx?$": "babel-jest"
    },
    testMatch: ["<rootDir>/js/tests/**/*.test.js"],
    moduleNameMapper: {
      '\\.(css|less)$': 'identity-obj-proxy'
    },
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  };