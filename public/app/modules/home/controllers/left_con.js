var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "common/controllers/material_controller_base", "lodash"], function (require, exports, material_controller_base_1, _) {
    "use strict";
    var HomeLeftController = (function (_super) {
        __extends(HomeLeftController, _super);
        function HomeLeftController() {
            _super.call(this, arguments);
            this.filterExpression = "";
            this.filterComparator = false;
            this.init();
        }
        HomeLeftController.prototype.menuLoop = function (datas, depth) {
            if (depth === void 0) { depth = 0; }
            var nodes = _.filter(datas, function (d) {
                return d["depth"] === depth;
            });
            _.forEach(nodes, function (node) {
                if (datas[node["parentKey"]]) {
                    !datas[node["parentKey"]].nodes && (datas[node["parentKey"]].nodes = []);
                    node["menuLink"] = node["link"];
                    node["isShow"] && datas[node["parentKey"]].nodes.push(node);
                }
            });
            nodes.length && this.menuLoop(datas, depth + 1);
        };
        HomeLeftController.prototype.doExpendAll = function ($event) {
            var _this = this;
            _.forEach(this.selectedNodes, function (val, key) {
                delete _this.selectedNodes[key];
            }, this);
        };
        HomeLeftController.prototype.doReload = function ($event) {
            var _this = this;
            var defer = this.$q.defer();
            if (this.isBusy)
                return;
            this.isBusy = true;
            this.initServerOnlyInterfaces(["menus-all-fetch"], {}, {}).then(function (results) {
                _this.$q.all(_this.dealInterfaces(results.interfaceObjects, results.serverInterfaces, results.item, results.params)).then(function (results) {
                    var data = results["menus-all-fetch"];
                    if (!data.length)
                        return;
                    data = _.keyBy(data, "key");
                    _this.menuLoop(data, 0);
                    _this.modules = _.find(data, function (d) {
                        return d["depth"] === 0;
                    })["nodes"];
                    _this.selectedNodes = _.keyBy(_.filter(data, function (d) {
                        return d["depth"] === 1;
                    }), "key");
                    _this.mdSideMenuSections.sections = _this.modules;
                    defer.resolve();
                }, defer.reject).finally(function () {
                    _this.isBusy = false;
                });
            });
            return defer.promise;
        };
        HomeLeftController.prototype.init = function () {
            var _this = this;
            this.doReload(null).then(function () {
                _this.mdSideMenuFactory.onStateChangeStart(null, null, null);
            });
            this.mdSideMenuSections.options = {
                children: "nodes",
                key: "key",
                filterExpression: "",
                showSearchBar: true,
                dirSelectable: false,
                orderBy: "id",
                filterField: "title"
            };
        };
        HomeLeftController.$inject = ["$rootScope", "$scope", "$q", "$mdDialog", "Restangular", "mdSideMenuSections", "mdSideMenuFactory"];
        HomeLeftController._name = "HomeLeftController";
        return HomeLeftController;
    }(material_controller_base_1.MaterialControllerBase));
    exports.HomeLeftController = HomeLeftController;
});
//# sourceMappingURL=left_con.js.map