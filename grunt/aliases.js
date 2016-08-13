module.exports = {
    default: [
        'sass',
        'webpack',
        'watch'
    ],
    test: [
        'lint',
        'unit'
    ],
    lint: [
        'sasslint',
        'eslint'
    ],
    unit: 'mocha_istanbul',
    build: [
        'clean',
        'imagemin',
        'sass',
        'webpack'
    ],
    deploy: [
        'build',
        'sshexec',
        'sftp'
    ]
};
