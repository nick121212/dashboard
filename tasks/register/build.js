module.exports = function (grunt) {

    grunt.registerTask('task-clean', ['clean']);
    grunt.registerTask('task-copy', ['copy']);
    grunt.registerTask('task-concat', ['concat', 'cssmin']);
    grunt.registerTask('task-require', ['html2js', 'requirejs']);
    grunt.registerTask('task-uglify', ['uglify', 'replace:version']);
    grunt.registerTask('task-rename', ['rename']);
    grunt.registerTask('task-replace', ['replace']);

    grunt.registerTask('build', ['clean', 'copy', 'concat', 'cssmin', 'html2js', 'replace:path', 'requirejs', 'uglify', 'replace:version', 'rename']);
};
