/**
 * Created by NICK on 15/11/13.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */


module.exports = function (grunt) {
    grunt.config.set('uglify', {
        options: {
            sourceMap: false
        },
        common: {
            files: [{
                expand: true,
                cwd: 'public/build/',
                src: '*.js',
                dest: 'public/build/'
            }]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
};