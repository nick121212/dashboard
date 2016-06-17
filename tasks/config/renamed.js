module.exports = function (grunt) {
    grunt.config.set('rename', {
        main: {
            files: [
                {src: ['public/build'], dest: 'public/admin'}
            ]
        }
//         moveBuild: {
//             src: 'build/*',
//             dest: 'admin/'
//         }
    });

    grunt.loadNpmTasks('grunt-contrib-rename');
};