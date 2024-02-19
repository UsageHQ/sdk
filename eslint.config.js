// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig-base.json", "./packages/*/tsconfig.json"],
        tsconfigRootDir: __dirname,
      },
    },
  },
  {
    ignores: ["**/dist"],
  },
);
