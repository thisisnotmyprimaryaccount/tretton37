const path = require('path');

module.exports = {
    entry: './app/main.ts',
    module: {
        rules: [
            {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [ '.ts' ],
    },
    output: {
        filename: './bundle.js',
        path: path.resolve(__dirname, 'app'),
    },
    devtool: 'inline-source-map'
};