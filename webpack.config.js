module.exports = {
    entry: {
        'question-json-converter': './src/question-json-converter.js',
        'presentation-json-converter': './src/presentation-json-converter.js',
        'source-destination-paths': './test/source-destination-paths.js'
    },
    target: 'node',
    output: {
        filename: '[name].js',
        path: __dirname + '/dist',
        libraryTarget: 'umd',
        globalObject: `(typeof self !== 'undefined' ? self : this)`
    },
    mode: 'development',
    resolve: {
        extensions: ['.js']
    }
};