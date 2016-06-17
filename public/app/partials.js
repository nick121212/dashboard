angular.module('partial_module', ['app/common/directives/fileupload.tpl.html', 'app/common/material-decorator/datepicker.html', 'app/common/material-decorator/fileupload.html', 'app/common/material-decorator/image.html', 'app/common/material-decorator/jsoneditor.html', 'app/common/material-decorator/radio-image.html', 'app/common/material-decorator/ueditor.html', 'app/modules/ecms/tpls/group_action.html', 'app/modules/ecms/tpls/role_group.html', 'app/modules/ecms/tpls/set_site.html', 'app/modules/ecms/tpls/team_info.html', 'app/modules/home/tpls/content.html', 'app/modules/home/tpls/index.html', 'app/modules/home/tpls/left.html', 'app/modules/home/tpls/right.html', 'app/modules/page/tpls/manager.html', 'app/modules/page/tpls/manager_form.html', 'app/modules/page/tpls/search.html', 'app/modules/page/tpls/toolbar.html', 'app/modules/passport/tpls/index.html', 'app/modules/passport/tpls/login.html']);

angular.module("app/common/directives/fileupload.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/common/directives/fileupload.tpl.html",
    "<md-content flex layout=\"column\" ng-if=\"fileUploadCtl.uploader\">\n" +
    "    <md-content flex layout=\"row\">\n" +
    "        <md-input-container class=\"md-block\" flex>\n" +
    "            <label>{{fileUploadCtl.title}}</label>\n" +
    "            <input readonly=\"readonly\" ng-model=\"fileUploadCtl.url\">\n" +
    "            <md-progress-linear ng-show=\"fileUploadCtl.uploader.isUploading || fileUpload.isBusy\"\n" +
    "                                md-mode=\"{{fileUpload.isBusy?'Indeterminate':'determinate'}}\"\n" +
    "                                value=\"{{fileUploadCtl.progress}}\"></md-progress-linear>\n" +
    "            <div ng-transclude></div>\n" +
    "        </md-input-container>\n" +
    "        <md-input-container>\n" +
    "            <md-button class=\"md-icon-button\" ng-disabled=\"fileUploadCtl.uploader.isUploading\">\n" +
    "                <md-tooltip>{{ fileUploadCtl.uploader.isUploading?'上传中':'添加文件' }}</md-tooltip>\n" +
    "                <ng-md-icon icon=\"{{ fileUploadCtl.uploader.isUploading?'file_upload':'add'}}\"></ng-md-icon>\n" +
    "                <input ng-show=\"!fileUploadCtl.uploader.isUploading\"\n" +
    "                       style=\"position:absolute;top:0;line-height:200px;height:200px;\" type=\"file\"\n" +
    "                       nv-file-select=\"\" uploader=\"fileUploadCtl.uploader\"/>\n" +
    "            </md-button>\n" +
    "            <md-button aria-label=\"展开数据\" ng-if=\"fileUploadCtl.showList\" class=\"md-icon-button\"\n" +
    "                       ng-click=\"fileUploadCtl.doShowList()\">\n" +
    "                <ng-md-icon icon=\"{{fileUploadCtl.isShowList?'expand_less':'expand_more'}}\"></ng-md-icon>\n" +
    "            </md-button>\n" +
    "        </md-input-container>\n" +
    "    </md-content>\n" +
    "\n" +
    "    <md-content ng-cloak class=\"nga-fast nga-stagger-fast nga-fade md-whiteframe-2dp\" flex layout=\"column\"\n" +
    "                ng-show=\"fileUploadCtl.isShowList\">\n" +
    "        <div layout=\"row\" layout-wrap>\n" +
    "            <md-card ng-repeat=\"tile in fileUploadCtl.clientData.datas\">\n" +
    "                <md-card-title>\n" +
    "                    <md-card-title-media>\n" +
    "                        <div class=\"md-media card-media\">\n" +
    "                            <img ng-src=\"{{tile.url | zoom:'-220x124'}}\" alt=\"tile.mtime\">\n" +
    "                        </div>\n" +
    "                    </md-card-title-media>\n" +
    "                </md-card-title>\n" +
    "                <md-card-actions layout=\"row\" layout-align=\"end center\">\n" +
    "                    <md-button aria-label=\"选择图片\" class=\"md-icon-button\" ng-click=\"fileUploadCtl.doSelect(tile)\">\n" +
    "                        <ng-md-icon ng-style=\"{fill:fileUploadCtl.url === tile.url?'red':''}\"\n" +
    "                                    icon=\"{{fileUploadCtl.url === tile.url?'photo_size_select_actual':'photo_size_select_small'}}\">\n" +
    "                        </ng-md-icon>\n" +
    "                    </md-button>\n" +
    "                </md-card-actions>\n" +
    "            </md-card>\n" +
    "        </div>\n" +
    "        <md-table-pagination class=\"md-table-pagination\" flex md-limit=\"fileUploadCtl.queryData.limit\"\n" +
    "                             md-page=\"fileUploadCtl.queryData.page\"\n" +
    "                             md-options=\"fileUploadCtl.rowSelect\" md-on-paginate=\"fileUploadCtl.onPageChangeBind\"\n" +
    "                             md-total=\"{{fileUploadCtl.clientData.total}}\">\n" +
    "        </md-table-pagination>\n" +
    "    </md-content>\n" +
    "</md-content>");
}]);

angular.module("app/common/material-decorator/datepicker.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/common/material-decorator/datepicker.html",
    "<div aria-label=\"{{ form.title }}\"\n" +
    "     md-is-error=\"ngModel.$error && ngModel.$invalid\"\n" +
    "     class=\"{{form.htmlClass}} schema-form-datepicker md-block\" style=\"position: relative;\">\n" +
    "    <!--<h3 ng-show=\"form.title && form.notitle !== true\">{{ form.title }}</h3>-->\n" +
    "    <sm-date-time-picker fname=\"{{ form.fname }}\"\n" +
    "                         lable=\"{{ form.title }}\"\n" +
    "                         value=\"$$value$$\"\n" +
    "                         ng-model=\"$$value$$\"\n" +
    "                         sf-field-model=\"replaceAll\"\n" +
    "                         start-date=\"form.startDate\"\n" +
    "                         schema-validate=\"form\"\n" +
    "                         fname=\"{{ form.key|sfCamelKey }}\"\n" +
    "                         sf-changed=\"form\"\n" +
    "                         flex\n" +
    "                         class=\"md-block\"\n" +
    "                         min-date=\"form.minDate\"\n" +
    "                         max-date=\"form.maxDate\"\n" +
    "                         format=\"{{ form.formatStr || 'YYYY-MM-DD' }}\"\n" +
    "                         week-start-day=\"{{ form.startDay || 'Monday' }}\">\n" +
    "    </sm-date-time-picker>\n" +
    "\n" +
    "    <md-input-container style=\"padding:0;margin:0;position:absolute;top:35px;\" >\n" +
    "        <!--<input class=\"hide\" type=\"text\" ng-model=\"$$value$$\" sf-field-model schema-validate=\"form\">-->\n" +
    "        <div ng-messages=\"ngModel.$error\" aria-live=\"assertive\" md-auto-hide=\"false\">\n" +
    "            <div sf-message ng-message></div>\n" +
    "        </div>\n" +
    "        <div class=\"md-char-counter\">{{ form.description }}</div>\n" +
    "    </md-input-container>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/common/material-decorator/fileupload.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/common/material-decorator/fileupload.html",
    "<div class=\"schema-form-uploader\" ng-class=\"form.htmlClass\" flex>\n" +
    "    <file-upload upload-path=\"form.uploadPath\" show-list=\"form.showList\" upload-type=\"form.uploadType\" title=\"form.title\" sf-field-model sf-changed=\"form\" schema-validate=\"form\" ng-model=\"$$value$$\"\n" +
    "    filters=\"form.filters\">\n" +
    "        <div ng-messages=\"ngModel.$error\" aria-live=\"assertive\">\n" +
    "            <div sf-message ng-message></div>\n" +
    "        </div>\n" +
    "        <div class=\"md-char-counter\">{{ form.description }}</div>\n" +
    "    </file-upload>\n" +
    "</div>");
}]);

angular.module("app/common/material-decorator/image.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/common/material-decorator/image.html",
    "<div aria-label=\"{{ form.title }}\" class=\"{{form.htmlClass}} md-block\">\n" +
    "    <h3 ng-show=\"form.title && form.notitle !== true\">{{ form.title }}</h3>\n" +
    "\n" +
    "    <img  alt=\"{{ form.title }}\" ng-src=\"{{ $$value$$ }}\" sf-field-model=\"replaceAll\">\n" +
    "</div>");
}]);

angular.module("app/common/material-decorator/jsoneditor.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/common/material-decorator/jsoneditor.html",
    "<md-input-container aria-label=\"{{ form.title }}\" md-is-error=\"ngModel.$error && ngModel.$invalid\" class=\"{{form.htmlClass}} md-input-has-messages schema-form-jsoneditor md-block\">\n" +
    "    <h3 ng-show=\"form.title && form.notitle !== true\">{{ form.title }}</h3>\n" +
    "    <div ng-jsoneditor class=\"{{form.htmlClass}}\" style=\"height: 500px;\" flex sf-field-model prefer-text=\"form.preferText\" sf-changed=\"form\"\n" +
    "         schema-validate=\"form\" ng-model=\"$$value$$\" options=\"form.jsonOptions\"></div>\n" +
    "\n" +
    "    <input class=\"hide\" />\n" +
    "\n" +
    "    <div ng-messages=\"ngModel.$error\" aria-live=\"assertive\" md-auto-hide=\"false\">\n" +
    "        <div sf-message ng-message></div>\n" +
    "    </div>\n" +
    "    <div class=\"md-char-counter\">{{ form.description }}</div>\n" +
    "</md-input-container>");
}]);

angular.module("app/common/material-decorator/radio-image.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/common/material-decorator/radio-image.html",
    "<div class=\"schema-form-{{form.type}} {{form.htmlClass}}\">\n" +
    "\n" +
    "    <label ng-show=\"::showTitle()\">{{::form.title}}</label>\n" +
    "    <md-select sf-field-model name=\"{{ ::form.key|sfCamelKey }}\" schema-validate=\"form\" ng-model=\"$$value$$\">\n" +
    "        <md-optgroup ng-repeat-start=\"(key, opt) in model[form.datas]\" ng-if=\"opt[form.group] && opt[form.group] != optGroups[key-1][form.group]\"\n" +
    "            label=\"{{::opt[form.group]}}\" aria-label=\"{{::opt[form.group]}}\">\n" +
    "            <md-option ng-repeat=\"(key, filtered) in model[form.datas]\" ng-if=\"!!filtered.disabled\" ng-value=\"::filtered[form.group]\"\n" +
    "                aria-label=\"{{::filtered[form.name]}}\">\n" +
    "                <img style=\"width:30px;\" ng-src=\"{{filtered[form.img]}}\" alt=\"\">\n" +
    "                {{::filtered[form.name]}}\n" +
    "            </md-option>\n" +
    "        </md-optgroup>\n" +
    "        <md-option ng-if=\"!opt[form.group]\" ng-value=\"::opt[form.value]\" ng-repeat-end>\n" +
    "            <img style=\"width:30px;\" ng-src=\"{{opt[form.img]}}\" alt=\"\"> {{::opt[form.name]}}\n" +
    "        </md-option>\n" +
    "    </md-select>\n" +
    "\n" +
    "    <div ng-messages=\"ngModel.$error\">\n" +
    "        <div sf-message ng-message></div>\n" +
    "    </div>\n" +
    "    <div class=\"md-char-counter\">{{ form.description }}</div>\n" +
    "</div>");
}]);

angular.module("app/common/material-decorator/ueditor.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/common/material-decorator/ueditor.html",
    "<md-input-container aria-label=\"{{ form.title }}\" class=\"{{form.htmlClass}} md-input-has-messages schema-form-jsoneditor md-block\">\n" +
    "    <h3 ng-show=\"form.title && form.notitle !== true\">{{ form.title }}</h3>\n" +
    "\n" +
    "    <div class=\"ueditor\" config=\"form.config\" ng-model=\"$$value$$\"></div>\n" +
    "\n" +
    "    <div ng-messages=\"ngModel.$error\" aria-live=\"assertive\">\n" +
    "        <div sf-message ng-message></div>\n" +
    "    </div>\n" +
    "    <div class=\"md-char-counter\">{{ form.description }}</div>\n" +
    "</md-input-container>");
}]);

angular.module("app/modules/ecms/tpls/group_action.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/modules/ecms/tpls/group_action.html",
    "<md-dialog aria-label=\"formCtl.title\"\n" +
    "           class=\"flex-sm-100 flex-80\">\n" +
    "    <md-toolbar md-theme=\"dark\">\n" +
    "        <div class=\"md-toolbar-tools\">\n" +
    "            <h2>{{formCtl.title}}</h2>\n" +
    "            <span flex></span>\n" +
    "            <md-button class=\"md-icon-button\"\n" +
    "                       aria-label=\"close\"\n" +
    "                       ng-hide=\"formCtl.isBusy\"\n" +
    "                       ng-click=\"formCtl.close()\">\n" +
    "                <ng-md-icon icon=\"close\"></ng-md-icon>\n" +
    "            </md-button>\n" +
    "        </div>\n" +
    "    </md-toolbar>\n" +
    "    <md-dialog-content flex layout=\"column\">\n" +
    "        <md-progress-linear ng-if=\"formCtl.isBusy\" md-mode=\"indeterminate\"></md-progress-linear>\n" +
    "        <md-content flex>\n" +
    "            <section ng-repeat=\"menu in formCtl.menus\">\n" +
    "                <md-subheader class=\"md-primary\">{{ menu.title }}</md-subheader>\n" +
    "                <md-list layout-padding>\n" +
    "                    <md-list-item ng-repeat=\"action in formCtl.actions | filter :{'parentKey':menu.key}:true\"\n" +
    "                                  ng-click=\"formCtl.toggleAction(action)\"\n" +
    "                                  layout=\"row\">\n" +
    "                        <ng-md-icon ng-style=\"{fill:action.isList?'red':''}\" icon=\"{{action.icon}}\"></ng-md-icon>\n" +
    "                        <span flex>{{ action.title }}</span>\n" +
    "                        <ng-md-icon ng-show=\"formCtl.checked(action)\" icon=\"done\"></ng-md-icon>\n" +
    "                    </md-list-item>\n" +
    "                </md-list>\n" +
    "                <md-divider></md-divider>\n" +
    "            </section>\n" +
    "        </md-content>\n" +
    "    </md-dialog-content>\n" +
    "    <md-dialog-actions layout=\"row\">\n" +
    "        <span flex></span>\n" +
    "        <md-button ng-disabled=\"formCtl.isBusy\"\n" +
    "                   aria-label=\"formCtl.title\"\n" +
    "                   ng-click=\"formCtl.submitNoForm()\">\n" +
    "            决定了\n" +
    "        </md-button>\n" +
    "    </md-dialog-actions>\n" +
    "</md-dialog>\n" +
    "\n" +
    "");
}]);

angular.module("app/modules/ecms/tpls/role_group.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/modules/ecms/tpls/role_group.html",
    "<md-dialog aria-label=\"formCtl.title\" class=\"flex-sm-100 flex-80\">\n" +
    "    <md-toolbar md-theme=\"dark\">\n" +
    "        <div class=\"md-toolbar-tools\">\n" +
    "            <h2>{{formCtl.title}}</h2>\n" +
    "            <span flex></span>\n" +
    "            <md-button class=\"md-icon-button\" aria-label=\"close\" ng-hide=\"formCtl.isBusy\" ng-click=\"formCtl.close()\">\n" +
    "                <ng-md-icon icon=\"close\"></ng-md-icon>\n" +
    "            </md-button>\n" +
    "        </div>\n" +
    "    </md-toolbar>\n" +
    "    <md-dialog-content flex layout=\"column\">\n" +
    "        <md-progress-linear ng-if=\"formCtl.isBusy\" md-mode=\"indeterminate\"></md-progress-linear>\n" +
    "        <md-content flex>\n" +
    "            <md-list layout-padding>\n" +
    "                <md-list-item ng-repeat=\"group in formCtl.groups\" ng-click=\"formCtl.toggleAction(group)\" layout=\"row\">\n" +
    "                    <span>{{ group.title }}</span>\n" +
    "                    <span flex>--------{{ group.description }}</span>\n" +
    "                    <ng-md-icon ng-show=\"formCtl.checked(group)\" icon=\"done\"></ng-md-icon>\n" +
    "                </md-list-item>\n" +
    "            </md-list>\n" +
    "        </md-content>\n" +
    "    </md-dialog-content>\n" +
    "    <md-dialog-actions layout=\"row\">\n" +
    "        <span flex></span>\n" +
    "        <md-button ng-disabled=\"formCtl.isBusy\" aria-label=\"formCtl.title\" ng-click=\"formCtl.submitNoForm()\">\n" +
    "            决定了\n" +
    "        </md-button>\n" +
    "    </md-dialog-actions>\n" +
    "</md-dialog>");
}]);

angular.module("app/modules/ecms/tpls/set_site.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/modules/ecms/tpls/set_site.html",
    "<md-dialog md-theme=\"dark\"\n" +
    "           aria-label=\"设置当前站点\"\n" +
    "           flex-gt-sm=\"80\"\n" +
    "           flex=\"100\">\n" +
    "    <md-toolbar md-theme=\"dark\">\n" +
    "        <div class=\"md-toolbar-tools\">\n" +
    "            <h2>{{ formCtl.menu.title }}</h2>\n" +
    "            <span flex></span>\n" +
    "            <md-button class=\"md-icon-button\"\n" +
    "                       ng-show=\"!formCtl.isBusy\"\n" +
    "                       ng-click=\"formCtl.close()\">\n" +
    "                <ng-md-icon icon=\"close\"></ng-md-icon>\n" +
    "            </md-button>\n" +
    "        </div>\n" +
    "    </md-toolbar>\n" +
    "    <md-dialog-content flex class=\"md-padding\">\n" +
    "        <md-progress-linear ng-if=\"formCtl.isBusy\" md-mode=\"indeterminate\"></md-progress-linear>\n" +
    "        <md-radio-group ng-model=\"formCtl.currentItem.key\">\n" +
    "            <div ng-repeat=\"item in formCtl.clientData.datas\" layout=\"row\">\n" +
    "                <div flex layout=\"row\" layout-padding layout-align=\"start center\">\n" +
    "                    <md-radio-button flex\n" +
    "                                     ng-value=\"item.key\"\n" +
    "                                     class=\"md-primary\">\n" +
    "                        {{item.title}}\n" +
    "                    </md-radio-button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </md-radio-group>\n" +
    "    </md-dialog-content>\n" +
    "    <md-dialog-actions layout=\"row\">\n" +
    "        <span flex></span>\n" +
    "        <md-button ng-disabled=\"formCtl.isBusy\"\n" +
    "                   ng-click=\"formCtl.doSelect(formCtl.currentItem.key)\">\n" +
    "            选择当前的站点\n" +
    "        </md-button>\n" +
    "    </md-dialog-actions>\n" +
    "</md-dialog>\n" +
    "\n" +
    "");
}]);

angular.module("app/modules/ecms/tpls/team_info.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/modules/ecms/tpls/team_info.html",
    "<!--表格数据-->\n" +
    "<md-content layout=\"row\" flex>\n" +
    "    <md-content flex layout=\"column\" md-theme=\"dark\">\n" +
    "        <ng-include src=\"'ecms/app/modules/page/tpls/toolbar.html'\"></ng-include>\n" +
    "        <md-divider></md-divider>\n" +
    "        <md-table-container flex>\n" +
    "            <table md-table flex class=\"md-table\" ng-model=\"managerCtl.selected\" flex md-progress=\"managerCtl.deferred\">\n" +
    "                <thead md-head md-order=\"managerCtl.queryData.order\" md-content=\"managerCtl\"\n" +
    "                       md-trigger=\"managerCtl.onOrderChange\">\n" +
    "                <tr md-row>\n" +
    "                    <th md-column ng-repeat=\"column in managerCtl.columns\">\n" +
    "                        {{::column.name}}\n" +
    "                    </th>\n" +
    "                    <th md-column ng-if=\"managerCtl.itemToolbars.length\"></th>\n" +
    "                </tr>\n" +
    "                </thead>\n" +
    "                <tbody md-body>\n" +
    "                <tr md-row md-auto-select ng-repeat=\"item in managerCtl.clientData.datas\">\n" +
    "                    <td md-cell ng-repeat=\"column in managerCtl.columns\">\n" +
    "                        <span dy-compile $index=\"$parent.$index+1\" parent=\"managerCtl\" query=\"managerCtl.queryData\"\n" +
    "                              item=\"item\" html=\"{{column.template}}\"></span>\n" +
    "                    </td>\n" +
    "                    <td md-cell>\n" +
    "                        <gridmenu aria-label=\"打开菜单\" ng-if=\"managerCtl.itemToolbars.length\"\n" +
    "                                  tools=\"managerCtl.itemToolbars\" item=\"item\" is-busy=\"managerCtl.isBusy\"\n" +
    "                                  open-menu=\"managerCtl.material.openMenu\"></gridmenu>\n" +
    "                    </td>\n" +
    "                </tr>\n" +
    "                </tbody>\n" +
    "            </table>\n" +
    "        </md-table-container>\n" +
    "        <!--分页数据-->\n" +
    "        <md-table-pagination ng-if=\"managerCtl.pagination\" class=\"md-table-pagination\" flex=\"none\"\n" +
    "                             md-limit=\"managerCtl.queryData.limit\" md-page=\"managerCtl.queryData.page\"\n" +
    "                             md-options=\"managerCtl.rowSelect\" md-on-paginate=\"managerCtl.onPageChangeBind\"\n" +
    "                             md-total=\"{{managerCtl.clientData.total}}\">\n" +
    "        </md-table-pagination>\n" +
    "    </md-content>\n" +
    "    <md-content md-whiteframe=\"2\"\n" +
    "                flex-gt-sm=\"30\"\n" +
    "                flex=\"100\"\n" +
    "                class=\"am-fade-and-slide-right\"\n" +
    "                layout=\"column\"\n" +
    "                ng-show=\"!!managerCtl.searchMode\">\n" +
    "        <md-toolbar>\n" +
    "            <div class=\"md-toolbar-tools\">\n" +
    "                <h3>俱乐部详情</h3>\n" +
    "                <span flex></span>\n" +
    "                <md-button aria-label=\"关闭\" class=\"md-icon-button md-ink-ripple\" ng-click=\"managerCtl.toggleSearchBar()\">\n" +
    "                    <md-tooltip>\n" +
    "                        关闭\n" +
    "                    </md-tooltip>\n" +
    "                    <ng-md-icon icon=\"close\"></ng-md-icon>\n" +
    "                </md-button>\n" +
    "            </div>\n" +
    "        </md-toolbar>\n" +
    "        <md-content>\n" +
    "            <md-list flex>\n" +
    "                <md-list-item>\n" +
    "                    <div class=\"md-list-item-text\">\n" +
    "                        <h3>俱乐部LOGO</h3>\n" +
    "                        <img ng-src=\"{{ managerCtl.clientData.logo }}\"/>\n" +
    "                    </div>\n" +
    "                </md-list-item>\n" +
    "                <md-divider></md-divider>\n" +
    "                <md-list-item>\n" +
    "                    <div class=\"md-list-item-text\">\n" +
    "                        <h3>俱乐部ID</h3>\n" +
    "                        <p>{{ managerCtl.clientData.id }}</p>\n" +
    "                    </div>\n" +
    "                </md-list-item>\n" +
    "                <md-divider></md-divider>\n" +
    "                <md-list-item>\n" +
    "                    <div class=\"md-list-item-text\">\n" +
    "                        <h3>赛区</h3>\n" +
    "                        <p>{{ managerCtl.clientData.site }}</p>\n" +
    "                    </div>\n" +
    "                </md-list-item>\n" +
    "                <md-divider></md-divider>\n" +
    "                <md-list-item>\n" +
    "                    <div class=\"md-list-item-text\">\n" +
    "                        <h3>建队时间</h3>\n" +
    "                        <p>{{ managerCtl.clientData.found_at }}</p>\n" +
    "                    </div>\n" +
    "                </md-list-item>\n" +
    "                <md-divider></md-divider>\n" +
    "                <md-list-item>\n" +
    "                    <div class=\"md-list-item-text\">\n" +
    "                        <h3>俱乐部全称</h3>\n" +
    "                        <p>{{ managerCtl.clientData.title }}</p>\n" +
    "                    </div>\n" +
    "                </md-list-item>\n" +
    "                <md-divider></md-divider>\n" +
    "                <md-list-item>\n" +
    "                    <div class=\"md-list-item-text\">\n" +
    "                        <h3>俱乐部简称</h3>\n" +
    "                        <p>{{ managerCtl.clientData.name }}</p>\n" +
    "                    </div>\n" +
    "                </md-list-item>\n" +
    "                <md-divider></md-divider>\n" +
    "                <md-list-item>\n" +
    "                    <div class=\"md-list-item-text\">\n" +
    "                        <h3>所属国家</h3>\n" +
    "                        <p>{{ managerCtl.clientData.location }}</p>\n" +
    "                    </div>\n" +
    "                </md-list-item>\n" +
    "                <md-divider></md-divider>\n" +
    "                <md-list-item>\n" +
    "                    <div class=\"md-list-item-text\">\n" +
    "                        <h3>教练</h3>\n" +
    "                        <p>{{ managerCtl.clientData.coach }}</p>\n" +
    "                    </div>\n" +
    "                </md-list-item>\n" +
    "                <md-divider></md-divider>\n" +
    "                <md-list-item>\n" +
    "                    <div class=\"md-list-item-text\">\n" +
    "                        <h3>俱乐部简介</h3>\n" +
    "                        <p>{{ managerCtl.clientData.description }}</p>\n" +
    "                    </div>\n" +
    "                </md-list-item>\n" +
    "                <md-divider></md-divider>\n" +
    "            </md-list>\n" +
    "        </md-content>\n" +
    "    </md-content>\n" +
    "</md-content>");
}]);

angular.module("app/modules/home/tpls/content.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/modules/home/tpls/content.html",
    "<md-content flex layout=\"row\" layout-align=\"center center\">\n" +
    "    <h1>\n" +
    "        这里可以放首页的一些信息\n" +
    "    </h1>\n" +
    "</md-content>");
}]);

angular.module("app/modules/home/tpls/index.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/modules/home/tpls/index.html",
    "<md-toolbar ui-view=\"toolbar_main\" md-theme=\"dark\" layout=\"row\" class=\"md-whiteframe-glow-z1\">\n" +
    "    <div class=\"md-toolbar-tools\">\n" +
    "        <md-button aria-label=\"打开菜单\" ng-click=\"homeIndexCtl.doOpenMenu($event)\">\n" +
    "            <div layout=\"row\">\n" +
    "                <ng-md-icon icon=\"dashboard\"></ng-md-icon>\n" +
    "                <h2 layout-padding>{{ $root.title }}</h2>\n" +
    "            </div>\n" +
    "        </md-button>\n" +
    "        <span flex></span>\n" +
    "        <div class=\"md-toolbar-item\" layout=\"row\">\n" +
    "            <md-button aria-label=\"选择当前的site\" ng-click=\"homeIndexCtl.doSelectSite($event)\">\n" +
    "                <md-tooltip>\n" +
    "                    当前的site\n" +
    "                </md-tooltip>\n" +
    "                <div layout=\"row\">\n" +
    "                    <ng-md-icon icon=\"edit_location\"></ng-md-icon>\n" +
    "                    <h2 layout-padding>{{ $root.site || \"LCK\" }}</h2>\n" +
    "                </div>\n" +
    "            </md-button>\n" +
    "            <md-button aria-label=\"打开菜单\" ng-click=\"homeIndexCtl.doOpenRightMenu($event)\">\n" +
    "                <md-tooltip>\n" +
    "                    菜单\n" +
    "                </md-tooltip>\n" +
    "                <div layout=\"row\">\n" +
    "                    <ng-md-icon icon=\"more_vert\"></ng-md-icon>\n" +
    "                    {{ $root.user.nickname }}\n" +
    "                </div>\n" +
    "            </md-button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</md-toolbar>\n" +
    "<md-content layout=\"row\" flex>\n" +
    "    <md-sidenav class=\"md-sidenav-left md-whiteframe-z2\" ui-view=\"sidenav_left\" md-component-id=\"left\"\n" +
    "                md-is-locked-open=\"$mdMedia('gt-sm')\">\n" +
    "    </md-sidenav>\n" +
    "    <md-sidenav class=\"md-sidenav-right md-whiteframe-z2\" md-component-id=\"right\" ui-view=\"sidenav_right\"\n" +
    "                layout=\"column\">\n" +
    "    </md-sidenav>\n" +
    "    <md-content layout=\"column\" flex class=\"slide-right noneleave\" ui-view=\"content_main\">\n" +
    "    </md-content>\n" +
    "</md-content>");
}]);

angular.module("app/modules/home/tpls/left.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/modules/home/tpls/left.html",
    "<md-content layout=\"column\" flex style=\"overflow: hidden;\">\n" +
    "    <md-input-container style=\"margin:0;\"\n" +
    "                        md-no-float\n" +
    "                        class=\"md-float-icon md-no-errors md-block\">\n" +
    "        <ng-md-icon icon=\"search\"></ng-md-icon>\n" +
    "        <input style=\"border: none;\" placeholder=\"搜索菜单\"\n" +
    "               ng-model=\"homeLeftCtl.mdSideMenuSections.options.filterExpression\">\n" +
    "    </md-input-container>\n" +
    "    <md-divider></md-divider>\n" +
    "    <md-content flex>\n" +
    "        <md-progress-linear class=\"nga-fast nga-stagger nga-fade\"\n" +
    "                            ng-show=\"homeLeftCtl.isBusy\"\n" +
    "                            md-theme=\"dark\"\n" +
    "                            md-mode=\"indeterminate\"></md-progress-linear>\n" +
    "        <side-menu flex\n" +
    "                   class=\"sidemenu\"\n" +
    "                   selected-nodes=\"homeLeftCtl.selectedNodes\"\n" +
    "                   modules=\"homeLeftCtl.modules\">\n" +
    "            <md-button class=\"layout-fill\"\n" +
    "                       md-theme=\"dark\"\n" +
    "                       md-style-color=\"{'background-color': isSelected(node) ? 'background.900': 'primary.0'}\"\n" +
    "                       style=\"text-align: left;\"\n" +
    "                       ng-href=\"{{ node.link?$root.apiPrefix + '/' + node.link:'' }}\"\n" +
    "                       aria-label=\"{{node.title}}\">\n" +
    "                <md-content md-theme=\"dark\"\n" +
    "                            flex\n" +
    "                            layout=\"row\"\n" +
    "                            md-theme=\"dark\"\n" +
    "                            md-style-color=\"{'background-color': isSelected(node) ? 'primary.0': 'primary.0','color':isSelected(node) ? 'background.50': 'background.900'}\">\n" +
    "                    <ng-md-icon icon=\"{{ node.icon||'apps'}}\"></ng-md-icon>\n" +
    "                    <span style=\"margin-left:5px;\" flex ng-bind=\"node.title\"></span>\n" +
    "                    <ng-md-icon ng-if=\"!isLeaf(node)\"\n" +
    "                                icon=\"{{ isShowChildren(node)?'expand_more':'chevron_right' }}\"></ng-md-icon>\n" +
    "                </md-content>\n" +
    "            </md-button>\n" +
    "        </side-menu>\n" +
    "    </md-content>\n" +
    "    <md-divider></md-divider>\n" +
    "    <div layout=\"row\" layout-margin layout-align=\"space-around center\">\n" +
    "        <md-button class=\"md-button md-warn\" aria-label=\"全部折叠\" ng-click=\"homeLeftCtl.doExpendAll($event)\">\n" +
    "            <ng-md-icon icon=\"keyboard_capslock\"></ng-md-icon>\n" +
    "            <span>全部折叠</span>\n" +
    "        </md-button>\n" +
    "        <md-button class=\"md-button md-accent\" aria-label=\"刷新菜单\" ng-click=\"homeLeftCtl.doReload($event)\">\n" +
    "            <ng-md-icon icon=\"refresh\"></ng-md-icon>\n" +
    "            <span>刷新菜单</span>\n" +
    "        </md-button>\n" +
    "    </div>\n" +
    "</md-content>");
}]);

angular.module("app/modules/home/tpls/right.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/modules/home/tpls/right.html",
    "<md-content flex layout=\"column\">\n" +
    "    <!--<md-list>-->\n" +
    "        <!--<md-subheader class=\"md-no-sticky\">用户设置</md-subheader>-->\n" +
    "        <!--<md-list-item ng-click=\"homeRightCtl.doEditPsw($event)\">-->\n" +
    "            <!--<ng-md-icon icon=\"lock_outline\"></ng-md-icon>-->\n" +
    "            <!--<p>修改密码</p>-->\n" +
    "        <!--</md-list-item>-->\n" +
    "        <!--<md-list-item ng-click=\"homeRightCtl.doSetAliasName($event)\">-->\n" +
    "            <!--<ng-md-icon icon=\"perm_identity\"></ng-md-icon>-->\n" +
    "            <!--<p>设置昵称 {{ $root.user.nickname }}</p>-->\n" +
    "        <!--</md-list-item>-->\n" +
    "        <!--<md-list-item ng-click=\"homeRightCtl.doSetMobile($event)\">-->\n" +
    "            <!--<ng-md-icon icon=\"phone_iphone\"></ng-md-icon>-->\n" +
    "            <!--<p>绑定手机 {{ $root.user.mobile }}</p>-->\n" +
    "        <!--</md-list-item>-->\n" +
    "        <!--<md-list-item ng-click=\"homeRightCtl.doSetEmail($event)\">-->\n" +
    "            <!--<ng-md-icon icon=\"email\"></ng-md-icon>-->\n" +
    "            <!--<p>绑定邮箱 {{ $root.user.email }}</p>-->\n" +
    "        <!--</md-list-item>-->\n" +
    "        <!--<md-divider></md-divider>-->\n" +
    "    <!--</md-list>-->\n" +
    "</md-content>\n" +
    "\n" +
    "<md-divider></md-divider>\n" +
    "<div layout=\"row\" layout-align=\"start center\">\n" +
    "    <!--<h4 style=\"padding-left:10px;\" flex>上海萌义网络科技有限公司</h4>-->\n" +
    "    <md-button ng-click=\"homeRightCtl.doExit($event)\" flex class=\"md-warn\">\n" +
    "        <md-tooltip>\n" +
    "            退出\n" +
    "        </md-tooltip>\n" +
    "        <ng-md-icon icon=\"settings_power\"></ng-md-icon>\n" +
    "        退出\n" +
    "    </md-button>\n" +
    "</div>\n" +
    "");
}]);

angular.module("app/modules/page/tpls/manager.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/modules/page/tpls/manager.html",
    "<!--表格数据-->\n" +
    "<md-content layout=\"row\" flex>\n" +
    "    <md-content flex layout=\"column\" md-theme=\"dark\">\n" +
    "        <ng-include src=\"'app/modules/page/tpls/toolbar.html'\"></ng-include>\n" +
    "        <md-divider></md-divider>\n" +
    "        <md-table-container flex>\n" +
    "            <table md-table flex class=\"md-table\" ng-model=\"managerCtl.selected\" flex md-progress=\"managerCtl.deferred\">\n" +
    "                <thead md-head md-order=\"managerCtl.queryData.order\" md-content=\"managerCtl\" md-trigger=\"managerCtl.onOrderChange\">\n" +
    "                    <tr md-row>\n" +
    "                        <th md-column ng-repeat=\"column in managerCtl.columns\">\n" +
    "                            {{::column.name}}\n" +
    "                        </th>\n" +
    "                        <th md-column ng-if=\"managerCtl.itemToolbars.length\"></th>\n" +
    "                    </tr>\n" +
    "                </thead>\n" +
    "                <tbody md-body>\n" +
    "                    <tr md-row md-auto-select ng-repeat=\"item in managerCtl.clientData.datas\">\n" +
    "                        <td md-cell ng-repeat=\"column in managerCtl.columns\">\n" +
    "                            <span dy-compile $index=\"$parent.$index+1\" parent=\"managerCtl\" query=\"managerCtl.queryData\" item=\"item\" html=\"{{column.template}}\"></span>\n" +
    "                        </td>\n" +
    "                        <td md-cell>\n" +
    "                            <gridmenu aria-label=\"打开菜单\" ng-if=\"managerCtl.itemToolbars.length\" tools=\"managerCtl.itemToolbars\" item=\"item\" is-busy=\"managerCtl.isBusy\"\n" +
    "                            open-menu=\"managerCtl.material.openMenu\"></gridmenu>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                </tbody>\n" +
    "            </table>\n" +
    "        </md-table-container>\n" +
    "        <!--分页数据-->\n" +
    "        <md-table-pagination ng-if=\"managerCtl.pagination\" class=\"md-table-pagination\" flex=\"none\" md-limit=\"managerCtl.queryData.limit\" md-page=\"managerCtl.queryData.page\"\n" +
    "        md-options=\"managerCtl.rowSelect\" md-on-paginate=\"managerCtl.onPageChangeBind\" md-total=\"{{managerCtl.clientData.total}}\">\n" +
    "        </md-table-pagination>\n" +
    "    </md-content>\n" +
    "    <ng-include class=\"md-whiteframe-z2 am-fade-and-slide-right\" ng-show=\"!!managerCtl.searchMode\" layout=\"column\" flex-gt-sm=\"30\"\n" +
    "    flex=\"100\" src=\"'app/modules/page/tpls/search.html'\"></ng-include>\n" +
    "</md-content>");
}]);

angular.module("app/modules/page/tpls/manager_form.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/modules/page/tpls/manager_form.html",
    "<md-dialog aria-label=\"formCtl.title\" md-theme=\"dark\" flex-gt-sm=\"80\" flex=\"100\">\n" +
    "    <!--{{ formCtl.formData }}-->\n" +
    "    <md-toolbar md-theme=\"dark\">\n" +
    "        <div class=\"md-toolbar-tools\">\n" +
    "            <h2>{{::formCtl.title}}</h2>\n" +
    "            <span flex></span>\n" +
    "            <md-button class=\"md-icon-button\" aria-label=\"close\" ng-hide=\"formCtl.isBusy\" ng-click=\"formCtl.close()\">\n" +
    "                <ng-md-icon icon=\"close\"></ng-md-icon>\n" +
    "            </md-button>\n" +
    "        </div>\n" +
    "    </md-toolbar>\n" +
    "    <md-dialog-content flex class=\"md-padding\">\n" +
    "        <md-progress-linear md-theme=\"dark\" class=\"nga-fast nga-stagger nga-fade\" ng-show=\"formCtl.isBusy\"\n" +
    "                            md-mode=\"indeterminate\"></md-progress-linear>\n" +
    "        <form name=\"newForm\" layout=\"column\"\n" +
    "              sf-schema=\"formCtl.schema\" sf-form=\"formCtl.form\"\n" +
    "              sf-model=\"formCtl.formData\">\n" +
    "        </form>\n" +
    "    </md-dialog-content>\n" +
    "    <md-dialog-actions layout=\"row\">\n" +
    "        <span flex></span>\n" +
    "        <md-button ng-disabled=\"formCtl.isBusy\" aria-label=\"formCtl.title\" ng-click=\"formCtl.submit(newForm)\">\n" +
    "            {{ ::formCtl.title }}\n" +
    "        </md-button>\n" +
    "    </md-dialog-actions>\n" +
    "</md-dialog>");
}]);

angular.module("app/modules/page/tpls/search.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/modules/page/tpls/search.html",
    "<md-content md-whiteframe=\"2\" md-theme=\"white\" flex layout=\"column\">\n" +
    "    <md-toolbar >\n" +
    "        <div class=\"md-toolbar-tools\">\n" +
    "            <h3>搜索</h3>\n" +
    "            <span flex></span>\n" +
    "            <md-button aria-label=\"重置搜索条件\" class=\"md-icon-button md-ink-ripple\" ng-click=\"managerCtl.resetSearch()\">\n" +
    "                <md-tooltip>\n" +
    "                    重置搜索条件\n" +
    "                </md-tooltip>\n" +
    "                <ng-md-icon icon=\"clear_all\"></ng-md-icon>\n" +
    "            </md-button>\n" +
    "            <md-button aria-label=\"刷新\" class=\"md-icon-button md-ink-ripple\" ng-click=\"managerCtl.getServerData()\">\n" +
    "                <md-tooltip>\n" +
    "                    刷新\n" +
    "                </md-tooltip>\n" +
    "                <ng-md-icon icon=\"refresh\"></ng-md-icon>\n" +
    "            </md-button>\n" +
    "            <md-button aria-label=\"关闭\" class=\"md-icon-button md-ink-ripple\" ng-click=\"managerCtl.toggleSearchBar()\">\n" +
    "                <md-tooltip>\n" +
    "                    关闭\n" +
    "                </md-tooltip>\n" +
    "                <ng-md-icon icon=\"close\"></ng-md-icon>\n" +
    "            </md-button>\n" +
    "        </div>\n" +
    "    </md-toolbar>\n" +
    "    <!--搜索toolbar-->\n" +
    "    <md-content flex>\n" +
    "        <form name=\"searchForm\" layout=\"column\" flex sf-schema=\"managerCtl.schema\" sf-form=\"managerCtl.searchForm\" sf-model=\"managerCtl.searchData\">\n" +
    "        </form>\n" +
    "    </md-content>\n" +
    "    <md-divider></md-divider>\n" +
    "    <md-button ng-disabled=\"managerCtl.isBusy\" aria-label=\"search\" ng-click=\"managerCtl.doSearch(searchForm)\">\n" +
    "        过滤一下\n" +
    "    </md-button>\n" +
    "</md-content>");
}]);

angular.module("app/modules/page/tpls/toolbar.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/modules/page/tpls/toolbar.html",
    "<md-toolbar md-theme=\"default\" class=\"md-table-toolbar md-default\" ng-hide=\"selected.length || filter.show\" aria-hidden=\"false\">\n" +
    "    <div class=\"md-toolbar-tools\">\n" +
    "        <ng-md-icon ng-if=\"managerCtl.menu.icon\" icon=\"{{managerCtl.menu.icon}}\"></ng-md-icon>\n" +
    "        <h2 class=\"md-title\">{{ managerCtl.menu.title }}</h2>\n" +
    "        <div flex=\"\"></div>\n" +
    "        <div class=\"md-toolbar-item\" layout=\"row\">\n" +
    "            <md-button ng-repeat=\"item in managerCtl.rootToolbars\" ng-click=\"item.onClick($event)\" ng-disabled=\"managerCtl.isBusy\" aria-label=\"item.title\"\n" +
    "            class=\"md-icon-button\">\n" +
    "                <md-tooltip>\n" +
    "                    {{item.title}}\n" +
    "                </md-tooltip>\n" +
    "                <ng-md-icon icon=\"{{ item.icon }}\"></ng-md-icon>\n" +
    "            </md-button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</md-toolbar>");
}]);

angular.module("app/modules/passport/tpls/index.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/modules/passport/tpls/index.html",
    "<div layout=\"row\" flex class=\"passport\" layout-align=\"center center\">\n" +
    "    <div flex layout-align=\"center center\">\n" +
    "        <div ui-view=\"content_main\" class=\"passport-content rotate-in\"></div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("app/modules/passport/tpls/login.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/modules/passport/tpls/login.html",
    "<h1 class=\"title\">用户登录</h1>\n" +
    "\n" +
    "<div layout=\"row\" layout-align=\"center center\">\n" +
    "    <div layout=\"column\" flex-xs=\"90\" flex=\"40\">\n" +
    "        <form name=\"form\"\n" +
    "              layout=\"column\" \n" +
    "              flex \n" +
    "              sf-model=\"passportLoginController.formData\"\n" +
    "              sf-form=\"passportLoginController.form\"\n" +
    "              sf-schema=\"passportLoginController.schema\"\n" +
    "              ng-submit=\"passportLoginController.submit(form)\">\n" +
    "        </form>\n" +
    "        <md-button ng-click=\"passportLoginController.submit(form)\">\n" +
    "            Login In\n" +
    "        </md-button>\n" +
    "    </div>\n" +
    "</div>");
}]);
