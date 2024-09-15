const js = require('@eslint/js');
const globals = require('globals');
const react = require('eslint-plugin-react');
const reactHooks = require('eslint-plugin-react-hooks');
const reactRefresh = require('eslint-plugin-react-refresh');
const jest = require('eslint-plugin-jest');

module.exports = {
    ignorePatterns: ['dist'],
    overrides: [
        {
            files: ['src/**/*.{js,jsx}'],
            parserOptions: {
                ecmaVersion: 'latest',
                ecmaFeatures: { jsx: true },
                sourceType: 'module',
            },
            globals: {
                ...globals.browser,
                jest: true,
            },
            settings: {
                react: {
                    version: '18.3',
                },
            },
            plugins: [
                'react',
                'react-hooks',
                'react-refresh',
                'jest',
            ],
            rules: {
                ...js.configs.recommended.rules,
                ...react.configs.recommended.rules,
                ...react.configs['jsx-runtime'].rules,
                ...reactHooks.configs.recommended.rules,
                ...jest.configs.recommended.rules,
                'react/jsx-no-target-blank': 'off',
                'react-refresh/only-export-components': [
                    'warn',
                    { allowConstantExport: true },
                ],
                "react/prop-types": "off",
            },
        },
    ],
};
