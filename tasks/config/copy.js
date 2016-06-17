/**
 * Created by NICK on 15/11/13.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */

module.exports = function (grunt) {
    grunt.config.set('copy', {
        image_files: {
            files: [{
                expand: true,
                src: ['**/*.jpg'],
                cwd: 'public/styles/',
                dest: 'public/build/styles/'
            }]
        },
        
        image_jsoneditor_files: {
            files: [{
                expand: true,
                src: ['**/*.svg'],
                cwd: 'public/bower_components/jsoneditor/dist',
                dest: 'public/build/styles/'
            }]
        },

        ueditor_files: {
            files: [{
                expand: true,
                src: ['**/*.*'],
                cwd: 'public/ueditor',
                dest: 'public/build/ueditor/'
            }]
        },

        html_files: {
            files: [{
                src: ['public/index_product.html'],
                cwd: '',
                dest: 'public/build/index.html'
            }]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
};