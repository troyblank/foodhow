'use strict';

module.exports = {
    options: {
        outputStyle: 'compressed',
        sourceMap: true
    },

    deploy: {
        expand: true,
        cwd: 'sass',
        src: '**/*.scss',
        dest: 'web/static/styles',
        ext: '.css',
        extDot: 'last'
    }
};