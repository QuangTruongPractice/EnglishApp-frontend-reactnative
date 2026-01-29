module.exports = function (api) {
    const isTest = api.env('test');
    api.cache.using(() => isTest);

    if (isTest) {
        return {
            presets: ['module:@react-native/babel-preset'],
            plugins: [
                ['@babel/plugin-transform-flow-strip-types', { allowDeclareFields: true, all: true }]
            ]
        };
    }

    return {
        presets: ['babel-preset-expo']
    };
};
