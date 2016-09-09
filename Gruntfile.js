module.exports = function(grunt) {
    grunt.initConfig({
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: 'test/**/*.js'
            }
        },
        browserify: {
            options: {
                transform: ['flowify', 'require-globify']
            },
            proto: {
                files: {
                    'proto.bundle.js': 'lib/proto.js'
                }
            }
        },
        watch: {
            proto: {
                files: ['lib/**/*.js'],
                tasks: 'browserify:proto'
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.registerTask('test', 'mochaTest');
    grunt.registerTask('default', ['test', 'browserify', 'watch']);
};
