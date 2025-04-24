import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import pluginReact from 'eslint-plugin-react';
import pluginSonarjs from 'eslint-plugin-sonarjs';
import pluginSecurity from 'eslint-plugin-security';
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import pluginImport from 'eslint-plugin-import';
import { defineConfig } from 'eslint/config';

export default defineConfig([
    pluginPrettierRecommended,
    {
        files: ['**/*.{js,mjs,cjs}'],
        ...js.configs.recommended,
    },
    {
        ignores: ['node_modules/**/*', './webpack.config.ts'],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 'latest',
            parser: tsParser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
                project: './tsconfig.json',
            },
            sourceType: 'module',
        },
        plugins: {
            security: pluginSecurity,
            sonarjs: pluginSonarjs,
            import: pluginImport,
            'jsx-a11y': pluginJsxA11y,
            '@typescript-eslint': tseslint,
            settings: {
                react: {
                    version: 'detect',
                },
                'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
                'import/resolver': {
                    node: {
                        extensions: ['.js', '.jsx', '.ts', '.tsx'],
                    },
                },
            },
            rules: {
                ...pluginReact.configs.recommended.rules,
                ...pluginJsxA11y.configs.recommended.rules,
                ...tseslint.configs.recommended.rules,
                ...pluginSonarjs.configs.recommended.rules,
                ...pluginSecurity.configs.recommended.rules,

                'security/detect-eval-with-expression': 'error',
                'security/detect-non-literal-regexp': 'error',

                'sonarjs/function-return-type': 'off',
                'sonarjs/no-commented-code': 'warn',
                'sonarjs/no-misused-promises': 'warn',
                'sonarjs/no-unstable-nested-components': 'warn',
                'sonarjs/redundant-type-aliases': 'off',
                'sonarjs/todo-tag': 'warn',

                '@typescript-eslint/consistent-type-imports': 'error',
                '@typescript-eslint/no-unused-vars': 'warn',
                '@typescript-eslint/explicit-function-return-type': 'off',
                '@typescript-eslint/no-explicit-any': 'warn',

                'jsx-a11y/alt-text': 'error',
                'jsx-a11y/anchor-is-valid': 'error',
                'jsx-a11y/no-autofocus': 'warn',
                'jsx-a11y/no-static-element-interactions': 'warn',
                'jsx-a11y/click-events-have-key-events': 'warn',
                'jsx-a11y/label-has-associated-control': [
                    'error',
                    {
                        required: {
                            some: ['nesting', 'id'],
                        },
                    },
                ],

                'react/react-in-jsx-scope': 'off',
                'react/function-component-definition': 'off',
                'react/jsx-props-no-spreading': 'off',
                'react/require-default-props': 'off',
                'react-hooks/exhaustive-deps': 'off',

                camelcase: 'warn',
                'no-console': [
                    'warn',
                    {
                        allow: ['debug', 'warn', 'error'],
                    },
                ],
                'object-curly-spacing': ['error', 'always'],
                'no-param-reassign': [
                    'error',
                    {
                        props: true,
                        ignorePropertyModificationsFor: ['self'],
                    },
                ],
            },
        },
    },
]);
