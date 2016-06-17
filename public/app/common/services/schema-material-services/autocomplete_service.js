var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "common/controllers/material_controller_base", "lodash", "jsonPathProcessor"], function (require, exports, material_controller_base_1, _, jpp) {
    "use strict";
    var AutocompleteServiceWrap = (function () {
        function AutocompleteServiceWrap(module) {
            module.service(AutocompleteServiceWrap._name, AutocompleteServiceWrap.service);
        }
        AutocompleteServiceWrap._name = 'MdAutocompleteBoost';
        AutocompleteServiceWrap.service = ["$q", "$http", "$mdDialog", "$mdToast", "material", "Restangular", function ($q, $http, $mdDialog, $mdToast, material, Restangular) {
                var AutocompleteService = (function (_super) {
                    __extends(AutocompleteService, _super);
                    function AutocompleteService() {
                        _super.call(this, null);
                        this.$mdDialog = $mdDialog;
                        this.Restangular = Restangular;
                        this.$http = $http;
                        this.material = material;
                        this.$q = $q;
                    }
                    AutocompleteService.prototype.initSearchData = function (searchText, searchField, operation) {
                        if (operation === void 0) { operation = ""; }
                        var keys, key, params = { where: {} };
                        params["r-" + searchField + operation] = searchText;
                        for (var p in params) {
                            if (!params.hasOwnProperty(p) || p === "where" || !params[p])
                                continue;
                            if (p.search("r-") === 0) {
                                keys = p.replace("r-", "").split(".");
                                keys.length > 0 && (key = keys[0]);
                                keys.length > 1 && (operation = keys[1]);
                                if (operation) {
                                    params.where[key] = {};
                                    params.where[key][operation] = params[p];
                                }
                                else {
                                    params.where[key] = params[p];
                                }
                            }
                            else {
                                params.where[p] = params[p];
                            }
                            delete params[p];
                        }
                        return params;
                    };
                    AutocompleteService.prototype.initSearchWhere = function (formData, params, where) {
                        var keys = null, pd;
                        _.forEach(where, function (path, key) {
                            keys = path.split('.');
                            if (keys.length) {
                                if (keys[0] == "model") {
                                    pd = formData[keys[1]];
                                }
                                pd && (params.where[key] = pd);
                            }
                        });
                        return params;
                    };
                    AutocompleteService.prototype.initAutoComplete = function (form, formData) {
                        var _this = this;
                        if (!form.interfaceKeys || !angular.isArray(form.interfaceKeys) || form.interfaceKeys.length != 1) {
                            console.warn("\u6CA1\u6709\u914D\u7F6E\u63A5\u53E3\u6216\u8005\u63A5\u53E3\u914D\u7F6E\u4E0D\u6B63\u786E\u3002" + form);
                            return;
                        }
                        form.getInterfacesInfo = function (params) {
                            var resultData = [], defer = _this.$q.defer();
                            _this.initServerOnlyInterfaces(form.interfaceKeys, params).then(function (results) {
                                _this.$q.all(_this.dealInterfaces(results.interfaceObjects, results.serverInterfaces, {}, {})).then(function (datas) {
                                    _.each(form.resultField, function (valuePath, key) {
                                        var val = jpp(datas).value(key + "." + valuePath);
                                        angular.isArray(val) && (resultData = resultData.concat(val));
                                    }, _this);
                                    defer.resolve(resultData);
                                });
                            });
                            return defer.promise;
                        };
                        form.queryServer = function (searchText, arrayModle, arrayIndex, $parent) {
                            var defer = _this.$q.defer(), params;
                            params = _this.initSearchData(searchText, form.searchField, form.operation);
                            params = _this.initSearchWhere(formData, params, form.where || {});
                            form.getInterfacesInfo(params).then(function (data) {
                                defer.resolve(data);
                            });
                            return defer.promise;
                        };
                        form.init = function (val, autoData, arrayIndex) {
                            var params, pd, keys;
                            if (val) {
                                autoData.searchText = _.isObject(val) ? val[form.initValueField || form.valueField] : val;
                                setTimeout(function () {
                                    if (!form.initQuery && form.initTextField) {
                                        keys = form.key.concat([]);
                                        keys.pop();
                                        autoData.selected = {};
                                        autoData.selected[form.valueField] = autoData.searchText;
                                        keys.push(form.initTextField);
                                        pd = jpp(formData).value(keys.join('.'));
                                        !pd && _.isObject(val) && (pd = jpp(val).value(keys.join('.')));
                                        autoData.selected[form.textField] = pd || _.isObject(val) ? jpp(val).value(form.initTextField) : val;
                                    }
                                }, 10);
                                if (form.initQuery) {
                                    params = _this.initSearchData(val, form.valueField);
                                    form.getInterfacesInfo(params).then(function (data) {
                                        if (data.length === 1) {
                                            autoData.selected = data[0];
                                        }
                                    });
                                }
                            }
                        };
                        form.onChange = function (item, form, model, modelArray, $index) {
                            modelArray && _.forEach(form.clearList, function (key) {
                                modelArray[key] = null;
                            }, _this);
                            _.forEach(form.copyValue, function (d, key) {
                                if (item[key]) {
                                    if (modelArray && modelArray[$index]) {
                                        modelArray[$index][d] = item[key];
                                    }
                                    else {
                                        formData[d] = item[key];
                                    }
                                }
                            }, _this);
                            if (modelArray) {
                                var key = _.last(form.key);
                                if (key !== $index) {
                                    modelArray[$index][key] = item ? item[form.valueField] : undefined;
                                }
                                else {
                                    modelArray[$index] = item ? item[form.valueField] : undefined;
                                }
                            }
                            else {
                                formData[form.key] = item ? item[form.valueField] : undefined;
                            }
                        };
                    };
                    AutocompleteService.prototype.init = function (form, formData) {
                        this.initAutoComplete(form, formData);
                        form.query = function (searchText, arrayModel, arrayIndex, $parent) {
                            if (form.queryServer) {
                                return searchText ? form.queryServer(searchText, arrayModel, arrayIndex, $parent) : [];
                            }
                            return form.data || [];
                        };
                    };
                    return AutocompleteService;
                }(material_controller_base_1.MaterialControllerBase));
                return new AutocompleteService();
            }];
        return AutocompleteServiceWrap;
    }());
    exports.AutocompleteServiceWrap = AutocompleteServiceWrap;
});
//# sourceMappingURL=autocomplete_service.js.map