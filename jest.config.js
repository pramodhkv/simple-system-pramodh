module.exports = {
  testEnvironment: "jsdom",
  rootDir: "src",
  testMatch: [
    "<rootDir>/__tests__/**/*.{test,spec}.(ts|tsx|js|jsx)",
    "<rootDir>/**/*.{test,spec}.(ts|tsx|js|jsx)",
    "<rootDir>/**/**/*.{test,spec}.(ts|tsx|js|jsx)",
  ],
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
  },
};
