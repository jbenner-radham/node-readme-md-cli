import { includeIgnoreFile } from '@eslint/compat';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import radham from '@radham/eslint-config';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const gitignorePath = path.resolve(dirname, '.gitignore');

export default defineConfig([
  includeIgnoreFile(gitignorePath),
  {
    files: ['**/*.{js,ts}'],
    extends: [radham],
    languageOptions: { globals: globals.node }
  },
  {
    files: ['**/*.json'],
    plugins: { json },
    language: 'json/json',
    extends: ['json/recommended']
  },
  {
    files: ['tsconfig.json'],
    plugins: { json },
    language: 'json/json5',
    extends: ['json/recommended']
  },
  {
    files: ['**/*.md'],
    plugins: { markdown },
    language: 'markdown/gfm',
    extends: ['markdown/recommended']
  }
]);
