define(["require", "exports", "module", "modules/ecms/router", "modules/ecms/controllers/group_action_con", "modules/ecms/controllers/role_group_con", "modules/ecms/controllers/team_info_con", "modules/ecms/controllers/set_site_con", "common/services/material_provider"], function (require, exports, config, router, group_action_con_1, role_group_con_1, team_info_con_1, set_site_con_1, material_provider_1) {
    "use strict";
    var Module = (function () {
        function Module(name) {
            this.module = angular.module(name, config.config().deps);
            this.config();
            this.run();
            this.initControllers();
        }
        Module.prototype.initControllers = function () {
            new material_provider_1.MaterialServiceCon(this.module);
            this.module
                .controller(group_action_con_1.GroupActionManagerController._name, group_action_con_1.GroupActionManagerController)
                .controller(role_group_con_1.RoleGroupManagerController._name, role_group_con_1.RoleGroupManagerController)
                .controller(team_info_con_1.TeamInfoController._name, team_info_con_1.TeamInfoController)
                .controller(set_site_con_1.SetSiteController._name, set_site_con_1.SetSiteController);
        };
        Module.prototype.config = function () {
            this.module.config([
                "$stateProvider",
                "$urlRouterProvider",
                "$mdThemingProvider",
                function ($stateProvider, $urlRouterProvider, $mdThemingProvider) {
                    router.init($urlRouterProvider, $stateProvider);
                }]);
        };
        Module.prototype.run = function () {
            this.module.run([
                "$state",
                "$stateParams",
                "Permission",
                function ($state, $stateParams, Permission) {
                    console.log("page_module running！");
                }
            ]);
        };
        return Module;
    }());
    exports.module = new Module("ecms_module").module;
});
//# sourceMappingURL=index.js.map