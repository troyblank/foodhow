module.exports = {
    preDeploy: {
        command: '<%= ssh.preCommands %>',
        options: {
            host: '<%= ssh.host %>',
            port: '<%= ssh.port %>',
            username: '<%= ssh.username %>',
            privateKey: '<%= privateKey %>'
        }
    },
    postDeploy: {
        command: '<%= ssh.postCommands %>',
        options: {
            host: '<%= ssh.host %>',
            port: '<%= ssh.port %>',
            username: '<%= ssh.username %>',
            privateKey: '<%= privateKey %>'
        }
    }
};
