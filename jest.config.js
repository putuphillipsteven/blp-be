/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  testMatch: ['./src/test/user.test.ts'], // Adjust to match your folder structure
  setupFiles: ['<rootDir>/jest.setup.js'],
};