var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "modules/page/controllers/manager_con"], function (require, exports, manager_con_1) {
    "use strict";
    var SetSiteController = (function (_super) {
        __extends(SetSiteController, _super);
        function SetSiteController() {
            _super.apply(this, arguments);
        }
        SetSiteController.prototype.initKey = function () {
            var site = localStorage.getItem("site");
            this.key = "setsite";
            if (site) {
                this.currentItem = {
                    key: site,
                    title: site
                };
            }
        };
        SetSiteController.prototype.doSelect = function (key) {
            this.close();
            if (this.$rootScope["site"] != key) {
                this.$rootScope["site"] = key;
                localStorage.setItem("site", key);
            }
        };
        SetSiteController.$inject = manager_con_1.PageManagerController.$inject.concat([]);
        SetSiteController._name = "SetSiteController";
        return SetSiteController;
    }(manager_con_1.PageManagerController));
    exports.SetSiteController = SetSiteController;
});
//# sourceMappingURL=set_site_con.js.map