module.exports = function (api) {
    const isTest = api.env('test');
    api.cache.using(() => isTest);
    return {
        presets: [
            isTest ? 'module:metro-react-native-babel-preset' : 'babel-preset-expo'
        ],
        plugins: [
            ['@babel/plugin-transform-flow-strip-types', { allowDeclareFields: true }]
        ]
    };
};
