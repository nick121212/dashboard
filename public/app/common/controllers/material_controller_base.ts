import ref = require("ref");
import {ControllerBase} from "common/controllers/controller_base";
import {IMaterialService} from "common/interfaces/material_service";
import * as jpp from "jsonPathProcessor";

export class MaterialControllerBase extends ControllerBase {
    /**
     * ngMaterial的基础provider封装
     * */
    protected material:IMaterialService;
    /**
     * ngMaterial 弹窗服务
     * */
    protected $mdDialog:angular.material.IDialogService;
    /**
     * 是否处于忙碌状态
     * */
    public isBusy:boolean = false;
    /**
     * 用户表单的验证
     * */
    public schema:Object;
    /**
     * 用于多个接口同时返回
     * */
    public serverInterfaces:{ [index:string]:angular.IPromise<any> } = {};
    /**
     * 标题
     * */
    public title:string;
    /**
     * 图标，依赖于angular-material-icons
     * */
    public icon:any;
    /**
     * restangular
     */
    public Restangular:any;

    /**
     * 构造
     * args: arguments
     * */
    constructor(args:IArguments) {
        super(args);
    }

    /**
     * 关闭表单
     */
    close() {
        this.$mdDialog && this.$mdDialog.cancel();
    }

    /**
     * 处理地址，menus/:id => menus/1
     */
    private initHref(inteface, item?:{}) {
        let restInterface = null;

        _.each((inteface.api || inteface).split("/"), (href) => {
            if (href.search(":") === 0) {
                href = item[href.substring(1)];
            }
            if (!restInterface) {
                restInterface = this.Restangular.all(href);
            } else {
                restInterface = restInterface.all(href);
            }
        }, this);

        return restInterface;
    }

    initServerOnlyInterfaces(interfaceKeys:Array<string>, queryData:Object = {}, item:Object = {}):angular.IPromise<any> {
        let defer = this.$q.defer();
        let interfaceObjects = [];
        let restInterface;
        let serverInterfaces = {};

        this.$q.all({
            interfaces: this.Restangular.all("interfaces").doGET.bind(this, null, {
                _interfaceKey: "interfaces-fetch",
                filter: {where: {key: {$in: interfaceKeys}}}
            })(),
        }).then((results) => {
            // 处理接口信息
            interfaceObjects = results["interfaces"].rows;
            _.each(interfaceObjects, (inteface) => {
                let params = {};
                // 本地接口
                if (inteface.isSystem) {
                    restInterface = this.initHref(inteface, _.extend({}, item, queryData));
                    restInterface = restInterface["do" + inteface.verb];
                } else {
                    restInterface = this.Restangular.one("interfaces", inteface.key).all("execute");
                    restInterface = restInterface.doPOST;
                }
                params[inteface.prefix || "filter"] = queryData;
                _.extend(params, {_interfaceKey: inteface.key});
                restInterface._queryParams = params;
                serverInterfaces[inteface.key] = restInterface;
            }, this);
            // 返回promise
            defer.resolve({
                serverInterfaces: serverInterfaces,
                interfaceObjects: interfaceObjects,
                item: item
            });
        });

        return defer.promise;
    }

    /**
     * 初始化接口信息，生成rest风格
     * @param action 操作的信息
     * @param queryData 搜索的信息
     * @return promise
     */
    initServerInterfaces(action, queryData:Object = {}, item:Object = {}):angular.IPromise<any> {
        let defer = this.$q.defer();
        let restInterface = null;
        let serverInterfaces = {};
        let interfaceKeys = [];
        let schemaKeys = [];

        interfaceKeys = JSON.parse(action.interfaces);
        action.searchSchemaKey && schemaKeys.push(action.searchSchemaKey);
        action.formSchemaKey && schemaKeys.push(action.formSchemaKey);
        action.dataSchemaKey && schemaKeys.push(action.dataSchemaKey);

        this.$q.all({
            interfaces: this.Restangular.all("interfaces").doGET.bind(this, null, {
                _interfaceKey: "interfaces-fetch",
                filter: {where: {key: {$in: interfaceKeys}}}
            })(),
            schemas: this.Restangular.all("schemas").doGET.bind(this, null, {
                _interfaceKey: "schemas-fetch",
                filter: {where: {key: {$in: schemaKeys}}}
            })()
        }).then((results) => {
            // 处理SCHEMA信息
            let schemas = _.keyBy(results["schemas"].rows, "key");
            action.searchSchema = schemas[action.searchSchemaKey];
            action.formSchema = schemas[action.formSchemaKey];
            action.dataSchema = schemas[action.dataSchemaKey];

            action.searchSchema && action.searchSchema.content && (action.searchSchema = JSON.parse(action.searchSchema.content));
            action.formSchema && action.formSchema.content && (action.formSchema = JSON.parse(action.formSchema.content));
            action.dataSchema && action.dataSchema.content && (action.dataSchema = JSON.parse(action.dataSchema.content));

            // 处理接口信息
            action.interfaceObjects = results["interfaces"].rows;
            _.each(action.interfaceObjects, (inteface) => {
                let params = {};
                // 本地接口
                if (inteface.isSystem) {
                    restInterface = this.initHref(inteface, _.extend({}, item, queryData));
                    restInterface = restInterface["do" + inteface.verb];
                } else {
                    restInterface = this.Restangular.one("interfaces", inteface.key).all("execute");
                    restInterface = restInterface.doPOST;
                }
                params[inteface.prefix || "filter"] = queryData;
                _.extend(params, {_interfaceKey: inteface.key});
                restInterface._queryParams = params;
                serverInterfaces[inteface.key] = restInterface;
            }, this);
            // 返回promise
            defer.resolve(serverInterfaces);
        }).finally(() => {
            // this.isBusy = false;
        });

        return defer.promise;
    }

    dealInterfaces(interfaceObjects, interfaces, data, params) {
        let promises:{ [index:string]:ng.IPromise<any> } = {};

        _.each(interfaceObjects, (inteface) => {
            let fn = interfaces[inteface.key];
            let verb = inteface.isSystem ? inteface.verb : "post";
            let _params = _.extend({}, fn._queryParams || {});

            !inteface.needParams && (_params = {_interfaceKey: _params["_interfaceKey"]});
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
    }

    /**
     * 更新数据
     * @params action       操作信息
     * @params results      返回的数据
     * @params context      上下文JSON
     *
     * */
    dealResults(action, results, context:any = this) {
        _.each(action.interfaceObjects, (inteface) => {
            let result = results[inteface.key];

            if (!result) {
                return;
            }

            (typeof result.plain === "function") && (result = result.plain());
            if (typeof inteface.fields === "string") {
                inteface.fields = JSON.parse(inteface.fields);
            }

            _.each(inteface.fields, (field) => {
                let pd = null;

                if (field.path === "all") {
                    jpp(context).set(field.field, result, true);
                } else {
                    pd = jpp(result).value(field.path);
                    pd && jpp(context).set(field.field, pd, true);
                }
            }, this);
        }, this);
    }

    /**
     * 删除所有的自定义属性
     */
    deleteNullProperty(data:Object) {
        _.each(data, (d, key) => {
            if (d == null || d === undefined) {
                delete data[key];
            }
        }, this);
    }
}