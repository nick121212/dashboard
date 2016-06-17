var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "modules/page/controllers/manager_form_con"], function (require, exports, manager_form_con_1) {
    "use strict";
    var GroupActionManagerController = (function (_super) {
        __extends(GroupActionManagerController, _super);
        function GroupActionManagerController() {
            _super.apply(this, arguments);
            this.groupActions = {};
        }
        GroupActionManagerController.prototype.checked = function (item) {
            return this.groupActions.hasOwnProperty(item["key"]);
        };
        GroupActionManagerController.prototype.initInterfaces = function () {
            var groupActions = _.map(this.groupActions, function (ga) {
                return ga;
            });
            var interfaces = [];
            var actions = _.keyBy(this.actions, "key");
            _.each(groupActions, function (d) {
                var action = actions[d["actionKey"]];
                if (action) {
                    try {
                        var inters = JSON.parse(action.interfaces);
                        _.isArray(inters) && (interfaces = interfaces.concat(inters));
                    }
                    catch (e) { }
                }
            }, this);
            return this.dealInterfaces(this.action.interfaceObjects, this.serverInterfaces, {
                groupKey: this.currentItem["key"],
                interfaces: interfaces,
                groupactions: groupActions
            }, this.params);
        };
        GroupActionManagerController.prototype.initForm = function () {
            _super.prototype.initForm.call(this);
            console.log(this.groupactions);
            this.groupActions = _.keyBy(this.groupactions, "actionKey");
            console.log(this.groupActions);
        };
        GroupActionManagerController.prototype.toggleAction = function (item) {
            if (this.groupActions.hasOwnProperty(item["key"])) {
                delete this.groupActions[item["key"]];
            }
            else {
                this.groupActions[item["key"]] = {
                    groupKey: this.currentItem["key"],
                    actionKey: item.key
                };
            }
        };
        GroupActionManagerController.$inject = manager_form_con_1.PageManagerFormController.$inject.concat([]);
        GroupActionManagerController._name = "GroupActionManagerController";
        return GroupActionManagerController;
    }(manager_form_con_1.PageManagerFormController));
    exports.GroupActionManagerController = GroupActionManagerController;
});
//# sourceMappingURL=group_action_con.js.map