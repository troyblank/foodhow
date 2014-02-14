module.exports = function(grunt) {

    grunt.initConfig({
        watch: {
            sass: {
                files: ['sass/{,*/}*.{scss,sass}'],
                tasks: ['sass:dev', 'notify:sass']
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
        notify: {
            sass: {
                options: {
                    title: 'SASS',
                    message: 'SASS has compiled!'
                }
            }
        },
        shell: {
            startServer: {
                command: 'node web/server.js'
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