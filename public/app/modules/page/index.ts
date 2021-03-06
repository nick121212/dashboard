import ref = require("ref");
import config = require("module");
import router = require("modules/page/router");

import {CompileDirective} from "common/directives/compile_directive";
import {GridMenuDirective} from "common/directives/gridmenu_directive";

import {PageManagerController} from "modules/page/controllers/manager_con";
import {PageManagerFormController} from "modules/page/controllers/manager_form_con";

import {MaterialServiceCon} from "common/services/material_provider";
import {AutocompleteServiceWrap} from "common/services/schema-material-services/autocomplete_service";
import {TrustHtmlFilter} from "common/filters/trust_html.filter";


class Module {
    module:angular.IModule;

    constructor(name:string) {
        this.module = angular.module(name, config.config().deps);
        this.config();
        this.run();
        this.initControllers();
    }

    initControllers() {
        // services
        new MaterialServiceCon(this.module);
        new AutocompleteServiceWrap(this.module);
        // directives
        CompileDirective.init(this.module);
        GridMenuDirective.init(this.module);
        // controllers
        this.module
            .filter(TrustHtmlFilter._name, TrustHtmlFilter.filter)
            .controller(PageManagerController._name, PageManagerController)
            .controller(PageManagerFormController._name, PageManagerFormController);
    }

    config() {
        this.module.config([
            "$stateProvider",
            "$urlRouterProvider",
            "$mdThemingProvider",
            ($stateProvider, $urlRouterProvider, $mdThemingProvider):void => {
                router.init($urlRouterProvider, $stateProvider);
            }]
        );
    }

    run() {
        this.module.run([
            "$state",
            "$stateParams",
            "Permission",
            ($state, $stateParams, Permission):void => {
                console.log("page_module running！");
            }
        ]);
    }
}

export var module = new Module("page_module").module;