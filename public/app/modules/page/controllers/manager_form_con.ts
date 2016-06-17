import ref = require("ref");
import {MaterialPopupController} from "common/controllers/material_popup_controller";
import * as _ from "lodash";
import * as jpp from "jsonPathProcessor";

export class PageManagerFormController extends MaterialPopupController<Object> {
    public static $inject:Array<string> = ["$rootScope", "$scope", "$q", "$http", "$mdDialog", "$mdToast", "material", "managerGrid", "Restangular", "currentItem", "$state", "$stateParams", "action", "menu", "sfPath", "MdAutocompleteBoost"];

    public static _name:string = "PageManagerFormController";
    public static _templateUrl = "app/modules/page/tpls/manager_form.html";

    /**
     * 操作的信息
     */
    protected action:any;
    /**
     * 当前模块的信息
     */
    protected menu:any;
    /**
     * 当前的操作中带有的详情接口
     */
    protected detailAction:any;
    /**
     * json路径的服务
     */
    protected sfPath:any;
    /**
     * autocomplete增强服务
     */
    protected MdAutocompleteBoost:any;

    /**
     * 构造
     */
    constructor() {
        super(arguments);
        this.init();
    }

    /**
     * 初始化
     * 查找detailView，如果有，则调用detailView中的接口，覆盖currentItem的值
     */
    init() {
        this.title = this.action.title;
        // 查找detail接口操作
        this.detailAction = _.find(this.menu.actions, (act) => {
            return act["key"].search("detail") >= 0;
        });
        // 如果需要detail操作,则执行
        if (this.detailAction && this.action.isNeedDetail) {
            this.initServerInterfaces(this.detailAction, this.currentItem, {}).then((serverInterfaces) => {
                this.isBusy = false;
                this.getDetailInfo(serverInterfaces, this.detailAction.interfaceObjects).then((results) => {
                    this.dealResults(this.detailAction, results, this);
                    this.initForm();
                });
            });
        } else {
            this.initForm();
        }
    }

    initInterfaces() {
        return this.dealInterfaces(this.action.interfaceObjects, this.serverInterfaces, this.formData, this.params);
    }

    /**
     * 获取详情信息
     */
    getDetailInfo(interfaces:{ [index:string]:Function }, interfaceObjects) {
        let promises;

        if (this.isBusy) return;
        this.isBusy = true;
        promises = this.dealInterfaces(interfaceObjects, interfaces, this.currentItem, this.params);
        return this.$q.all(promises)
            .finally(() => {
                this.isBusy = false;
            });
    }

    /**
     * 增强表单的表现能力
     */
    boostForm(forms:any) {
        if (!forms) forms = this.form;
        _.forEach(forms, (form)=> {
            switch (form.type.toLowerCase()) {
                case "array":
                case "tabarray":
                case "section":
                    this.boostForm(form.items);
                    break;
                case "autocomplete":
                    this.MdAutocompleteBoost.init(form, this.formData);
                    break;
            }
        }, this);
    }

    /**
     * 初始化表单
     * 获取表单所需接口信息
     * 获取schema信息
     * 设置默认值
     * 设置关闭回调函数
     */
    initForm() {
        this.initServerInterfaces(this.action, this.currentItem).then((serverInterfaces) => {
            this.serverInterfaces = serverInterfaces;
            this.params = this.action._queryParams;
            this.schema = this.action.dataSchema;
            this.action.formSchema && (this.form = this.action.formSchema.form);
            this.boostForm(this.form);
        });
        // this.$scope.$on("sf-render-finished", this.boostForm.bind(this, null));
        this.needData = true;
        this.currentItem = this.currentItem || {};
        this.formData = angular.extend({}, this.currentItem);

        // 是否需要清除当前的数据。
        // 例子：menu需要parentId的时候，但是不需要parentId对应的数据
        if (this.action.clearCurrentItem) {
            this.formData = {};
        }
        // 处理默认值方法
        if (typeof this.action.defaultDatas === "string") {
            this.action.defaultDatas = JSON.parse(this.action.defaultDatas);
        }
        // 配置 { field:"path.path" }
        _.forEach(this.action.defaultDatas, (field, key) => {
            let val = jpp(this).value(field.path);
            val && (jpp(this.formData).set(key, val, true));
        }, this);
        // 删除空属性
        this.deleteNullProperty(this.formData);
        // 成功文字
        this.content = this.action.title + "成功";
        // dialog关闭的事件
        this.dialogCloseFn = function () {
            this.material.alert(this.title, this.content).finally(() => {
                this.action.isRefresh && this.managerGrid && this.managerGrid.getServerData && this.managerGrid.getServerData();
            });
        }.bind(this);
    }
}