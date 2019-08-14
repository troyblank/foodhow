module.exports = {
    default: [
        'webpack',
        'watch'
    ],
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
