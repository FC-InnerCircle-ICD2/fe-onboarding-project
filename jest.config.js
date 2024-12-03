export default {
    transform: {
      "^.+\\.jsx?$": "babel-jest"
    },
    testEnvironment: 'node',
    testMatch: ["<rootDir>/js/test/**/*.test.js"],
    moduleNameMapper: {
      '\\.(css|less)$': 'identity-obj-proxy'
    }
  };