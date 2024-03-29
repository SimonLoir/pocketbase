/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: "ts-jest/presets/js-with-ts-legacy",
    testEnvironment: "node",
    setupFiles: ["./__mocks__/DOM.ts"],
    modulePathIgnorePatterns: ["e2e"],
};
