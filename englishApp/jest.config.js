module.exports = {
    preset: 'jest-expo',

    transform: {
        '^.+\\.[jt]sx?$': ['babel-jest', { configFile: './babel.config.js' }],
    },

    transformIgnorePatterns: [
        'node_modules/(?!(jest-)?react-native|@react-native|expo(nent)?|@expo(nent)?/.*|@expo/vector-icons|@react-navigation|react-navigation|@react-native-async-storage/async-storage|react-native-paper|react-native-webview)',
    ],

    moduleNameMapper: {
        '^react-native-vector-icons/(.*)$': '<rootDir>/node_modules/react-native-vector-icons/$1',
    },

    collectCoverageFrom: [
        '**/*.{js,jsx}',
        '!**/coverage/**',
        '!**/node_modules/**',
        '!**/babel.config.js',
        '!**/jest.setup.js',
    ],

    setupFiles: ['<rootDir>/jest.pre-setup.js'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

    testMatch: [
        '**/__tests__/**/*.test.js',
        '**/*.test.js',
    ],
};
