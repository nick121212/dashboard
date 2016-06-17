import ref = require("ref");
import config = require("module");
import router = require("modules/ecms/router");

import {GroupActionManagerController} from "modules/ecms/controllers/group_action_con";
import {RoleGroupManagerController} from "modules/ecms/controllers/role_group_con";
import {TeamInfoController} from "modules/ecms/controllers/team_info_con";
import {SetSiteController} from "modules/ecms/controllers/set_site_con";
import {MaterialServiceCon} from "common/services/material_provider";

class Module {
    module:angular.IModule;

    constructor(name:string) {
        this.module = angular.module(name, config.config().deps);
        this.config();
        this.run();
        this.initControllers();
    }

    initControllers() {
        new MaterialServiceCon(this.module);

        this.module
            .controller(GroupActionManagerController._name, GroupActionManagerController)
            .controller(RoleGroupManagerController._name, RoleGroupManagerController)
            .controller(TeamInfoController._name, TeamInfoController)
            .controller(SetSiteController._name, SetSiteController)
        ;
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

export var module = new Module("ecms_module").module;