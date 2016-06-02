'use strict';

module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-browser-sync');


    grunt.initConfig({
        sass: {
            dev: {
                files: [{
                    expand: true,
                    cwd: 'app/styles',
                    src: ['main.scss'],
                    dest: 'app/styles',
                    ext: '.css'
                }]
            },

            prod: {
                files: [{
                    expand: true,
                    cwd: 'app/styles',
                    src: ['main.scss'],
                    dest: 'build/styles',
                    ext: '.css'
                }]
            }
        },

        wiredep: {
            dev: {
                src: ['app/index.html'],

                options: {
                    directory: 'app/bower_components'
                }
            },

            prod: {
                src: ['build/index.html'],

                options: {
                    directory: 'build/bower_components'
                }
            }
        },

        concat: {
            prod: {
                src: ['app/scripts/**/*.js'],
                dest: 'build/scripts/main.js'
            }
        },

        copy: {
            prod: {
                files: [{
                    expand: true,
                    cwd: 'app/bower_components',
                    src: '**',
                    dest: 'build/bower_components'
                }, {
                    expand: true,
                    cwd: 'app/img',
                    src: '**',
                    dest: 'build/img'
                }]
            },

            dev: {
                files: [{
                    expand: true,
                    cwd: 'bower_components',
                    src: '**',
                    dest: 'app/bower_components'
                }]
            },
        },

        htmlmin: {
            prod: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: 'app/views',
                    src: '**/*.html',
                    dest: 'build/views'
                }]
            }
        },

        bower: {
            install: {
                options: {
                    copy: false
                }
            }
        },

        watch: {
            bower: {
                files: 'bower.json',
                tasks: ['wiredep']
            },

            css: {
                files: '**/*.scss',
                tasks: ['sass:dev']
            }
        },

        browserSync: {
            prod: {
                options: {
                    server: {
                        baseDir: "build/"
                    }
                }
            },

            dev: {
                bsFiles: {
                    src: ['app/styles/*.css', 'app/views/**/*.html', 'app/*.html']
                },
                options: {
                    server: {
                        baseDir: "app/"
                    }
                }
            }
        }
    });
    grunt.registerTask('build-prod', ['htmlmin:prod', 'sass:prod', 'copy:prod', 'concat:prod', 'wiredep:prod', 'browserSync:prod']);
    grunt.registerTask('build-dev', ['bower', 'copy:dev', 'wiredep:dev']);
    grunt.registerTask('run-server', ['browserSync:dev']);
    grunt.registerTask('watch-sass', ['watch:css']);
};
