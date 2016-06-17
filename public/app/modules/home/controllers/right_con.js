var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "common/controllers/material_controller_base"], function (require, exports, material_controller_base_1) {
    "use strict";
    var HomeRightController = (function (_super) {
        __extends(HomeRightController, _super);
        function HomeRightController() {
            _super.call(this, arguments);
        }
        HomeRightController.prototype.doExit = function ($event) {
            var confirm = this.$mdDialog.confirm()
                .title("退出登录")
                .textContent("确定要退出登录吗？")
                .ariaLabel("退出登录")
                .ok("知道了")
                .cancel("取消")
                .targetEvent($event);
            var logout = this.Restangular.oneUrl("/", "/" + this.$rootScope["apiPrefix"]).all("logout");
            this.$mdDialog.show(confirm).then(function () {
                logout.doPOST();
            });
        };
        HomeRightController.$inject = ["$rootScope", "$scope", "$mdDialog", "Restangular", "mdSideMenuSections", "mdSideMenuFactory"];
        HomeRightController._name = "HomeRightController";
        return HomeRightController;
    }(material_controller_base_1.MaterialControllerBase));
    exports.HomeRightController = HomeRightController;
});
//# sourceMappingURL=right_con.js.map