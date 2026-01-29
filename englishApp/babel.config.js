module.exports = function (api) {
    api.cache(true);
    return {
        presets: [
            ['babel-preset-expo', { disableHermesParser: true }]
        ],
        plugins: [
            ['@babel/plugin-transform-flow-strip-types', { allowDeclareFields: true, all: true }]
        ],
        overrides: [
            {
                test: (filename) => filename && filename.includes('node_modules'),
                plugins: [
                    ['@babel/plugin-transform-flow-strip-types', { allowDeclareFields: true, all: true }]
                ]
            }
        ]
    };
};
