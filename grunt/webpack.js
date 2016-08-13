const webpack = require('webpack');

module.exports = (grunt) => {
    const env = JSON.stringify(grunt.option('environment') || 'development');

    return {
        deploy: {
            entry: './assets/js/main.js',
            output: {
                path: 'public/static/scripts',
                filename: 'base.js'
            },
            module: {
                loaders: [
                    {
                        test: /\.jsx$|\.js$/,
                        loader: 'babel',
                        include: [
                            'assets/js',
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
                            'assets',
                            'node_modules/@troyblank/food-how-components'
                        ]
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
                })
            ]
        }
    };
};
