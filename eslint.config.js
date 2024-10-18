import pluginPrettier from 'eslint-plugin-prettier';
import pluginTypescript from '@typescript-eslint/eslint-plugin';
import parserTypescript from '@typescript-eslint/parser';

export default [
    {
        ignores: ['archive/**', 'dist/**'],
    },
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: parserTypescript,
        },
        plugins: {
            '@typescript-eslint': pluginTypescript,
            prettier: pluginPrettier,
        },
        rules: {
            'prettier/prettier': 'error',
            '@typescript-eslint/no-unused-vars': [
                'error',
                { argsIgnorePattern: '^_' },
            ],
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
        },
    },
];
