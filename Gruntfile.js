'use strict';

module.exports = function (grunt) {
    const credentialsPath = 'credentials/config.json',
        privateKeyPath = 'credentials/id_rsa',
        credentials = grunt.file.exists(credentialsPath) ? grunt.file.readJSON(credentialsPath) : null,
        privateKey = grunt.file.exists(privateKeyPath) ? grunt.file.read(privateKeyPath) : null;

    require('load-grunt-config')(grunt, {
        data: {
            credentials: credentials,
            privateKey: privateKey
        }
    });
};
