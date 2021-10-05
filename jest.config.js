module.exports = {
  testIgnorePatterns: ["/node_modules/", "/./next/"],
  setupFilesAfterEnv: ["<rootDir>/src/tests/setupFilesAfterEnv.ts"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
  },
  testEnvironment: "jsdom",
};
