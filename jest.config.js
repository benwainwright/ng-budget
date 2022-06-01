// jest.config.js
module.exports = {
  preset: "jest-preset-angular",
  collectCoverageFrom: ["<rootDir>/src/**"],
  coveragePathIgnorePatterns: [
    "<rootDir>/src/main.ts",
    "<rootDir>/src/environments/.*",
    "<rootDir>/src/index.html",
  ],
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  globalSetup: "jest-preset-angular/global-setup",
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.spec.json",
      stringifyContentPathRegex: "\\.html$",
      useESM: true,
    },
  },
};
