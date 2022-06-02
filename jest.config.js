// jest.config.js
module.exports = {
  collectCoverageFrom: ["<rootDir>/src/**"],
  coveragePathIgnorePatterns: [
    "<rootDir>/src/main.ts",
    "<rootDir>/src/environments/.*",
    "<rootDir>/src/index.html",
  ],
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  transformIgnorePatterns: ["/node_modules/(?!tslib|.*mjs)"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(mjs|js|ts|html|svg)$": "jest-preset-angular",
  },
  extensionsToTreatAsEsm: [".ts"],
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.spec.json",
      stringifyContentPathRegex: "\\.html$",
      useESM: true,
    },
  },
};
