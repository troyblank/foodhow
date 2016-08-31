const webpack = require('webpack');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicConfig = require('../src/isomorphic/webpackIsomorphicToolsConfiguration');
const webpackIsomorphic = new WebpackIsomorphicToolsPlugin(webpackIsomorphicConfig);
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (grunt) => {
    /* eslint-disable no-var */
    var styleLoader, webpackIsomorphicToolsPlugin;
    /* eslint-enable no-var */
    const env = grunt.option('environment') || 'development';
    const isProduction = 'production' === env;

    // this could be improved by going to webpack.babel.js and using webpack-config-utils
    if (isProduction) {
        webpackIsomorphicToolsPlugin = webpackIsomorphic;
        styleLoader = {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract(
                'style',
                'css?modules&sourceMap!sass'
            ),
            include: [
                'src/client',
                'node_modules/@troyblank/food-how-components'
            ]
        };
    } else {
        webpackIsomorphicToolsPlugin = webpackIsomorphic.development();
        styleLoader = {
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
        };
    }

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
                    styleLoader,
                    {
                        test: webpackIsomorphic.regular_expression('images'), loader: 'url-loader?limit=10240'
                    }
                ]
            },
            plugins: [
                new webpack.DefinePlugin({
                    'process.env': {
                        NODE_ENV: JSON.stringify(env)
                    }
                }),
                new webpack.optimize.UglifyJsPlugin({
                    comments: false,
                    compress: {
                        warnings: false
                    }
                }),
                new ExtractTextPlugin('../styles/[name]-[chunkhash].css'),
                webpackIsomorphicToolsPlugin
            ]
        }
    };
};
