module.exports = {
    sass: {
        files: ['src/client/sass/{,*/}*.{scss,sass}'],
        tasks: ['sass', 'notify:sass']
    },
    webpack: {
        files: ['src/client/js/**/*.js', 'src/client/js/**/*.scss'],
        tasks: ['webpack', 'notify:webpack']
    },
    copy: {
        files: ['recipes/*.json'],
        tasks: ['copy', 'notify:copy']
    },
    livereload: {
        options: {
            livereload: true
        },
        files: [
            'web/static/styles/*.css'
        ]
    }
};
