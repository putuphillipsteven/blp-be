/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node", // Node.js environment
  transform: {
    "^.+\\.ts$": "ts-jest", // Use ts-jest for TypeScript
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"], // Recognize these extensions
  testMatch: [
    "**/src/test/**/*.test.ts", // Matches all .test.ts files in src/test
  ],
  setupFiles: ['<rootDir>/jest.setup.js'], // Load environment variables
};
