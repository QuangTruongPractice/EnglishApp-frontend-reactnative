module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            ['@babel/plugin-syntax-flow', { all: true }],
            ['@babel/plugin-transform-flow-strip-types', { allowDeclareFields: true, all: true }]
        ],
        overrides: [
            {
                test: /[\\/]node_modules[\\/]/,
                plugins: [
                    ['@babel/plugin-transform-flow-strip-types', { allowDeclareFields: true, all: true }]
                ]
            }
        ]
    };
};
