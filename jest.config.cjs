/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/src/**/*.test.ts"],
  resolver: "jest-ts-webcompat-resolver",
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/**/index.ts",
    "!src/**/app.ts",
    "!src/server/loadEnvironment.ts",
    "!src/server/database/connectToDatabase.ts",
    "!src/server/database/models/*.ts",
  ],
};
