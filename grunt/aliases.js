'use strict';

module.exports = function (grunt, options) {
    return {
        'default': [
            'sass',
            'webpack',
            'watch'
        ],
        'build': [
            'sass',
            'webpack'
        ],
        'deploy': [
            'sshexec'
        ]
    };
};