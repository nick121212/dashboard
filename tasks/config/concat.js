/**
 * Created by NICK on 15/11/13.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */

module.exports = function (grunt) {
    grunt.config.set('concat', {
        css: {
            src: [
                "public/bower_components/angular-material-data-table/dist/md-data-table.css",
                "public/bower_components/angular-material-icons/angular-material-icons.css",
                "public/bower_components/angular-motion-sass/dist/angular-motion.css",
                "public/bower_components/material-sidemenu/sidemenu.css",
                "public/app/modules/passport/styles/passport.css",
                "public/bower_components/angular-material/angular-material.css",
                "public/bower_components/jsoneditor/dist/jsoneditor.css",
                "public/bower_components/smDateTimeRangePicker/src/picker.css",
                "public/styles/nga.all.css",
                "public/styles/loading.css"
            ],
            dest: 'public/build/styles/dashboard.css'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
};