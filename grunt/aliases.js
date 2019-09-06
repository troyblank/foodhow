module.exports = {
    default: [
        'webpack',
        'watch'
    ],
    test: [
        'unit'
    ],
    unit: 'mocha_istanbul',
    build: [
        'clean',
        'imagemin',
        'webpack',
        'babel',
        'copy'
    ],
    deploy: [
        'build',
        'sshexec:preDeploy',
        'sftp',
        'sshexec:postDeploy'
    ]
};
