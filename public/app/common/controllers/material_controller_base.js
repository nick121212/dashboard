var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "common/controllers/controller_base", "jsonPathProcessor"], function (require, exports, controller_base_1, jpp) {
    "use strict";
    var MaterialControllerBase = (function (_super) {
        __extends(MaterialControllerBase, _super);
        function MaterialControllerBase(args) {
            _super.call(this, args);
            this.isBusy = false;
            this.serverInterfaces = {};
        }
        MaterialControllerBase.prototype.close = function () {
            this.$mdDialog && this.$mdDialog.cancel();
        };
        MaterialControllerBase.prototype.initHref = function (inteface, item) {
            var _this = this;
            var restInterface = null;
            _.each((inteface.api || inteface).split("/"), function (href) {
                if (href.search(":") === 0) {
                    href = item[href.substring(1)];
                }
                if (!restInterface) {
                    restInterface = _this.Restangular.all(href);
                }
                else {
                    restInterface = restInterface.all(href);
                }
            }, this);
            return restInterface;
        };
        MaterialControllerBase.prototype.initServerOnlyInterfaces = function (interfaceKeys, queryData, item) {
            var _this = this;
            if (queryData === void 0) { queryData = {}; }
            if (item === void 0) { item = {}; }
            var defer = this.$q.defer();
            var interfaceObjects = [];
            var restInterface;
            var serverInterfaces = {};
            this.$q.all({
                interfaces: this.Restangular.all("interfaces").doGET.bind(this, null, {
                    _interfaceKey: "interfaces-fetch",
                    filter: { where: { key: { $in: interfaceKeys } } }
                })(),
            }).then(function (results) {
                interfaceObjects = results["interfaces"].rows;
                _.each(interfaceObjects, function (inteface) {
                    var params = {};
                    if (inteface.isSystem) {
                        restInterface = _this.initHref(inteface, _.extend({}, item, queryData));
                        restInterface = restInterface["do" + inteface.verb];
                    }
                    else {
                        restInterface = _this.Restangular.one("interfaces", inteface.key).all("execute");
                        restInterface = restInterface.doPOST;
                    }
                    params[inteface.prefix || "filter"] = queryData;
                    _.extend(params, { _interfaceKey: inteface.key });
                    restInterface._queryParams = params;
                    serverInterfaces[inteface.key] = restInterface;
                }, _this);
                defer.resolve({
                    serverInterfaces: serverInterfaces,
                    interfaceObjects: interfaceObjects,
                    item: item
                });
            });
            return defer.promise;
        };
        MaterialControllerBase.prototype.initServerInterfaces = function (action, queryData, item) {
            var _this = this;
            if (queryData === void 0) { queryData = {}; }
            if (item === void 0) { item = {}; }
            var defer = this.$q.defer();
            var restInterface = null;
            var serverInterfaces = {};
            var interfaceKeys = [];
            var schemaKeys = [];
            interfaceKeys = JSON.parse(action.interfaces);
            action.searchSchemaKey && schemaKeys.push(action.searchSchemaKey);
            action.formSchemaKey && schemaKeys.push(action.formSchemaKey);
            action.dataSchemaKey && schemaKeys.push(action.dataSchemaKey);
            this.$q.all({
                interfaces: this.Restangular.all("interfaces").doGET.bind(this, null, {
                    _interfaceKey: "interfaces-fetch",
                    filter: { where: { key: { $in: interfaceKeys } } }
                })(),
                schemas: this.Restangular.all("schemas").doGET.bind(this, null, {
                    _interfaceKey: "schemas-fetch",
                    filter: { where: { key: { $in: schemaKeys } } }
                })()
            }).then(function (results) {
                var schemas = _.keyBy(results["schemas"].rows, "key");
                action.searchSchema = schemas[action.searchSchemaKey];
                action.formSchema = schemas[action.formSchemaKey];
                action.dataSchema = schemas[action.dataSchemaKey];
                action.searchSchema && action.searchSchema.content && (action.searchSchema = JSON.parse(action.searchSchema.content));
                action.formSchema && action.formSchema.content && (action.formSchema = JSON.parse(action.formSchema.content));
                action.dataSchema && action.dataSchema.content && (action.dataSchema = JSON.parse(action.dataSchema.content));
                action.interfaceObjects = results["interfaces"].rows;
                _.each(action.interfaceObjects, function (inteface) {
                    var params = {};
                    if (inteface.isSystem) {
                        restInterface = _this.initHref(inteface, _.extend({}, item, queryData));
                        restInterface = restInterface["do" + inteface.verb];
                    }
                    else {
                        restInterface = _this.Restangular.one("interfaces", inteface.key).all("execute");
                        restInterface = restInterface.doPOST;
                    }
                    params[inteface.prefix || "filter"] = queryData;
                    _.extend(params, { _interfaceKey: inteface.key });
                    restInterface._queryParams = params;
                    serverInterfaces[inteface.key] = restInterface;
                }, _this);
                defer.resolve(serverInterfaces);
            }).finally(function () {
            });
            return defer.promise;
        };
        MaterialControllerBase.prototype.dealInterfaces = function (interfaceObjects, interfaces, data, params) {
            var promises = {};
            _.each(interfaceObjects, function (inteface) {
                var fn = interfaces[inteface.key];
                var verb = inteface.isSystem ? inteface.verb : "post";
                var _params = _.extend({}, fn._queryParams || {});
                !inteface.needParams && (_params = { _interfaceKey: _params["_interfaceKey"] });
                switch (verb.toLowerCase()) {
                    case "post":
                    case "put":
                        promises[inteface.key] = fn(inteface.needDatas ? data : null, null, _.extend({}, _params, (inteface.needParams ? params : null)));
                        break;
                    default:
                        promises[inteface.key] = fn(inteface.needDatas ? data : null, _.extend({}, _params, (inteface.needParams ? params : null)));
                        break;
                }
            });
            return promises;
        };
        MaterialControllerBase.prototype.dealResults = function (action, results, context) {
            var _this = this;
            if (context === void 0) { context = this; }
            _.each(action.interfaceObjects, function (inteface) {
                var result = results[inteface.key];
                if (!result) {
                    return;
                }
                (typeof result.plain === "function") && (result = result.plain());
                if (typeof inteface.fields === "string") {
                    inteface.fields = JSON.parse(inteface.fields);
                }
                _.each(inteface.fields, function (field) {
                    var pd = null;
                    if (field.path === "all") {
                        jpp(context).set(field.field, result, true);
                    }
                    else {
                        pd = jpp(result).value(field.path);
                        pd && jpp(context).set(field.field, pd, true);
                    }
                }, _this);
            }, this);
        };
        MaterialControllerBase.prototype.deleteNullProperty = function (data) {
            _.each(data, function (d, key) {
                if (d == null || d === undefined) {
                    delete data[key];
                }
            }, this);
        };
        return MaterialControllerBase;
    }(controller_base_1.ControllerBase));
    exports.MaterialControllerBase = MaterialControllerBase;
});
//# sourceMappingURL=material_controller_base.js.map