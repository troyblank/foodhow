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
        'imagemin',
        'sass',
        'webpack'
    ],
    deploy: [
        'sshexec'
    ]
};
