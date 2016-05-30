"use strict";

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
        }
    }
};