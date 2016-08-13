module.exports = {
    deploy: {
        command: '<%= ssh.command %>',
        options: {
            host: '<%= ssh.host %>',
            port: '<%= ssh.port %>',
            username: '<%= ssh.username %>',
            privateKey: '<%= privateKey %>'
        }
    }
};
