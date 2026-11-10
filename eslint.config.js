import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import svelte from "eslint-plugin-svelte";

export default [
  { ignores: ["dist/", "coverage/", "test-results/", "playwright-report/"] },
  js.configs.recommended,
  ...tseslint.configs.strict.map((c) => ({ ...c, files: ["**/*.ts", "**/*.svelte"] })),
  ...svelte.configs.recommended,
  {
    files: ["**/*.svelte", "**/*.svelte.ts"],
    languageOptions: { globals: globals.browser, parserOptions: { parser: tseslint.parser } }
  },
  {
    files: ["test/**/*.ts", "e2e/**/*.ts", "scripts/**/*.mjs", "*.config.ts", "*.config.js"],
    languageOptions: { globals: globals.node }
  }
];
