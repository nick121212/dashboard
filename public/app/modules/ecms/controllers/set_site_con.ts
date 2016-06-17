import ref = require("ref");
import {PageManagerController} from "modules/page/controllers/manager_con";

export class SetSiteController extends PageManagerController {
    public static $inject:Array<any> = PageManagerController.$inject.concat([]);
    public static _name = "SetSiteController";

    public currentItem:any;
    /**
     * 初始化key
     */
    initKey() {
        let site = localStorage.getItem("site");

        this.key = "setsite";
        if (site) {
            this.currentItem = {
                key: site,
                title: site
            };
        }
    }

    /**
     * 选择了SITE
     */
    doSelect(key) {
        this.close();
        if (this.$rootScope["site"] != key) {
            this.$rootScope["site"] = key;
            localStorage.setItem("site", key);
        }
    }
}