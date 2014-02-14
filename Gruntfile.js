module.exports = function(grunt) {

    grunt.initConfig({
        watch: {
            sass: {
                files: ['sass/{,*/}*.{scss,sass}'],
                tasks: ['sass:dev', 'notify:sass']
            },
            uglify: {
                files: ['web/static/scripts/*.js'],
                tasks: ['uglify:dev', 'notify:uglify']
            },
            livereload: {
                options: {
                    livereload: true,
                },
                files: [
                    'web/static/styles/*.css'
                ]
            }
        },
        sass: {
            dev: {
                options: {
                    debugInfo: true,
                    sourcemap: true
                },
                files: {
                    'web/static/styles/styles.css': 'sass/styles.scss'
                }
            },
            stage: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'web/static/styles/styles.css': 'sass/styles.scss'
                }
            }
        },
        uglify: {
            dev: {
                files: {
                    'web/static/scripts/base.min.js': ['web/static/scripts/baseUI.js']
                }
            },
            stage: {
                files: {
                    'web/static/scripts/base.min.js': ['web/static/scripts/baseUI.js']
                }
            }
        },
        notify: {
            sass: {
                options: {
                    title: 'SASS',
                    message: 'SASS has compiled!'
                }
            },
            uglify: {
                options: {
                    title: 'Uglify',
                    message: 'Uglify has compiled!'
                }
            }
        }
    });

    grunt.registerTask('default', [
        'sass:dev',
        'watch'
    ]);

    grunt.loadNpmTasks('grunt-contrib-watch');
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
}