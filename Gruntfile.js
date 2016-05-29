'use strict';

module.exports = function (grunt) {
    require('load-grunt-config')(grunt, {
        data: {
            credentials: grunt.file.readJSON('credentials/config.json')
        }
    });
};