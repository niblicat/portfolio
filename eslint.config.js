import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import perfectionist from 'eslint-plugin-perfectionist';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import ts from 'typescript-eslint';
import svelteConfig from './svelte.config.js';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default ts.config(
    includeIgnoreFile(gitignorePath),
    js.configs.recommended,
    ...ts.configs.recommended,
    ...svelte.configs.recommended,
    ...svelte.configs.prettier,
    {
        plugins: { perfectionist },
        languageOptions: {
            globals: { ...globals.browser, ...globals.node },
        },
        rules: {
            // typescript-eslint strongly recommend that you do not use the no-undef lint rule on TypeScript projects.
            // see: https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
            'no-undef': 'off',
            camelcase: ['error', { properties: 'never', ignoreGlobals: true }],
            'no-console': 'warn',
            '@typescript-eslint/no-non-null-assertion': 'error',
            'perfectionist/sort-interfaces': ['error', { type: 'alphabetical', order: 'asc' }],
            'perfectionist/sort-object-types': ['error', { type: 'alphabetical', order: 'asc' }],
        },
    },
    {
        files: ['**/*.{ts,js}'],
        rules: {
            'max-len': [
                'error',
                {
                    code: 120,
                    comments: 100,
                    ignoreStrings: true,
                    ignoreTemplateLiterals: true,
                    ignoreRegExpLiterals: true,
                    ignoreUrls: true,
                },
            ],
        },
    },
    {
        files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
        languageOptions: {
            parserOptions: {
                projectService: true,
                extraFileExtensions: ['.svelte'],
                parser: ts.parser,
                svelteConfig,
            },
        },
    },
    prettierRecommended,
);
