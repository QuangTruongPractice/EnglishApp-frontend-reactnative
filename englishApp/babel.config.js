module.exports = function (api) {
    api.cache(true);
    const isTest = api.env('test');
    return {
        presets: [
            isTest ? 'module:metro-react-native-babel-preset' : 'babel-preset-expo'
        ],
        plugins: [
            ['@babel/plugin-transform-flow-strip-types', { allowDeclareFields: true }]
        ]
    };
};
