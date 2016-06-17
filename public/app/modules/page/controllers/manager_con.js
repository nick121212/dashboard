var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "common/controllers/material_grid_controller", "modules/page/controllers/manager_form_con", "common/models/toolbar_item", "lodash"], function (require, exports, material_grid_controller_1, manager_form_con_1, toolbar_item_1, _) {
    "use strict";
    var PageManagerController = (function (_super) {
        __extends(PageManagerController, _super);
        function PageManagerController() {
            _super.call(this, arguments);
            this.pagination = true;
        }
        PageManagerController.prototype.keyInOrNot = function (key, array, arrayField) {
            return _.findIndex(array, function (o) {
                if (arrayField) {
                    return o[arrayField] == key;
                }
                else {
                    return o == key;
                }
            }) >= 0;
        };
        PageManagerController.prototype.init = function () {
            var _this = this;
            this.isBusy = true;
            this.initKey();
            this.initServerOnlyInterfaces(["menus-key-detail", "menus-key-actions"], {}, { key: this.key }).then(function (results) {
                var deal = function (results) {
                    _this.menu = results["menus-key-detail"].plain();
                    _this.menu.actions = results["menus-key-actions"].plain();
                    _this.initView();
                    document.title = _this.menu.title;
                };
                _this.$q.all(_this.dealInterfaces(results.interfaceObjects, results.serverInterfaces, results.item, results.params)).then(deal.bind(_this));
            });
        };
        PageManagerController.prototype.initView = function () {
            var _this = this;
            var err = function () {
                _this.material.alert(_this.title, "没有配置带有view的操作!").finally(function () {
                    _this.$state.go("home");
                });
                return;
            };
            this.viewAction = _.find(this.menu.actions, function (act) {
                return act["isList"] === 1;
            });
            if (!this.viewAction) {
                return err();
            }
            this.initServerInterfaces(this.viewAction, this.queryData).then(function (serverInterfaces) {
                _this.serverInterfaces = serverInterfaces;
                _this.initDataFilter();
                _this.initSearch(_this.viewAction);
                _this.isBusy = false;
                _this.getServerData();
            });
            this.initColumns();
            this.initToolbar();
        };
        PageManagerController.prototype.doConfirm = function ($event, itemData, action) {
            var _this = this;
            this.initServerInterfaces(action, this.queryData, itemData).then(function (serverInterfaces) {
                _this.confirm({
                    title: action.title,
                    content: "确认吗?",
                    $event: $event,
                    isRefresh: action.isRefresh,
                    ignoreSelection: true
                }, serverInterfaces, function () {
                    return itemData;
                }, action).then(function (data) {
                    console.log(data);
                });
            });
        };
        PageManagerController.prototype.doLink = function ($event, itemData, action) {
            var _this = this;
            var routes = [];
            _.each(action.linkUrl.split("/"), function (href) {
                if (href.search(":") === 0) {
                    routes.push(itemData[href.substring(1)] || _this.$stateParams[href.substring(1)]);
                }
                else {
                    href && routes.push(href);
                }
            }, this);
            routes.length && (location.hash = routes.join("/"));
        };
        PageManagerController.prototype.doPopup = function ($event, itemData, action) {
            var dialogOptions = {
                controller: action.controller || manager_form_con_1.PageManagerFormController._name,
                templateUrl: action.templateUrl || manager_form_con_1.PageManagerFormController._templateUrl,
                controllerAs: "formCtl",
                clickOutsideToClose: false,
                escapeToClose: false,
                targetEvent: $event,
                locals: {
                    "managerGrid": this,
                    "currentItem": itemData,
                    "action": action,
                    "menu": this.menu
                }
            };
            this.$mdDialog.show(dialogOptions);
        };
        PageManagerController.prototype.doAction = function ($event, itemData, action) {
            switch (~~action.optype) {
                case 2:
                    this.doConfirm($event, itemData, action);
                    break;
                case 3:
                    this.doLink($event, itemData, action);
                    break;
                case 4:
                case 5:
                    this.doPopup($event, itemData, action);
                    break;
            }
        };
        PageManagerController.prototype.initDataFilter = function () {
            var _this = this;
            return this.dataFilter = function (results) {
                _this.clientData.datas.length = 0;
                _this.dealResults(_this.viewAction, results, _this.clientData);
                return _this.clientData;
            };
        };
        PageManagerController.prototype.initColumns = function () {
            this.columns = JSON.parse(this.viewAction.columns);
        };
        PageManagerController.prototype.initToolbar = function () {
            var _this = this;
            var tool = null;
            _.each(this.menu.actions, function (action) {
                tool = new toolbar_item_1.ToolbarItem({
                    title: action.title,
                    icon: action.icon,
                    onClick: function ($event, item) {
                        _this.doAction($event, item, action);
                    }
                });
                switch (~~action["type"]) {
                    case 2:
                        _this.itemToolbars.push(tool);
                        break;
                    case 3:
                        break;
                    case 4:
                        _this.rootToolbars.push(tool);
                        break;
                }
            }, this);
            this.rootToolbars.push(new toolbar_item_1.ToolbarItem({
                title: "刷新",
                icon: "refresh",
                onClick: function ($event) {
                    _this.getServerData();
                }
            }));
            this.rootToolbars.push(new toolbar_item_1.ToolbarItem({
                title: "搜索",
                icon: "search",
                onClick: function ($event) {
                    _this.toggleSearchBar();
                }
            }));
        };
        PageManagerController.prototype.initSearch = function (action) {
            var _this = this;
            this.defQuery = {};
            this.schema = action.dataSchema;
            this.searchForm = action.searchSchema ? action.searchSchema.form : null;
            if (action.searchSchema) {
                _.forEach(action.searchSchema.query, function (d, key) {
                    _this.defQuery[key] = _this.$stateParams[d] || d;
                });
                this.searchMode = !!action.searchSchema["searchMode"];
                this.pagination = action.searchSchema["pagination"] !== false;
                action.searchSchema["limit"] && (this.queryData.pageCount = this.queryData.limit = action.searchSchema["limit"]);
            }
            if (!this.searchForm || !this.schema) {
                this.rootToolbars.pop();
            }
        };
        PageManagerController._name = "PageManagerController";
        PageManagerController.$inject = ["$rootScope", "$scope", "$state", "$stateParams", "$q", "$mdBottomSheet", "$mdToast", "$mdDialog", "material", "Restangular"];
        return PageManagerController;
    }(material_grid_controller_1.MaterialGridController));
    exports.PageManagerController = PageManagerController;
});
//# sourceMappingURL=manager_con.js.map