module.exports = {
    options: {
        sourceMap: true
    },
    dist: {
        files: [
            { expand: true,
              cwd: 'src/server',
              src: '**/*.js*',
              dest: 'dist/server'
            },
            { expand: true,
              cwd: 'src/isomorphic',
              src: '**/*.js*',
              dest: 'dist/isomorphic'
            }
        ]
    }
};
