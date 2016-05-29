'use strict';

module.exports = function (grunt, options) {
    return {
        'default': [
            'sass',
            'uglify:dev',
            'watch'
        ],
        'build': [
            'sass',
            'uglify:prod'
        ],
        'deploy': [
            'sshexec'
        ]
    };
};