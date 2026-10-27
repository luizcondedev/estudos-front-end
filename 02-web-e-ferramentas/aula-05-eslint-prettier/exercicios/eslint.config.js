import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";

export default defineConfig([
  js.configs.recommended,
  {
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      eqeqeq: "error",
      "prefer-const": "error",
    },
  },
]);
