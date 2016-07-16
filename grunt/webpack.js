const webpack = require('webpack');

module.exports = {
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
                        'assets/sass',
                        'node_modules/@troyblank/food-how-components'
                    ]
                }
            ]
        },
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                comments: false,
                compress: {
                    warnings: false
                }
            })
        ]
    }
};
