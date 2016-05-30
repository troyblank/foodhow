'use strict';

module.exports = {
    sass: {
        files: ['sass/{,*/}*.{scss,sass}'],
        tasks: ['sass:dev', 'notify:sass']
    },
    uglify: {
        files: ['assets/js/**/*.js'],
        tasks: ['webpack', 'notify:webpack']
    },
    livereload: {
        options: {
            livereload: true,
        },
        files: [
            'web/static/styles/*.css'
        ]
    }
};