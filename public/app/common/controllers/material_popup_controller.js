var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "common/controllers/material_controller_base"], function (require, exports, material_controller_base_1) {
    "use strict";
    var MaterialPopupController = (function (_super) {
        __extends(MaterialPopupController, _super);
        function MaterialPopupController(args) {
            _super.call(this, args);
            this.needData = true;
        }
        MaterialPopupController.prototype.submitNoForm = function () {
            var _this = this;
            var promises = {};
            promises = this.initInterfaces();
            this.$promise = this.$q.all(promises);
            if (this.serverInterfaces && this.$promise) {
                (this.isBusy = true) && this.managerGrid && (this.managerGrid.isBusy = true);
                this.$promise.then(function (datas) {
                    if (_this.dialogCloseFn) {
                        _this.dialogCloseFn(datas);
                    }
                    else {
                        _this.material.alert(_this.title, _this.content).finally(function () {
                            _this.managerGrid && _this.managerGrid.getServerData && _this.managerGrid.getServerData();
                        });
                    }
                }).finally(function () {
                    _this.managerGrid && (_this.managerGrid.isBusy = false);
                    _this.isBusy = false;
                    _this.$promise = null;
                });
            }
            return this.$promise;
        };
        MaterialPopupController.prototype.submit = function ($form, serverData) {
            this.$rootScope.$broadcast("schemaFormValidate");
            console.log($form);
            if ($form.$dirty && $form.$valid && !this.isBusy) {
                this.$promise = this.submitNoForm();
                this.$promise.then(function () {
                    $form.$setPristine();
                });
            }
        };
        return MaterialPopupController;
    }(material_controller_base_1.MaterialControllerBase));
    exports.MaterialPopupController = MaterialPopupController;
});
//# sourceMappingURL=material_popup_controller.js.map