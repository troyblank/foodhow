module.exports = {
    sass: {
        files: ['assets/sass/{,*/}*.{scss,sass}'],
        tasks: ['sass', 'notify:sass']
    },
    webpack: {
        files: ['assets/js/**/*.js', 'assets/js/**/*.scss'],
        tasks: ['webpack', 'notify:webpack']
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
