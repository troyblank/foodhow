'use strict';

module.exports = {
    sass: {
        files: ['assets/sass/{,*/}*.{scss,sass}'],
        tasks: ['sass', 'notify:sass']
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
