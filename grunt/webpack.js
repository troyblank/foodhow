const webpack = require('webpack');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicConfig = require('../src/isomorphic/webpackIsomorphicToolsConfiguration');
const webpackIsomorphic = new WebpackIsomorphicToolsPlugin(webpackIsomorphicConfig);

module.exports = (grunt) => {
    const env = JSON.stringify(grunt.option('environment') || 'development');

    return {
        deploy: {
            entry: './src/client/js/main.js',
            output: {
                path: 'dist/server/public/static/scripts',
                filename: 'base.js'
            },
            module: {
                loaders: [
                    {
                        test: /\.jsx$|\.js$/,
                        loader: 'babel',
                        include: [
                            'src/client/js',
                            'node_modules/@troyblank/food-how-components'
                        ],
                        query: {
                            presets: ['react', 'es2015']
                        }
                    },
                    {
                        test: /\.scss$/,
                        loaders: [
                            'style',
                            'css?modules&sourceMap',
                            'sass'
                        ],
                        include: [
                            'src/client',
                            'node_modules/@troyblank/food-how-components'
                        ]
                    },
                    {
                        test: webpackIsomorphic.regular_expression('images'), loader: 'url-loader?limit=10240'
                    }
                ]
            },
            plugins: [
                new webpack.DefinePlugin({
                    'process.env': {
                        NODE_ENV: env
                    }
                }),
                new webpack.optimize.UglifyJsPlugin({
                    comments: false,
                    compress: {
                        warnings: false
                    }
                }),
                webpackIsomorphic.development()
            ]
        }
    };
};
