/**
 * Created by NICK on 15/11/13.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */

module.exports = function (grunt) {
    grunt.config.set('autoprefixer', {
        options: {
            browsers: [
                "Android 2.3",
                "Android >= 4",
                "Chrome >= 20",
                "Firefox >= 24",
                "Explorer >= 8",
                "iOS >= 6",
                "Opera >= 12",
                "Safari >= 6"
            ],
            safe: true,
            map: true
        },
        core: {
            options: {
                map: true
            },
            src: 'build/css/msi.min.css'
        }
    });

    grunt.loadNpmTasks('grunt-autoprefixer');

};