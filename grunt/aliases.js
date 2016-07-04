module.exports = {
    default: [
        'sass',
        'webpack',
        'watch'
    ],
    test: [
        'eslint',
        'sasslint'
    ],
    build: [
        'sass',
        'webpack'
    ],
    deploy: [
        'sshexec'
    ]
};
