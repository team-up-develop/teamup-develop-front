module.exports = {
  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "vue", "d.ts"],
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  setupFiles: ["./tests/setup.js"],
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/src/modules/**/*.ts",
    "<rootDir>/src/hooks/**/*.ts",
    "<rootDir>/src/store/**/*.ts",
  ],
  testPathIgnorePatterns: ["/node_modules/"],
  moduleDirectories: ["node_modules"],
  // setupFiles: [''],
  transformIgnorePatterns: ["node_modules"],
};
