define(["require", "exports", "module", "themes/dark", "themes/white", "roles/anonymous", "roles/user", "common/directives/tv4-custom-formats"], function (require, exports, config, darkTheme, whiteTheme, anonymousRole, useRole, tv4_custom_formats_1) {
    "use strict";
    var AppModule = (function () {
        function AppModule(name) {
            this.module = angular.module(name, config.config().deps);
            this.initHttpInterceptor();
            this.module.directive("root", ["$rootScope", "$state", "material", function ($rootScope, $state, material) {
                    return {
                        link: function () {
                            console.log("root directive complete!");
                            $rootScope.user = {
                                nickname: "未设置",
                                avatarUrl: ""
                            };
                            $rootScope.$on("showError", function (state, ename, data) {
                                material.showMsg(data);
                            });
                            $rootScope.$on("userIntercepted", function (state, ename, data) {
                                $state.go(data || "passport");
                            });
                            $rootScope.$on("userInfo", function (state, user) {
                                user = user.data;
                                if (!user || typeof user !== "object") {
                                    return;
                                }
                                $rootScope.user.nickname = user.display_name;
                            });
                        }
                    };
                }]);
            this.config();
            this.run();
        }
        AppModule.prototype.initHttpInfo = function ($httpProvider) {
            $httpProvider.defaults.headers.put["Content-Type"] = "application/x-www-form-urlencoded";
            $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
            $httpProvider.defaults["transformRequest"] = [function (data) {
                    var param = function (obj) {
                        var query = "";
                        var name, value, fullSubName, subName, subValue, innerObj, i;
                        for (name in obj) {
                            value = obj[name];
                            if (value instanceof Date) {
                                query += encodeURIComponent(name) + "="
                                    + "\/Date(" + value.getTime() + "-0000)\/" + "&";
                            }
                            else if (value instanceof Array) {
                                for (i = 0; i < value.length; ++i) {
                                    subValue = value[i];
                                    fullSubName = name + "[" + i + "]";
                                    innerObj = {};
                                    innerObj[fullSubName] = subValue;
                                    query += param(innerObj) + "&";
                                }
                            }
                            else if (value instanceof Object) {
                                for (subName in value) {
                                    subValue = value[subName];
                                    fullSubName = name + "[" + subName + "]";
                                    innerObj = {};
                                    innerObj[fullSubName] = subValue;
                                    query += param(innerObj) + "&";
                                }
                            }
                            else if (value !== undefined && value !== null) {
                                query += encodeURIComponent(name) + "="
                                    + encodeURIComponent(value) + "&";
                            }
                        }
                        return query.length ? query.substr(0, query.length - 1) : query;
                    };
                    return angular.isObject(data) && String(data) !== "[object File]"
                        ? param(data)
                        : data;
                }];
            $httpProvider.interceptors.push("errorInterceptor");
        };
        AppModule.prototype.initHttpInterceptor = function () {
            this.module.factory("errorInterceptor", ["$rootScope", "$q", function ($rootScope, $q) {
                    return {
                        "request": function (httpConfig) {
                            var deferred, site = localStorage.getItem("site");
                            if (httpConfig.needCancel === true) {
                                deferred = $q.defer();
                                httpConfig.timeout = deferred.promise;
                                httpConfig.cancel = deferred;
                            }
                            httpConfig.params = httpConfig.params || {};
                            console.log(httpConfig.url);
                            if (httpConfig.cache && !httpConfig.cache.get(httpConfig.url)) {
                                httpConfig.params["site"] = site;
                            }
                            else if (!httpConfig.cache) {
                                httpConfig.params["site"] = site;
                            }
                            return httpConfig;
                        },
                        "responseError": function (response) {
                            switch (response.status) {
                                case 0:
                                    $rootScope.$emit("showError", "error", "net::ERR_CONNECTION_REFUSED");
                                    break;
                                case 403:
                                    $rootScope.$emit("userIntercepted", "passport");
                                    break;
                                case 404:
                                    $rootScope.$emit("showError", "error", "404");
                                    break;
                                case 400:
                                    $rootScope.$emit("showError", "error", response.data.error ? response.data.error.message : 400);
                                    break;
                                case 500:
                                    $rootScope.$emit("showError", "error", "500");
                                    break;
                                default:
                                    console.log(response.status);
                            }
                            return $q.reject(response);
                        },
                        "response": function (response) {
                            if (response.status === 200 && response.data instanceof Object) {
                                if (response.data.flag) {
                                    $rootScope.$emit(response.data.flag, response.data.error ? response.data.error.message : response.data);
                                }
                            }
                            return response;
                        }
                    };
                }]);
        };
        AppModule.prototype.initRoles = function ($q, Permission, Restangular, $rootScope) {
            anonymousRole.init($q, Permission, Restangular, $rootScope);
            useRole.init($q, Permission, Restangular, $rootScope);
        };
        AppModule.prototype.config = function () {
            var _this = this;
            this.module.config([
                "$stateProvider",
                "$urlRouterProvider",
                "$httpProvider",
                "$mdThemingProvider",
                "sfErrorMessageProvider",
                "$locationProvider",
                "schemaFormDecoratorsProvider",
                "mdSideMenuSectionsProvider",
                function ($stateProvider, $urlRouterProvider, $httpProvider, $mdThemingProvider, sfErrorMessageProvider, $locationProvider, schemaFormDecoratorsProvider, mdSideMenuSectionsProvider) {
                    $urlRouterProvider.otherwise(function ($injector) {
                        var $state = $injector.get("$state");
                        $state.go("home");
                    });
                    darkTheme.init($mdThemingProvider);
                    whiteTheme.init($mdThemingProvider);
                    mdSideMenuSectionsProvider.initWithTheme($mdThemingProvider);
                    _this.initHttpInfo($httpProvider);
                    schemaFormDecoratorsProvider.addMapping("materialDecorator", "jsoneditor", "app/common/material-decorator/jsoneditor.html");
                    schemaFormDecoratorsProvider.addMapping("materialDecorator", "ueditor", "app/common/material-decorator/ueditor.html");
                    schemaFormDecoratorsProvider.addMapping("materialDecorator", "fileupload", "app/common/material-decorator/fileupload.html");
                    schemaFormDecoratorsProvider.addMapping("materialDecorator", "arrayselect", "app/common/material-decorator/radio-image.html");
                    schemaFormDecoratorsProvider.addMapping("materialDecorator", "datepicker", "app/common/material-decorator/datepicker.html");
                    schemaFormDecoratorsProvider.addMapping("materialDecorator", "image", "app/common/material-decorator/image.html");
                    tv4_custom_formats_1.init();
                    sfErrorMessageProvider.setDefaultMessage(10000, "邮箱格式不正确");
                    sfErrorMessageProvider.setDefaultMessage(10001, "两次密码不一致");
                    sfErrorMessageProvider.setDefaultMessage(10002, "用户名中存在非法字符");
                    sfErrorMessageProvider.setDefaultMessage(10003, "手机格式不正确");
                    sfErrorMessageProvider.setDefaultMessage(10004, "JSON格式不正确");
                    sfErrorMessageProvider.setDefaultMessage(302, "[{{title}}]是必填项");
                    sfErrorMessageProvider.setDefaultMessage("url", "[{{title}}]格式不正确");
                    sfErrorMessageProvider.setDefaultMessage("103", "[{{title}}]超过了最大值{{schema.maximum}}");
                    sfErrorMessageProvider.setDefaultMessage("101", "[{{title}}]小于最小值{{schema.minimum}}");
                    sfErrorMessageProvider.setDefaultMessage("200", "[{{title}}]字符长度小于最小值({{schema.minLength}})");
                    sfErrorMessageProvider.setDefaultMessage("201", "[{{title}}]字符长度大于最大值({{schema.maxLength}})");
                }]);
        };
        AppModule.prototype.run = function () {
            var _this = this;
            this.module.run([
                "$rootScope",
                "Permission",
                "Restangular",
                "$q",
                function ($rootScope, Permission, Restangular, $q) {
                    $rootScope["apiPrefix"] = config.config().api_prefix;
                    _this.initRoles($q, Permission, Restangular, $rootScope);
                    Restangular.setBaseUrl(config.config().api_url);
                }
            ]);
        };
        return AppModule;
    }());
    exports.module = new AppModule("app_module").module;
});
//# sourceMappingURL=app.js.map