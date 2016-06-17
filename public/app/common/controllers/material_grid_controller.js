var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "common/controllers/material_controller_base", "common/models/client_data", "common/models/query_data"], function (require, exports, material_controller_base_1, client_data_1, query_data_1) {
    "use strict";
    var MaterialGridController = (function (_super) {
        __extends(MaterialGridController, _super);
        function MaterialGridController(args, clearToolbar) {
            var _this = this;
            if (clearToolbar === void 0) { clearToolbar = true; }
            _super.call(this, args);
            this.selected = [];
            this.searchData = {};
            this.rootToolbars = [];
            this.selectToolbars = [];
            this.itemToolbars = [];
            this.rowSelect = [10, 30, 50];
            this.columns = [];
            this.defQuery = {};
            this.queryData = new query_data_1.QueryData();
            this.clientData = new client_data_1.ClientData();
            this.$scope.$on("$destory", function () {
                _this.abort();
            });
            this.onPageChangeBind = function (page, pageCount) {
                this.onPageChange(page, pageCount);
            }.bind(this);
            this.init();
        }
        MaterialGridController.prototype.initKey = function () {
            this.key = this.$stateParams["key"];
        };
        MaterialGridController.prototype.abort = function () {
            this.$http && angular.forEach(this.$http.pendingRequests, function (request) {
                if (request["cancel"] && request.timeout) {
                    request["cancel"].resolve({
                        status: 200,
                        result_code: 0,
                        msg: "取消ajax加载！"
                    });
                }
            });
        };
        MaterialGridController.prototype.confirm = function (opts, serverInterfaces, filterData, action) {
            var _this = this;
            var confirm = this.$mdDialog.confirm()
                .title(opts.title)
                .textContent(opts.content)
                .targetEvent(opts.$event)
                .ok(opts.okContent || "确定")
                .cancel(opts.cancelContent || "取消");
            var promises = {};
            var deferred = this.$q.defer();
            if (this.selected.length > 0 || opts.ignoreSelection) {
                this.$mdDialog.show(confirm).then(function () {
                    _this.deferred = _this.$q.all(_this.dealInterfaces(action.interfaceObjects, serverInterfaces, (filterData.call(_this, _this.selected)) || _this.selected, _this.queryData)).then(function (data) {
                        opts.isRefresh && _this.getServerData();
                        _this.material.showMsg("执行成功!");
                        deferred.resolve(data);
                    });
                });
            }
            return deferred.promise;
        };
        MaterialGridController.prototype.clearWhere = function () {
            for (var p in this.queryData.where) {
                delete this.queryData.where[p];
            }
        };
        MaterialGridController.prototype.toggleSearchBar = function () {
            var properties = ["page", "pageCount", "limit", "offset", "order", "include", "attributes"];
            this.searchMode = !this.searchMode;
            if (this.searchMode === false) {
                var _loop_1 = function(p) {
                    if (this_1.queryData.hasOwnProperty(p) && !properties.some(function (property) {
                        return property === p;
                    })) {
                        this_1.queryData[p] = null;
                    }
                    this_1.queryData.where = {};
                };
                var this_1 = this;
                for (var p in this.queryData) {
                    _loop_1(p);
                }
                this.$sForm && this.$sForm.$submitted && ((this.$sForm = null) || true) && this.getServerData();
            }
        };
        MaterialGridController.prototype.resetSearch = function () {
            this.clearWhere();
            this.searchData = {};
        };
        MaterialGridController.prototype.doSearch = function (form) {
            var searchFilters = {};
            if (form.$dirty) {
                this.clearWhere();
                for (var p in this.searchData) {
                    if (!this.searchData.hasOwnProperty(p))
                        continue;
                    if (p.search("r-") === 0) {
                        this.queryData.where[p.replace("r-", "")] = this.searchData[p];
                    }
                    else {
                        this.queryData.where[p] = this.searchData[p];
                    }
                }
                form.$setPristine();
                this.onPageChange(1, this.queryData.pageCount);
                this.$sForm = form;
            }
        };
        MaterialGridController.prototype.clearSelected = function () {
            this.selected.length = 0;
        };
        MaterialGridController.prototype.getServerData = function () {
            var _this = this;
            var promises = {};
            if (this.isBusy)
                return;
            this.clearSelected();
            this.isBusy = true;
            this.abort();
            !this.searchMode && this.clearWhere();
            angular.extend(this.queryData.where, this.defQuery);
            setTimeout(function () {
                promises = _this.dealInterfaces(_this.viewAction.interfaceObjects, _this.serverInterfaces, null, _this.viewAction._queryParams);
                _this.deferred = _this.$q.all(promises).then(function (data) {
                    _this.dataFilter && (_this.clientData = _this.dataFilter(data));
                }, function (data) {
                }).finally(function () {
                    _this.isBusy = false;
                });
            }, 10);
            return this.deferred;
        };
        MaterialGridController.prototype.onPageChange = function (page, pageCount) {
            if (pageCount) {
                this.queryData.pageCount = pageCount;
                this.queryData.limit = pageCount;
            }
            page && (this.queryData.page = page);
            this.queryData.offset = this.queryData.pageCount * (this.queryData.page - 1);
            return this.getServerData();
        };
        MaterialGridController.prototype.onOrderChange = function (order) {
            this.queryData.order = order;
            return this.getServerData();
        };
        return MaterialGridController;
    }(material_controller_base_1.MaterialControllerBase));
    exports.MaterialGridController = MaterialGridController;
});
//# sourceMappingURL=material_grid_controller.js.map