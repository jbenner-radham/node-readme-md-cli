import { fileURLToPath } from 'node:url';
import globals from 'globals';
import { includeIgnoreFile } from '@eslint/compat';
import path from 'node:path';
import pluginJs from '@eslint/js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, '.gitignore');

export default [
    includeIgnoreFile(gitignorePath),
    pluginJs.configs.recommended,
    {
        files: ['**/*.js'],
        languageOptions: { globals: globals.node },
        rules: {
            'eqeqeq': ['error', 'smart'],
            'no-unused-vars': ['error', { argsIgnorePattern: '^_$', caughtErrorsIgnorePattern: '^_$' }],
            'sort-keys': ['error', 'asc', { caseSensitive: true, natural: true }]
        }

    },
    {
        files: ['test/**/*.js'],
        languageOptions: {
            globals: { ...globals.node, ...globals.jasmine }
        }
    }
];
