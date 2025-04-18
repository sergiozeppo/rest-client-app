import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import tseslint from 'typescript-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import js from '@eslint/js';
import reactCompiler from 'eslint-plugin-react-compiler';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const normalizeRules = (rules) => {
  const severityMap = {
    0: 'off',
    1: 'warn',
    2: 'error',
  };

  return Object.fromEntries(
    Object.entries(rules).map(([key, value]) => {
      if (typeof value === 'number') {
        return [key, severityMap[value] || value];
      }
      return [key, value];
    })
  );
};

const eslintConfig = [
  {
    ignores: ['dist', 'node_modules'],
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  js.configs.recommended,
  eslintPluginPrettier,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        vi: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        test: 'readonly',
      },
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'react-compiler': reactCompiler,
    },
    rules: {
      ...tseslint.configs.strictTypeChecked.rules,
      ...reactHooks.configs.recommended.rules,
      'react-compiler/react-compiler': 'error',
      ...normalizeRules(react.configs.recommended.rules),
      ...normalizeRules(react.configs['jsx-runtime'].rules),
      'react-refresh/only-export-components': 'off',
      '@next/next/no-img-element': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];

export default eslintConfig;
