"use strict";

var webpack = require('webpack');

module.exports = {
    deploy: {
        entry: "./assets/js/entry.js",
        output: {
            path: "web/static/scripts",
            filename: "base.js",
        },
        module: {
            loaders: [
                { 
                    loader: "babel",
                    test: /\.jsx$|\.js$/,
                    include: [
                        "assets/js"
                    ],
                    query: {
                        presets: ["es2015"],
                    }
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