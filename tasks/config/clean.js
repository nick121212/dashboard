/**
 * Created by NICK on 15/11/13.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */

module.exports = function (grunt) {
    grunt.config.set('clean', {
        dest: {
            src: ["public/build", "public/admin"]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
};