module.exports = {
    deploy: {
        command: '<%= credentials.command %>',
        options: {
            host: '<%= credentials.host %>',
            port: '<%= credentials.port %>',
            username: '<%= credentials.username %>',
            privateKey: '<%= privateKey %>'
        }
    }
};
