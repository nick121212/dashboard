var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "common/controllers/material_popup_controller", "lodash", "jsonPathProcessor"], function (require, exports, material_popup_controller_1, _, jpp) {
    "use strict";
    var PageManagerFormController = (function (_super) {
        __extends(PageManagerFormController, _super);
        function PageManagerFormController() {
            _super.call(this, arguments);
            this.init();
        }
        PageManagerFormController.prototype.init = function () {
            var _this = this;
            this.title = this.action.title;
            this.detailAction = _.find(this.menu.actions, function (act) {
                return act["key"].search("detail") >= 0;
            });
            if (this.detailAction && this.action.isNeedDetail) {
                this.initServerInterfaces(this.detailAction, this.currentItem, {}).then(function (serverInterfaces) {
                    _this.isBusy = false;
                    _this.getDetailInfo(serverInterfaces, _this.detailAction.interfaceObjects).then(function (results) {
                        _this.dealResults(_this.detailAction, results, _this);
                        _this.initForm();
                    });
                });
            }
            else {
                this.initForm();
            }
        };
        PageManagerFormController.prototype.initInterfaces = function () {
            return this.dealInterfaces(this.action.interfaceObjects, this.serverInterfaces, this.formData, this.params);
        };
        PageManagerFormController.prototype.getDetailInfo = function (interfaces, interfaceObjects) {
            var _this = this;
            var promises;
            if (this.isBusy)
                return;
            this.isBusy = true;
            promises = this.dealInterfaces(interfaceObjects, interfaces, this.currentItem, this.params);
            return this.$q.all(promises)
                .finally(function () {
                _this.isBusy = false;
            });
        };
        PageManagerFormController.prototype.boostForm = function (forms) {
            var _this = this;
            if (!forms)
                forms = this.form;
            _.forEach(forms, function (form) {
                switch (form.type.toLowerCase()) {
                    case "array":
                    case "tabarray":
                    case "section":
                        _this.boostForm(form.items);
                        break;
                    case "autocomplete":
                        _this.MdAutocompleteBoost.init(form, _this.formData);
                        break;
                }
            }, this);
        };
        PageManagerFormController.prototype.initForm = function () {
            var _this = this;
            this.initServerInterfaces(this.action, this.currentItem).then(function (serverInterfaces) {
                _this.serverInterfaces = serverInterfaces;
                _this.params = _this.action._queryParams;
                _this.schema = _this.action.dataSchema;
                _this.action.formSchema && (_this.form = _this.action.formSchema.form);
                _this.boostForm(_this.form);
            });
            this.needData = true;
            this.currentItem = this.currentItem || {};
            this.formData = angular.extend({}, this.currentItem);
            if (this.action.clearCurrentItem) {
                this.formData = {};
            }
            if (typeof this.action.defaultDatas === "string") {
                this.action.defaultDatas = JSON.parse(this.action.defaultDatas);
            }
            _.forEach(this.action.defaultDatas, function (field, key) {
                var val = jpp(_this).value(field.path);
                val && (jpp(_this.formData).set(key, val, true));
            }, this);
            this.deleteNullProperty(this.formData);
            this.content = this.action.title + "成功";
            this.dialogCloseFn = function () {
                var _this = this;
                this.material.alert(this.title, this.content).finally(function () {
                    _this.action.isRefresh && _this.managerGrid && _this.managerGrid.getServerData && _this.managerGrid.getServerData();
                });
            }.bind(this);
        };
        PageManagerFormController.$inject = ["$rootScope", "$scope", "$q", "$http", "$mdDialog", "$mdToast", "material", "managerGrid", "Restangular", "currentItem", "$state", "$stateParams", "action", "menu", "sfPath", "MdAutocompleteBoost"];
        PageManagerFormController._name = "PageManagerFormController";
        PageManagerFormController._templateUrl = "app/modules/page/tpls/manager_form.html";
        return PageManagerFormController;
    }(material_popup_controller_1.MaterialPopupController));
    exports.PageManagerFormController = PageManagerFormController;
});
//# sourceMappingURL=manager_form_con.js.map