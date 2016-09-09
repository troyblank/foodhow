'use strict';

module.exports = function (grunt) {
    const sshPath = 'ssh/config.json',
        ssh = grunt.file.exists(sshPath) ? grunt.file.readJSON(sshPath) : null,
        privateKey = (ssh && grunt.file.exists(ssh.privateKeyPath)) ? grunt.file.read(ssh.privateKeyPath) : null;

    require('load-grunt-config')(grunt, {
        data: {
            ssh,
            privateKey,
        }
    });
};
