'use strict';

module.exports = function (grunt) {
    const credentialsPath = 'credentials/config.json',
        credentials = grunt.file.exists(credentialsPath) ? grunt.file.readJSON(credentialsPath) : null;

    require('load-grunt-config')(grunt, {
        data: {
            credentials: credentials
        }
    });
};
