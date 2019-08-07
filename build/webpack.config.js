const fs = require('fs');
const path = require('path');
const zipPlugin = require('zip-webpack-plugin');

module.exports = {
    mode: 'production',
    context: path.resolve(__dirname),
    entry: path.join(path.join(__dirname, '../src', 'functions'), 'lambda.handler.ts'),
    output: {
        filename: 'index.js',
        libraryTarget: 'commonjs'
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [['@babel/env', { targets: { node: '8.10' } }]],
                            plugins: [],
                            compact: false,
                            babelrc: false
                        }
                    },
                    'ts-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    optimization: {
        minimize: false,
        namedModules: true
    },
    plugins: [
        new zipPlugin({
            path: path.join(__dirname, '../dist'),
            pathPrefix: '',
            filename: `api.zip`
        })
    ],
    target: 'node',
    node: {
        // Allow these globals.
        __filename: false,
        __dirname: false
    },
    stats: 'errors-only',
    bail: true
};