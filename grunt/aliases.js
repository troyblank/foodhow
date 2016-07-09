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
        'sass',
        'webpack'
    ],
    deploy: [
        'sshexec'
    ]
};
