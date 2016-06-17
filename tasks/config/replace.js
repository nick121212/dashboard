/**
 * Created by NICK on 15/11/13.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */


module.exports = function (grunt) {
    grunt.config.set('replace', {
        
        path:{
            src: ['public/app/partials.js'],
            overwrite: true,
            replacements: [{
                from: 'public/',
                to: ''
            }]
        },
        
        version: {
            src: ['public/build/dashboard.js', 'public/build/index.html'],
            overwrite: true,
            replacements: [{
                from: '@@version',
                to: new Date().valueOf()
            }]
        }
    });

    grunt.loadNpmTasks('grunt-text-replace');
};