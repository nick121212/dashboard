import ref = require("ref");

let config:RequireConfig = {
    baseUrl: "app",
    shim: {
        "angular": {
            exports: "angular"
        },
        "angular-animate": {
            deps: ["angular"]
        },
        "angular-aria": {
            deps: ["angular"]
        },
        "angular-material": {
            deps: ["angular-aria", "angular-animate"]
        },
        "angular-material-datatable": {
            deps: ["angular", "angular-material"]
        },
        "angular-material-icons": {
            deps: ["angular-material", "svg-morpheus"]
        },
        "angular-messages": {
            deps: ["angular-animate"]
        },
        "angular-permission": {
            deps: ["angular-ui-router"]
        },
        "angular-sanitize": {
            deps: ["angular"]
        },
        "angular-jsoneditor": {
            deps: ["angular", "jsoneditor"]
        },
        "schemaForm": {
            deps: ["objectpath", "tv4", "angular-sanitize"]
        },
        "schemaForm-material": {
            deps: ["schemaForm"]
        },
        "angular-ui-router": {
            deps: ["angular"]
        },
        "material-sidemenu": {
            deps: ["angular-material"]
        },
        "angular-restangular": {
            deps: ["angular"]
        },
        "ueditor": {
            deps: ["ueditor-config"]
        },
        "angular-ueditor": {
            deps: ["angular", "ueditor"]
        },
        "angularFileUpload": {
            deps: ["angular"]
        },
        "partials": {
            deps: ["angular"]
        },
        "smDateTimeRangePicker": {
            deps: ["angular-material", "moment"],
            init: function (ngMaterial, moment) {
                window["moment"] = moment;
            }
        }
    },
    paths: {
        "angular": "../bower_components/angular/angular",
        "angular-animate": "../bower_components/angular-animate/angular-animate",
        "angular-aria": "../bower_components/angular-aria/angular-aria",
        "angular-material": "../bower_components/angular-material/angular-material",
        "angular-material-datatable": "../bower_components/angular-material-data-table/dist/md-data-table",
        "angular-material-icons": "../bower_components/angular-material-icons/angular-material-icons",
        "angular-messages": "../bower_components/angular-messages/angular-messages",
        "angular-permission": "../bower_components/angular-permission/dist/angular-permission",
        "angular-sanitize": "../bower_components/angular-sanitize/angular-sanitize",
        "schemaForm": "../bower_components/angular-schema-form/dist/schema-form",
        "schemaForm-material": "../bower_components/schemaform-material/material-decorator",
        "angular-ui-router": "../bower_components/angular-ui-router/release/angular-ui-router",
        "lodash": "../bower_components/lodash/lodash",
        "material-sidemenu": "../bower_components/material-sidemenu/sidemenu",
        "moment": "../bower_components/moment/moment",
        "objectpath": "../bower_components/objectpath/lib/objectpath",
        "angular-restangular": "../bower_components/restangular/dist/restangular",
        "svg-morpheus": "../bower_components/svg-morpheus/compile/unminified/svg-morpheus",
        "tv4": "../bower_components/tv4/tv4",
        "jsoneditor": "../bower_components/jsoneditor/dist/jsoneditor",
        "angular-jsoneditor": "../bower_components/ng-jsoneditor/ng-jsoneditor",
        "validator": "../bower_components/validator-js/validator",
        "ueditor": "../ueditor/ueditor.all",
        "ueditor-config": "../ueditor/ueditor.config",
        "angular-ueditor": "../bower_components/angular-ueditor/dist/angular-ueditor",
        "angularFileUpload": "../bower_components/angular-file-upload/dist/angular-file-upload",
        "smDateTimeRangePicker": "../bower_components/smDateTimeRangePicker/src/picker",
        "jsonPathProcessor": "../bower_components/json-path-processor/dist/jpp"
    },
    deps: [
        "angular",
        "angular-ui-router",
        "material-sidemenu",
        "angular-permission",
        "schemaForm-material",
        "angular-ueditor",
        "angularFileUpload",
        "lodash",
        "angular-material-datatable",
        "angular-material-icons",
        "angular-restangular",
        "angular-jsoneditor",
        "smDateTimeRangePicker",
        "partials"
    ],
    config: {
        "modules/home/index": {
            deps: ["ui.router", "ngMaterial", "restangular", "ngAnimate", "ngMdIcons", "sidemenu", "permission", "partial_module"]
        },
        "modules/passport/index": {
            deps: ["ui.router", "ngMaterial", "restangular", "ngAnimate", "ngMdIcons", "schemaForm", "permission", "partial_module"]
        },
        "modules/page/index": {
            deps: ["ui.router", "ngMaterial", "restangular", "ngAnimate", "ngMdIcons", "schemaForm", "permission", "md.data.table", "ng.jsoneditor", "ng.ueditor", "angularFileUpload", "partial_module", "smDateTimeRangePicker","ngSanitize"]
        },
        "modules/ecms/index": {
            deps: ["ui.router", "ngMaterial", "restangular", "ngAnimate", "ngMdIcons", "schemaForm", "permission", "md.data.table", "ng.jsoneditor", "ng.ueditor", "partial_module"]
        },
        "app": {
            api_url: "admin/api",
            api_prefix: "admin",
            deps: ["ui.router", "ngMaterial", "restangular", "ngAnimate", "ngMdIcons", "schemaForm", "permission", "angularFileUpload", "partial_module"]
        }
    },
    callback: () => {
        requirejs(["bootstrap/bootstrap"]);
    },
    urlArgs: "@@version"
};

requirejs.config(config);