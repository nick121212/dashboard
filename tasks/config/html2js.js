/**
 * Created by NICK on 15/11/13.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */

module.exports = function (grunt) {
    grunt.config.set('html2js', {
        partials: {
            options: {
                base: '',
                module: 'partial_module'
            },
            files: [{
                src: ['public/app/**/*.html'],
                dest: 'public/app/partials.js'
            }]
        }
    });

    grunt.loadNpmTasks('grunt-html2js');
};