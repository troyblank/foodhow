'use strict';

module.exports = function (grunt) {
    const sshPath = 'ssh/config.json',
        privateKeyPath = 'ssh/id_rsa',
        ssh = grunt.file.exists(sshPath) ? grunt.file.readJSON(sshPath) : null,
        privateKey = grunt.file.exists(privateKeyPath) ? grunt.file.read(privateKeyPath) : null;

    require('load-grunt-config')(grunt, {
        data: {
            ssh,
            privateKey,
        }
    });
};
