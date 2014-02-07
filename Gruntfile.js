module.exports = function(grunt){

    grunt.initConfig({
        watch:{
            sass: {
                files: ['sass/{,*/}*.{scss,sass}'],
                tasks: ['sass:dev', 'notify:sass']
            },
            livereload: {
                options:{
                    livereload:true,
                },
                files: [
                    'website/styles/*.css'
                ]
            }
        },
        sass: {
            dev: {
                options:{
                    debugInfo: true,
                    sourcemap: true
                },
                files: {
                    'web/styles/styles.css': 'sass/styles.scss'
                }
            },
            stage: {
                options:{
                    style: 'compressed'
                },
                files: {
                    'web/styles/styles.css': 'sass/styles.scss'
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
        }
    });

    grunt.registerTask('default', [
        'watch',
        'sass:dev',
    ]);

    grunt.loadNpmTasks('grunt-contrib-watch');
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
}