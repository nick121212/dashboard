define(["require", "exports"], function (require, exports) {
    "use strict";
    var Service = (function () {
        function Service(module) {
            module.service(Service._name, Service.provider);
        }
        Service._name = "material";
        Service.provider = ["$timeout", "$state", "$stateParams", "$mdToast", "$mdDialog", "$mdSidenav", function ($timeout, $state, $stateParams, $mdToast, $mdDialog, $mdSidenav) {
                var MaterialService = (function () {
                    function MaterialService() {
                    }
                    MaterialService.prototype.preventDefault = function ($event) {
                        $event && ($event.defaultPrevented = true) && $event.preventDefault();
                    };
                    MaterialService.prototype.stopPropagation = function ($event) {
                        $event && ($event.cancelBubble = true) && $event.stopPropagation();
                    };
                    MaterialService.prototype.stopAll = function ($event) {
                        this.preventDefault($event);
                        this.stopPropagation($event);
                    };
                    MaterialService.prototype.close = function () {
                        $mdDialog && $mdDialog.cancel();
                    };
                    MaterialService.prototype.safeApply = function ($scope, applyFn) {
                        if (!$scope.$$phase)
                            $scope.$apply(applyFn);
                        else
                            applyFn();
                    };
                    MaterialService.prototype.alert = function (title, content) {
                        var alert = $mdDialog.show($mdDialog.alert()
                            .clickOutsideToClose(true)
                            .title(title)
                            .content(content || "操作成功！")
                            .ariaLabel(title)
                            .ok("知道了"));
                        return alert;
                    };
                    MaterialService.prototype.showErrMsg = function (msg) {
                        $mdToast.show($mdToast.simple()
                            .textContent(msg || "error")
                            .position("bottom right")
                            .action("关闭")
                            .capsule(true)
                            .highlightAction(true)
                            .hideDelay(3000));
                    };
                    MaterialService.prototype.showMsg = function (msg) {
                        $mdToast.show($mdToast.simple()
                            .textContent(msg || "success")
                            .position("top right")
                            .action("关闭")
                            .capsule(true)
                            .highlightAction(true)
                            .hideDelay(3000));
                    };
                    MaterialService.prototype.openMenu = function ($mdOpenMenu, $event) {
                        $mdOpenMenu($event);
                    };
                    MaterialService.prototype.buildToggler = function (navId) {
                        return function () {
                            $mdSidenav(navId).toggle()
                                .then(function () {
                            });
                        };
                    };
                    return MaterialService;
                }());
                return new MaterialService();
            }];
        return Service;
    }());
    exports.MaterialServiceCon = Service;
});
//# sourceMappingURL=material_provider.js.map