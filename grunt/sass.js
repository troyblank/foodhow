module.exports = {
    options: {
        outputStyle: 'compressed',
        sourceMap: true
    },

    deploy: {
        expand: true,
        cwd: 'assets/sass',
        src: '**/*.scss',
        dest: 'dist/server/public/static/styles',
        ext: '.css',
        extDot: 'last'
    }
};
