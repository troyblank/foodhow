module.exports = {
    deploy: {
        files: {
            './': [
                'dist/**/*'
            ]
        },
        options: {
            path: '<%= ssh.appPath %>',
            host: '<%= ssh.host %>',
            port: '<%= ssh.port %>',
            username: '<%= ssh.username %>',
            privateKey: '<%= privateKey %>',
            showProgress: true,
            createDirectories: true
        }
    }
};
