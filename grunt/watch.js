'use strict';

module.exports = {
    sass: {
        files: ['sass/{,*/}*.{scss,sass}'],
        tasks: ['sass:dev', 'notify:sass']
    },
    uglify: {
        files: ['web/static/scripts/*.js', 'web/static/scripts/lib/*.js', 'web/static/scripts/models/*.js', 'web/static/scripts/views/*.js'],
        tasks: ['uglify:dev', 'notify:uglify']
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