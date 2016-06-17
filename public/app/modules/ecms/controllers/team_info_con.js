var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "modules/page/controllers/manager_con", "common/models/toolbar_item"], function (require, exports, manager_con_1, toolbar_item_1) {
    "use strict";
    var TeamInfoController = (function (_super) {
        __extends(TeamInfoController, _super);
        function TeamInfoController() {
            _super.apply(this, arguments);
        }
        TeamInfoController.prototype.initKey = function () {
            _super.prototype.initKey.call(this);
            this.teamId = ~~this.$stateParams["teamId"];
            if (!this.teamId) {
                console.warn("\u4E0D\u5B58\u5728\u7684\u4FF1\u4E50\u90E8ID!");
            }
        };
        TeamInfoController.prototype.initSearch = function (action) {
            var _this = this;
            _super.prototype.initSearch.call(this, action);
            this.defQuery = {
                id: this.teamId
            };
            this.rootToolbars.push(new toolbar_item_1.ToolbarItem({
                title: "俱乐部详细信息",
                icon: "info",
                onClick: function ($event) {
                    _this.toggleSearchBar();
                }
            }));
            this.searchMode = true;
        };
        TeamInfoController.$inject = manager_con_1.PageManagerController.$inject.concat([]);
        TeamInfoController._name = "TeamInfoController";
        return TeamInfoController;
    }(manager_con_1.PageManagerController));
    exports.TeamInfoController = TeamInfoController;
});
//# sourceMappingURL=team_info_con.js.map