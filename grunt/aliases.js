'use strict';

module.exports = function (grunt, options) {
    return {
        'default': [
            'sass',
            'webpack',
            'watch'
        ],
        'test': [
            'eslint'
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
