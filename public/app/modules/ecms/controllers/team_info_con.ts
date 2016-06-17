import ref = require("ref");
import {PageManagerController} from "modules/page/controllers/manager_con";
import {ToolbarItem} from "common/models/toolbar_item";

export class TeamInfoController extends PageManagerController {
    public static $inject:Array<any> = PageManagerController.$inject.concat([]);
    public static _name = "TeamInfoController";

    private teamId:number;

    initKey() {
        super.initKey();
        this.teamId = ~~this.$stateParams["teamId"];
        //俱乐部ID
        if (!this.teamId) {
            console.warn(`不存在的俱乐部ID!`);
        }
    }

    initSearch(action) {
        super.initSearch(action);
        // 添加全局的搜索条件
        this.defQuery = {
            id: this.teamId
        };
        // 添加俱乐部详情按钮
        this.rootToolbars.push(new ToolbarItem({
            title: "俱乐部详细信息",
            icon: "info",
            onClick: ($event) => {
                this.toggleSearchBar();
            }
        }));
        // 默认显示俱乐部详情
        this.searchMode = true;
    }

}