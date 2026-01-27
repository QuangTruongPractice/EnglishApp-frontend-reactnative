module.exports = {
    preset: 'jest-expo',
    transform: {
        '^.+\\.[jt]sx?$': ['babel-jest', { configFile: './babel.config.js' }],
    },
    transformIgnorePatterns: [
        'node_modules/(?!((jest-)?react-native|@react-native(-community)?|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|react-native-paper|@react-native-async-storage/async-storage))'
    ],
    moduleNameMapper: {
        '^react-native-vector-icons/(.*)$': '<rootDir>/node_modules/@expo/vector-icons',
    },
    collectCoverageFrom: [
        '**/*.{js,jsx}',
        '!**/coverage/**',
        '!**/node_modules/**',
        '!**/babel.config.js',
        '!**/jest.setup.js'
    ],
    setupFiles: ['<rootDir>/jest.pre-setup.js'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testMatch: [
        '**/__tests__/**/*.test.js',
        '**/*.test.js'
    ]
};
