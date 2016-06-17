/**
 * Created by NICK on 15/11/13.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */


module.exports = function (grunt) {
    grunt.config.set('watch', {
        assets: {
            files: ['client/js/partials/**/*.html'],
            tasks: ['html2js', 'copy']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
};