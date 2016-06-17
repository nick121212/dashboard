/**
 * Created by NICK on 15/10/30.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */

import ref = require("ref");
import {MaterialControllerBase} from "common/controllers/material_controller_base";

export class HomeIndexController extends MaterialControllerBase {
    public static _name:string = "HomeIndexController";
    public static $inject:Array<any> = ["$rootScope", "$scope", "$state", "$stateParams", "$mdBottomSheet", "$mdToast", "$mdDialog", "material"];

    constructor() {
        super(arguments);
        this.$rootScope["title"] = "DASHBOARD";
    }

    doSelectSite($event) {
        let dialogOptions:angular.material.IDialogOptions = {};

        dialogOptions.controller = 'SetSiteController';
        dialogOptions.controllerAs = 'formCtl';
        dialogOptions.templateUrl = 'app/modules/ecms/tpls/set_site.html';
        dialogOptions.targetEvent = $event;
        dialogOptions.clickOutsideToClose = false;

        this.$mdDialog.show(dialogOptions);
    }

    doOpenMenu() {
        this.material.buildToggler("left").call(this);
    }

    doOpenRightMenu() {
        this.material.buildToggler("right").call(this);
    }
}