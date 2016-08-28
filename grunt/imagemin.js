module.exports = {
    icons: {
        expand: true,
        cwd: 'src/client/icons',
        src: '**/*.svg',
        dest: 'dist/server/public/static/icons'
    },
    images: {
        expand: true,
        cwd: 'src/client/images',
        src: '**/*',
        dest: 'dist/server/public/static/images'
    }
};
