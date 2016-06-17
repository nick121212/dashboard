import {MaterialControllerBase} from "common/controllers/material_controller_base";
import * as _ from "lodash";
import * as jpp from "jsonPathProcessor";

/**
 * autocomplete的加强类
 * 支持interfaceKey配置查询
 *  "type": "autocomplete",  类型
 *  "noCache": true,         是否缓存
 *  "label": "搜索menu",     标题
 *  "textField": "title",    显示的字段
 *  "valueField": "key",     主键字段
 *  "searchField": "key",    搜索字段
 *  "initQuery": true        第一次是否需要查询
 *  "initTextField":""       第一次加载的title字段
 *  "initValueField":""      第一次加载的value字段,空的话则取valueField
 *  "where":{                搜索字段,这里直接使用model下的字段
 *       "bracket":"model.bracket_id"
 *     },
 *  "resultField": {         接口返回的数据字段
 *   "menus-fetch": "rows"
 *  },
 *  "interfaceKeys": [       调用的接口数组,目前只支持一个接口
 *      "menus-fetch"
 *  ]
 *
 * */
export class AutocompleteServiceWrap {
    public static _name:string = 'MdAutocompleteBoost';
    public static service:Array<string|Function> = ["$q", "$http", "$mdDialog", "$mdToast", "material", "Restangular", ($q, $http, $mdDialog, $mdToast, material, Restangular)=> {
        class AutocompleteService extends MaterialControllerBase {
            constructor() {
                super(null);
                this.$mdDialog = $mdDialog;
                this.Restangular = Restangular;
                this.$http = $http;
                this.material = material;
                this.$q = $q;
            }

            initSearchData(searchText, searchField, operation = "") {
                let keys, key, params = {where: {}};

                params["r-" + searchField + operation] = searchText;
                for (let p in params) {
                    if (!params.hasOwnProperty(p) || p === "where" || !params[p]) continue;
                    if (p.search("r-") === 0) {
                        keys = p.replace("r-", "").split(".");
                        keys.length > 0 && (key = keys[0]);
                        keys.length > 1 && (operation = keys[1]);
                        if (operation) {
                            params.where[key] = {};
                            params.where[key][operation] = params[p];
                        } else {
                            params.where[key] = params[p];
                        }
                    } else {
                        params.where[p] = params[p];
                    }
                    delete params[p];
                }

                return params;
            }

            initSearchWhere(formData, params, where) {
                let keys = null, pd;

                _.forEach(where, (path, key)=> {
                    keys = path.split('.');

                    if (keys.length) {
                        if (keys[0] == "model") {
                            pd = formData[keys[1]];
                        }
                        pd && (params.where[key] = pd);
                    }
                });

                return params;
            }

            initAutoComplete(form:any, formData:any) {
                if (!form.interfaceKeys || !angular.isArray(form.interfaceKeys) || form.interfaceKeys.length != 1) {
                    console.warn(`没有配置接口或者接口配置不正确。${form}`);
                    return;
                }

                form.getInterfacesInfo = (params)=> {
                    let resultData = [], defer = this.$q.defer();

                    // 获取接口信息
                    this.initServerOnlyInterfaces(form.interfaceKeys, params).then((results)=> {
                        this.$q.all(this.dealInterfaces(results.interfaceObjects, results.serverInterfaces, {}, {})).then((datas)=> {
                            _.each(form.resultField, (valuePath, key)=> {
                                let val = jpp(datas).value(`${key}.${valuePath}`)
                                angular.isArray(val) && (resultData = resultData.concat(val));
                            }, this);
                            defer.resolve(resultData);
                        });
                    });

                    return defer.promise;
                };

                // 调用接口,返回数据
                form.queryServer = (searchText, arrayModle, arrayIndex, $parent)=> {
                    let defer = this.$q.defer(), params;

                    params = this.initSearchData(searchText, form.searchField, form.operation);
                    params = this.initSearchWhere(formData, params, form.where || {});
                    form.getInterfacesInfo(params).then((data)=> {
                        defer.resolve(data);
                    });

                    return defer.promise;
                };

                form.init = (val, autoData, arrayIndex)=> {
                    let params, pd, keys;

                    if (val) {
                        autoData.searchText = _.isObject(val) ? val[form.initValueField || form.valueField] : val;
                        setTimeout(()=> {
                            // 如果存在initTextField 则初始化selected的值
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
                            params = this.initSearchData(val, form.valueField);
                            form.getInterfacesInfo(params).then((data)=> {
                                if (data.length === 1) {
                                    autoData.selected = data[0];
                                }
                            });
                        }
                    }
                };

                // onChange事件,重新获取数据
                form.onChange = (item, form, model, modelArray, $index)=> {

                    // 删除掉指定的属性
                    modelArray && _.forEach(form.clearList, (key)=> {
                        modelArray[key] = null;
                    }, this);
                    // 添加一些信息到数据源
                    _.forEach(form.copyValue, (d, key)=> {
                        if (item[key]) {
                            if (modelArray && modelArray[$index]) {
                                modelArray[$index][d] = item[key];
                            } else {
                                formData[d] = item[key]
                            }
                        }
                    }, this);

                    // 根据设置的值
                    if (modelArray) {
                        let key = _.last(form.key) as string;

                        if (key !== $index) {
                            modelArray[$index][key] = item ? item[form.valueField] : undefined;
                        } else {
                            modelArray[$index] = item ? item[form.valueField] : undefined;
                        }
                    } else {
                        formData[form.key] = item ? item[form.valueField] : undefined;
                    }

                };
            }

            init(form, formData) {
                this.initAutoComplete(form, formData);
                form.query = (searchText:string, arrayModel, arrayIndex, $parent)=> {
                    if (form.queryServer) {
                        return searchText ? form.queryServer(searchText, arrayModel, arrayIndex, $parent) : [];
                    }
                    return form.data || [];
                };
            }
        }

        return new AutocompleteService();
    }];

    constructor(module:angular.IModule) {
        module.service(AutocompleteServiceWrap._name, AutocompleteServiceWrap.service);
    }
}