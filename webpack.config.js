module.exports = {
    entry: {
        'question-json-converter': './src/question-json-converter.js'
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist',
        libraryTarget: 'window',
        globalObject: `(typeof self !== 'undefined' ? self : this)`
    },
    mode: 'development',
    resolve: {
        extensions: ['.js']
    }
};