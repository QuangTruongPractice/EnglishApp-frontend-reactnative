module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        'react-native/react-native': true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: [
        'react',
        'react-native',
    ],
    rules: {
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
        'no-unused-vars': 'warn',
        'no-console': 'warn',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    ignorePatterns: [
        'node_modules/',
        '.expo/',
        'babel.config.js',
        'metro.config.js',
    ],
};
