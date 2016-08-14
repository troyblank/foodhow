module.exports = {
    dist: {
        files: [
            {
                expand: true,
                src: 'webpack-assets.json',
                dest: 'dist/server'
            },
            {
                expand: true,
                src: 'recipes/**',
                dest: 'dist/server'
            },
            {
                expand: true,
                cwd: 'src',
                src: 'server/templates/**',
                dest: 'dist'
            }
        ]
    }
};
