angular.module('partialsModule', ['client/js/partials/account/forget_email.html', 'client/js/partials/account/forget_phone.html', 'client/js/partials/account/index.html', 'client/js/partials/account/login.html', 'client/js/partials/account/register.html', 'client/js/partials/controllers/common/command.html', 'client/js/partials/controllers/common/info.html', 'client/js/partials/controllers/common/manager.html', 'client/js/partials/controllers/common/manager_form.html', 'client/js/partials/controllers/common/search.html', 'client/js/partials/controllers/common/toolbar.html', 'client/js/partials/controllers/home/content.html', 'client/js/partials/controllers/home/index.html', 'client/js/partials/controllers/home/sidenav_left.html', 'client/js/partials/controllers/home/sidenav_right.html', 'client/js/partials/controllers/permission/actors/manager_group_form.html', 'client/js/partials/controllers/permission/groups/manager_permiss_form.html', 'client/js/partials/decorator/material/datepicker.html', 'client/js/partials/decorator/material/datetimepicker.html', 'client/js/partials/decorator/material/jsoneditor.html', 'client/js/partials/decorator/material/linkbutton.html', 'client/js/partials/decorator/material/uploader-single.html', 'client/js/partials/decorator/material/uploader.html', 'client/js/partials/directives/mdPickers.html', 'client/js/partials/form/editpsw_form.html', 'client/js/partials/form/set_computer_form.html', 'client/js/partials/form/setaliasname_form.html', 'client/js/partials/form/setemail_form.html', 'client/js/partials/form/setmobile_form.html']);

angular.module("client/js/partials/account/forget_email.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("client/js/partials/account/forget_email.html",
    "<!--<div class=\"avatar toggle\">-->\n" +
    "    <!--<img src=\"contents/imgs/avatar.png\" alt=\"\">-->\n" +
    "<!--</div>-->\n" +
    "<h1>邮箱找回密码</h1>\n" +
    "\n" +
    "<script type=\"text/ng-template\" id=\"/forgetMailFirst.html\">\n" +
    "    <form name=\"forgetPhoneFirstForm\"\n" +
    "          layout=\"column\"\n" +
    "          sf-schema=\"forgetCtl.schema\"\n" +
    "          sf-form=\"forgetCtl.formFirst\"\n" +
    "          sf-model=\"forgetCtl.formData\"\n" +
    "          ng-submit=\"forgetCtl.doSendCode(forgetPhoneFirstForm)\">\n" +
    "    </form>\n" +
    "</script>\n" +
    "<script type=\"text/ng-template\" id=\"/forgetMailSecond.html\">\n" +
    "    <form name=\"forgetPhoneSecondForm\"\n" +
    "          layout=\"column\"\n" +
    "          sf-schema=\"forgetCtl.schema\"\n" +
    "          sf-form=\"forgetCtl.formSecond\"\n" +
    "          sf-model=\"forgetCtl.formData\"\n" +
    "          equalsome=\"password,passwordAgain\"\n" +
    "          ng-submit=\"forgetCtl.doEditPassword(forgetPhoneSecondForm)\">\n" +
    "    </form>\n" +
    "</script>\n" +
    "\n" +
    "<div layout=\"row\" layout-align=\"center center\">\n" +
    "    <div layout=\"column\" offset-gt-md=\"35\" offset-gt-sm=\"35\" flex-gt-sm=\"30\" offset-sm=\"5\" flex-gt-md=\"30\"\n" +
    "         flex-sm=\"90\">\n" +
    "        <md-tabs md-selected=\"forgetCtl.selectedIndex\" md-dynamic-height=\"true\" md-center-tabs=\"true\" md-swipe-content md-border-bottom>\n" +
    "            <md-tab ng-repeat=\"step in forgetCtl.steps\"\n" +
    "                    ng-disabled=\"true\"\n" +
    "                    label=\"{{step.title}}\">\n" +
    "                <div class=\"demo-tab\" style=\"padding: 25px; text-align: center;\">\n" +
    "                    <div ng-include=\"step.templateUrl\"></div>\n" +
    "                </div>\n" +
    "            </md-tab>\n" +
    "        </md-tabs>\n" +
    "        <div layout=\"row\">\n" +
    "            <md-button ui-sref=\"account.forget_phone\">\n" +
    "                使用手机找回密码\n" +
    "            </md-button>\n" +
    "            <span flex=\"\"></span>\n" +
    "            <md-button class=\"md-icon-button pull-right\" ui-sref=\"account\">\n" +
    "                <ng-md-icon icon=\"home\"></ng-md-icon>\n" +
    "            </md-button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("client/js/partials/account/forget_phone.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("client/js/partials/account/forget_phone.html",
    "<!--<div class=\"avatar toggle\">-->\n" +
    "<!--<img src=\"contents/imgs/avatar.png\" alt=\"\">-->\n" +
    "<!--</div>-->\n" +
    "<h1>手机找回密码</h1>\n" +
    "\n" +
    "<script type=\"text/ng-template\" id=\"/forgetMobileFirst.html\">\n" +
    "    <form name=\"forgetPhoneFirstForm\"\n" +
    "          layout=\"column\"\n" +
    "          sf-schema=\"forgetCtl.schema\"\n" +
    "          sf-form=\"forgetCtl.formFirst\"\n" +
    "          sf-model=\"forgetCtl.formData\"\n" +
    "          ng-submit=\"forgetCtl.doSendCode(forgetPhoneFirstForm)\">\n" +
    "    </form>\n" +
    "</script>\n" +
    "<script type=\"text/ng-template\" id=\"/forgetMobileSecond.html\">\n" +
    "    <form name=\"forgetPhoneSecondForm\"\n" +
    "          layout=\"column\"\n" +
    "          sf-schema=\"forgetCtl.schema\"\n" +
    "          sf-form=\"forgetCtl.formSecond\"\n" +
    "          sf-model=\"forgetCtl.formData\"\n" +
    "          equalsome=\"password,passwordAgain\"\n" +
    "          ng-submit=\"forgetCtl.doEditPassword(forgetPhoneSecondForm)\">\n" +
    "    </form>\n" +
    "</script>\n" +
    "\n" +
    "<div layout=\"row\" layout-align=\"center center\">\n" +
    "    <div layout=\"column\" offset-gt-md=\"35\" offset-gt-sm=\"35\" flex-gt-sm=\"30\" offset-sm=\"5\" flex-gt-md=\"30\"\n" +
    "         flex-sm=\"90\">\n" +
    "\n" +
    "        <md-tabs md-selected=\"forgetCtl.selectedIndex\" md-dynamic-height=\"true\" md-center-tabs=\"true\" md-swipe-content\n" +
    "                 md-border-bottom>\n" +
    "            <md-tab ng-repeat=\"step in forgetCtl.steps\"\n" +
    "                    ng-disabled=\"true\"\n" +
    "                    label=\"{{step.title}}\">\n" +
    "                <div class=\"demo-tab\" style=\"padding: 25px; text-align: center;\">\n" +
    "                    <div ng-include=\"step.templateUrl\"></div>\n" +
    "                </div>\n" +
    "            </md-tab>\n" +
    "        </md-tabs>\n" +
    "        <div layout=\"row\">\n" +
    "            <md-button ui-sref=\"account.forget_email\">\n" +
    "                使用邮箱找回密码\n" +
    "            </md-button>\n" +
    "            <span flex=\"\"></span>\n" +
    "            <md-button class=\"md-icon-button pull-right\" ui-sref=\"account\">\n" +
    "                <ng-md-icon icon=\"home\"></ng-md-icon>\n" +
    "            </md-button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("client/js/partials/account/index.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("client/js/partials/account/index.html",
    "<!--<div class=\"login login-blur\" layout=\"row\" flex>-->\n" +
    "<!--<div class=\"login-con\" layout=\"column\">-->\n" +
    "<!--<div ui-view=\"accountView\" class=\"rotate-in none-leave\"></div>-->\n" +
    "<!--</div>-->\n" +
    "<!--</div>-->\n" +
    "<div layout=\"row\" flex class=\"login login-blur\" layout-align=\"center center\">\n" +
    "    <div class=\"login-con\">\n" +
    "        <div ui-view=\"accountView\" class=\"rotate-in noneleave\"></div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("client/js/partials/account/login.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("client/js/partials/account/login.html",
    "<!--<div class=\"avatar toggle\">-->\n" +
    "    <!--<img src=\"contents/imgs/avatar.png\" alt=\"\">-->\n" +
    "<!--</div>-->\n" +
    "<h1>用户登录</h1>\n" +
    "\n" +
    "<div layout=\"row\" layout-align=\"center center\">\n" +
    "    <div layout=\"column\" offset-gt-md=\"40\" offset-gt-sm=\"35\" flex-gt-sm=\"30\" flex-gt-md=\"20\"\n" +
    "         flex-sm=\"90\" offset-sm=\"5\">\n" +
    "        <form name=\"login_form\"\n" +
    "              layout=\"column\"\n" +
    "              sf-model=\"loginCtl.formData\"\n" +
    "              sf-form=\"loginCtl.form\"\n" +
    "              sf-schema=\"loginCtl.schema\"\n" +
    "              ng-submit=\"loginCtl.submit(login_form)\"></form>\n" +
    "\n" +
    "        <!--md-divider></md-divider>\n" +
    "        <div layout=\"row\">\n" +
    "            <md-button ui-sref=\"account.forget_email\">\n" +
    "                找回密码\n" +
    "            </md-button>\n" +
    "            <span flex=\"\"></span>\n" +
    "            <md-button ui-sref=\"account.register\">\n" +
    "                用户注册\n" +
    "            </md-button>\n" +
    "        </div-->\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("client/js/partials/account/register.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("client/js/partials/account/register.html",
    "<!--<div class=\"avatar toggle\">-->\n" +
    "<!--<img src=\"contents/imgs/avatar.png\" alt=\"\">-->\n" +
    "<!--</div>-->\n" +
    "<h1>用户注册</h1>\n" +
    "\n" +
    "<div layout=\"row\" layout-align=\"center center\">\n" +
    "    <div layout=\"column\" offset-gt-md=\"40\" offset-gt-sm=\"35\" flex-gt-sm=\"30\" flex-gt-md=\"20\"\n" +
    "         flex-sm=\"90\" offset-sm=\"5\">\n" +
    "\n" +
    "        <!--注册表单-->\n" +
    "        <form name=\"regForm\"\n" +
    "              layout=\"column\"\n" +
    "              sf-schema=\"regCtl.schema\"\n" +
    "              sf-form=\"regCtl.form\"\n" +
    "              sf-model=\"regCtl.formData\"\n" +
    "              ng-submit=\"regCtl.submit(regForm)\"\n" +
    "              equalsome=\"password,passwordAgain\">\n" +
    "        </form>\n" +
    "\n" +
    "        <md-divider></md-divider>\n" +
    "        <div layout=\"row\">\n" +
    "            <md-button class=\"md-icon-button pull-right\" ui-sref=\"account\">\n" +
    "                <ng-md-icon icon=\"arrow_back\"></ng-md-icon>\n" +
    "            </md-button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("client/js/partials/controllers/common/command.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("client/js/partials/controllers/common/command.html",
    "<!--表格数据-->\n" +
    "<md-content layout=\"column\" flex layout-padding>\n" +
    "    <h1>GM命令</h1>\n" +
    "    <md-list>\n" +
    "        <md-list-item ng-repeat=\"btn in managerCtl.itemToolbars\" ng-click=\"btn.onClick({},$event)\">\n" +
    "            <ng-md-icon icon=\"{{btn.icon}}\"></ng-md-icon>\n" +
    "            <label flex>{{ btn.title }}</label>\n" +
    "        </md-list-item>\n" +
    "    </md-list>\n" +
    "</md-content>\n" +
    "");
}]);

angular.module("client/js/partials/controllers/common/info.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("client/js/partials/controllers/common/info.html",
    "<!--表格数据-->\n" +
    "<md-content layout=\"row\" flex>\n" +
    "    <md-content flex layout=\"column\" md-theme=\"dark\">\n" +
    "        <ng-include src=\"'js/partials/controllers/common/toolbar.html'\"></ng-include>\n" +
    "        <md-divider></md-divider>\n" +
    "        <md-data-table-container flex>\n" +
    "            <table md-data-table\n" +
    "                   flex\n" +
    "                   md-progress=\"managerCtl.deferred\">\n" +
    "                <thead md-order=\"managerCtl.queryData.order\"\n" +
    "                       md-content=\"managerCtl\"\n" +
    "                       md-trigger=\"managerCtl.onOrderChange\">\n" +
    "                </thead>\n" +
    "                <tbody>\n" +
    "                    <tr md-auto-select\n" +
    "                        style=\"animation-delay:.2s;\"\n" +
    "                        class=\"am-slide-bottom\"\n" +
    "                        ng-repeat=\"column in managerCtl.columns\">\n" +
    "                        <td>{{column.name}}</td>\n" +
    "                        <td ng-repeat=\"item in managerCtl.clientData.datas\">\n" +
    "                            <span dy-compile\n" +
    "                              $index=\"$parent.$index+1\"\n" +
    "                              query=\"managerCtl.queryData\"\n" +
    "                              item=\"item\" html=\"{{column.template}}\"></span>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                </tbody>\n" +
    "            </table>\n" +
    "        </md-data-table-container>\n" +
    "    </md-content>\n" +
    "    <ng-include class=\"md-whiteframe-z2 am-fade-and-slide-right\" ng-show=\"managerCtl.searchMode\" layout=\"column\"\n" +
    "                flex-gt-sm=\"30\"\n" +
    "                flex=\"100\"\n" +
    "                src=\"'js/partials/controllers/common/search.html'\"></ng-include>\n" +
    "</md-content>");
}]);

angular.module("client/js/partials/controllers/common/manager.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("client/js/partials/controllers/common/manager.html",
    "<!--表格数据-->\n" +
    "<md-content layout=\"row\" flex>\n" +
    "    <md-content flex layout=\"column\" md-theme=\"dark\">\n" +
    "        <ng-include src=\"'js/partials/controllers/common/toolbar.html'\"></ng-include>\n" +
    "        <md-divider></md-divider>\n" +
    "        <md-data-table-container flex>\n" +
    "            <table md-data-table\n" +
    "                   md-row-select=\"managerCtl.selected\"\n" +
    "                   md-single-row-select=\"true\"\n" +
    "                   flex\n" +
    "                   md-progress=\"managerCtl.deferred\">\n" +
    "                <thead md-order=\"managerCtl.queryData.order\"\n" +
    "                       md-content=\"managerCtl\"\n" +
    "                       md-trigger=\"managerCtl.onOrderChange\">\n" +
    "                <tr>\n" +
    "                    <th ng-repeat=\"column in managerCtl.columns\"\n" +
    "                        name=\"{{column.name}}\"></th>\n" +
    "                    <th name=\"\"></th>\n" +
    "                </tr>\n" +
    "                </thead>\n" +
    "                <tbody>\n" +
    "                <tr md-auto-select\n" +
    "                    style=\"animation-delay:.2s;\"\n" +
    "                    class=\"am-slide-bottom\"\n" +
    "                    ng-repeat=\"item in managerCtl.clientData.datas\">\n" +
    "                    <td ng-repeat=\"column in managerCtl.columns\">\n" +
    "                        <span dy-compile\n" +
    "                              $index=\"$parent.$index+1\"\n" +
    "                              query=\"managerCtl.queryData\"\n" +
    "                              style=\"white-space: nowrap;\"\n" +
    "                              item=\"item\" html=\"{{column.template}}\"></span>\n" +
    "                    </td>\n" +
    "                    <td>\n" +
    "                        <gridmenu aria-label=\"打开菜单\"\n" +
    "                                  ng-if=\"managerCtl.itemToolbars.length && !item.is_set == 1\"\n" +
    "                                  tools=\"managerCtl.itemToolbars\"\n" +
    "                                  item=\"item\"\n" +
    "                                  is-busy=\"managerCtl.isBusy\"\n" +
    "                                  open-menu=\"managerCtl.openMenu\"></gridmenu>\n" +
    "                    </td>\n" +
    "                </tr>\n" +
    "                </tbody>\n" +
    "            </table>\n" +
    "\n" +
    "        </md-data-table-container>\n" +
    "        <!--分页数据-->\n" +
    "        <md-data-table-pagination flex=\"none\"\n" +
    "                                  md-limit=\"managerCtl.queryData.limit\"\n" +
    "                                  md-page=\"managerCtl.queryData.page\"\n" +
    "                                  md-row-select=\"managerCtl.rowSelect\"\n" +
    "                                  md-total=\"{{managerCtl.clientData.total}}\"\n" +
    "                                  md-content=\"managerCtl\"\n" +
    "                                  md-trigger=\"managerCtl.onPageChange\">\n" +
    "        </md-data-table-pagination>\n" +
    "    </md-content>\n" +
    "    <ng-include class=\"md-whiteframe-z2 am-fade-and-slide-right\" ng-show=\"managerCtl.searchMode\" layout=\"column\"\n" +
    "                flex-gt-sm=\"30\"\n" +
    "                flex=\"100\"\n" +
    "                src=\"'js/partials/controllers/common/search.html'\"></ng-include>\n" +
    "</md-content>");
}]);

angular.module("client/js/partials/controllers/common/manager_form.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("client/js/partials/controllers/common/manager_form.html",
    "<md-dialog aria-label=\"formCtl.title\"\n" +
    "           md-theme=\"dark\"\n" +
    "           flex-gt-sm=\"80\"\n" +
    "           flex=\"100\"\n" +
    "           layout=\"column\">\n" +
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
    "    <!--<md-dialog-content flex class=\"md-padding\">-->\n" +
    "         <!--style=\"min-height:250px;\"-->\n" +
    "        <md-progress-linear ng-if=\"formCtl.isBusy\" md-mode=\"indeterminate\"></md-progress-linear>\n" +
    "        <form name=\"newForm\"\n" +
    "              layout=\"column\"\n" +
    "              sf-schema=\"formCtl.schema\"\n" +
    "              sf-form=\"formCtl.form\"\n" +
    "              sf-model=\"formCtl.formData\"\n" +
    "              equalsome=\"password,passwordAgain\">\n" +
    "        </form>\n" +
    "    <!--</md-dialog-content>-->\n" +
    "    <md-dialog-actions layout=\"row\">\n" +
    "        <span flex></span>\n" +
    "        <md-button ng-disabled=\"formCtl.isBusy\"\n" +
    "                   aria-label=\"formCtl.title\"\n" +
    "                   ng-click=\"formCtl.submit(newForm)\">\n" +
    "            {{ formCtl.title }}\n" +
    "        </md-button>\n" +
    "    </md-dialog-actions>\n" +
    "</md-dialog>");
}]);

angular.module("client/js/partials/controllers/common/search.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("client/js/partials/controllers/common/search.html",
    "<md-content class=\"md-whiteframe-z2\" flex layout=\"column\">\n" +
    "    <md-toolbar md-theme=\"amazing\">\n" +
    "        <div class=\"md-toolbar-tools\">\n" +
    "            <h3>搜索</h3>\n" +
    "            <span flex></span>\n" +
    "            <md-button aria-label=\"重置搜索条件\"\n" +
    "                       class=\"md-icon-button md-ink-ripple\"\n" +
    "                       ng-click=\"managerCtl.resetSearch()\">\n" +
    "                <md-tooltip>\n" +
    "                    重置搜索条件\n" +
    "                </md-tooltip>\n" +
    "                <ng-md-icon icon=\"clear_all\"></ng-md-icon>\n" +
    "            </md-button>\n" +
    "            <md-button aria-label=\"刷新\"\n" +
    "                       class=\"md-icon-button md-ink-ripple\"\n" +
    "                       ng-click=\"managerCtl.getServerData()\">\n" +
    "                <md-tooltip>\n" +
    "                    刷新\n" +
    "                </md-tooltip>\n" +
    "                <ng-md-icon icon=\"refresh\"></ng-md-icon>\n" +
    "            </md-button>\n" +
    "            <md-button aria-label=\"关闭\"\n" +
    "                       class=\"md-icon-button md-ink-ripple\"\n" +
    "                       ng-click=\"managerCtl.toggleSearchBar()\">\n" +
    "                <md-tooltip>\n" +
    "                    关闭\n" +
    "                </md-tooltip>\n" +
    "                <ng-md-icon icon=\"close\"></ng-md-icon>\n" +
    "            </md-button>\n" +
    "        </div>\n" +
    "    </md-toolbar>\n" +
    "    <!--搜索toolbar-->\n" +
    "    <md-content flex>\n" +
    "        <form name=\"searchForm\"\n" +
    "              layout=\"column\"\n" +
    "              flex\n" +
    "              sf-schema=\"managerCtl.schema\"\n" +
    "              sf-form=\"managerCtl.searchForm\"\n" +
    "              sf-model=\"managerCtl.searchData\">\n" +
    "        </form>\n" +
    "    </md-content>\n" +
    "    <md-divider></md-divider>\n" +
    "    <md-button ng-disabled=\"managerCtl.isBusy\"\n" +
    "               aria-label=\"search\"\n" +
    "               ng-click=\"managerCtl.doSearch(searchForm)\">\n" +
    "        过滤一下\n" +
    "    </md-button>\n" +
    "\n" +
    "</md-content>\n" +
    "");
}]);

angular.module("client/js/partials/controllers/common/toolbar.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("client/js/partials/controllers/common/toolbar.html",
    "<md-data-table-toolbar ng-hide=\"selected.length || filter.show\" aria-hidden=\"false\">\n" +
    "    <ng-md-icon ng-if=\"managerCtl.icon\" icon=\"{{managerCtl.icon}}\"></ng-md-icon>\n" +
    "    <h2 class=\"md-title\">{{ managerCtl.title }}</h2>\n" +
    "    <div flex=\"\"></div>\n" +
    "    <div class=\"md-toolbar-item\" layout=\"row\">\n" +
    "        <md-button ng-repeat=\"item in $root.toolbars\"\n" +
    "                   ng-click=\"item.onClick($event)\"\n" +
    "                   ng-disabled=\"managerCtl.isBusy\"\n" +
    "                   aria-label=\"item.title\"\n" +
    "                   md-theme=\"amazing\"\n" +
    "                   class=\"md-icon-button\">\n" +
    "            <md-tooltip>\n" +
    "                {{item.title}}\n" +
    "            </md-tooltip>\n" +
    "            <ng-md-icon icon=\"{{ item.icon }}\"></ng-md-icon>\n" +
    "        </md-button>\n" +
    "    </div>\n" +
    "</md-data-table-toolbar>");
}]);

angular.module("client/js/partials/controllers/home/content.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("client/js/partials/controllers/home/content.html",
    "<md-content flex layout=\"row\" layout-align=\"center center\" md-theme=\"dark\">\n" +
    "    <h1 md-theme=\"dark\">{{ $root.title }}</h1>\n" +
    "</md-content>");
}]);

angular.module("client/js/partials/controllers/home/index.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("client/js/partials/controllers/home/index.html",
    "<md-toolbar ui-view=\"toolbar_main\"\n" +
    "            layout=\"row\"\n" +
    "            md-theme=\"dark\"\n" +
    "            class=\"md-whiteframe-glow-z1\">\n" +
    "    <div class=\"md-toolbar-tools\">\n" +
    "        <md-button aria-label=\"打开菜单\"\n" +
    "                   ng-click=\"$root.doOpenMenu()\">\n" +
    "            <div layout=\"row\">\n" +
    "                <ng-md-icon icon=\"windows\"></ng-md-icon>\n" +
    "                <h2 layout-padding>{{ $root.systitle }}</h2>\n" +
    "            </div>\n" +
    "        </md-button>\n" +
    "        <span flex></span>\n" +
    "        <!--md-button aria-label=\"设置服务器\" ng-click=\"homeIndexCtl.doSetComputer($event)\">\n" +
    "            <ng-md-icon icon=\"computer\"></ng-md-icon>\n" +
    "            <span class=\"md-caption\">{{ $root.server.serName }}</>\n" +
    "        </md-button-->\n" +
    "        <div class=\"md-toolbar-item\" layout=\"row\">\n" +
    "            <md-button ng-click=\"$root.doOpenRightMenu()\">\n" +
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
    "    <md-sidenav class=\"md-sidenav-left md-whiteframe-z2\"\n" +
    "                ui-view=\"sidenav_left\"\n" +
    "                md-component-id=\"left\"\n" +
    "                md-is-locked-open=\"$mdMedia('gt-sm')\">\n" +
    "    </md-sidenav>\n" +
    "    <md-sidenav class=\"md-sidenav-right md-whiteframe-z2\"\n" +
    "                md-component-id=\"right\"\n" +
    "                ui-view=\"sidenav_right\"\n" +
    "                layout=\"column\">\n" +
    "    </md-sidenav>\n" +
    "    <md-content layout=\"column\" flex\n" +
    "                class=\"slide-right noneleave\"\n" +
    "                md-theme=\"{{ $root.theme }}\"\n" +
    "                ui-view=\"content_main\">\n" +
    "    </md-content>\n" +
    "</md-content>\n" +
    "");
}]);

angular.module("client/js/partials/controllers/home/sidenav_left.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("client/js/partials/controllers/home/sidenav_left.html",
    "<md-content layout=\"column\" flex>\n" +
    "    <md-input-container style=\"margin:0;\"\n" +
    "                        md-no-float\n" +
    "                        class=\"md-float-icon md-no-errors\">\n" +
    "        <ng-md-icon icon=\"search\"></ng-md-icon>\n" +
    "        <input style=\"border: none;\" placeholder=\"搜索菜单\" ng-model=\"homeSideNavCtl.filterExpression\">\n" +
    "    </md-input-container>\n" +
    "    <md-divider></md-divider>\n" +
    "    <!--<md-checkbox ng-model=\"homeSideNavCtl.filterComparator\">-->\n" +
    "    <!--精确查询-->\n" +
    "    <!--</md-checkbox>-->\n" +
    "    <md-content flex>\n" +
    "        <side-menu flex\n" +
    "                   class=\"sidemenu\"\n" +
    "                   md-theme=\"dark\"\n" +
    "                   filter-expression=\"homeSideNavCtl.filterExpression\"\n" +
    "                   selected-nodes=\"homeSideNavCtl.selectedNodes\"\n" +
    "                   modules=\"homeSideNavCtl.modules\">\n" +
    "            <md-button class=\"md-primary layout-fill\"\n" +
    "                       md-style-color=\"{'background-color': isSelected(node) ? 'warn.300': 'primary.0'}\"\n" +
    "                       style=\"text-align: left;\"\n" +
    "                       aria-label=\"{{node.menuTitle}}\"\n" +
    "                       ng-href=\"{{ node.menuLink }}\"\n" +
    "                       ng-click=\"isLeaf(node)?$root.doOpenMenu():null\">\n" +
    "                <md-content flex layout=\"row\" style=\"background-color: transparent;\">\n" +
    "                    <ng-md-icon icon=\"{{ node.menuIcon||'apps'}}\"></ng-md-icon>\n" +
    "                    <span style=\"margin-left:5px;\" flex ng-bind=\"node.menuTitle\"></span>\n" +
    "                    <ng-md-icon ng-if=\"!isLeaf(node)\"\n" +
    "                                icon=\"{{ isShowChildren(node)?'expand_more':'chevron_right' }}\"></ng-md-icon>\n" +
    "                </md-content>\n" +
    "            </md-button>\n" +
    "        </side-menu>\n" +
    "    </md-content>\n" +
    "    <div style=\"height: 30px;\"></div>\n" +
    "</md-content>");
}]);

angular.module("client/js/partials/controllers/home/sidenav_right.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("client/js/partials/controllers/home/sidenav_right.html",
    "<md-content flex layout=\"column\">\n" +
    "    <md-list>\n" +
    "        <md-subheader class=\"md-no-sticky\">用户设置</md-subheader>\n" +
    "        <md-list-item ng-click=\"sidenavrightCtl.doEditPsw($event)\">\n" +
    "            <ng-md-icon icon=\"lock_outline\"></ng-md-icon>\n" +
    "            <p>修改密码</p>\n" +
    "        </md-list-item>\n" +
    "        <md-list-item ng-click=\"sidenavrightCtl.doSetAliasName($event)\">\n" +
    "            <ng-md-icon icon=\"perm_identity\"></ng-md-icon>\n" +
    "            <p>设置昵称</p>\n" +
    "        </md-list-item>\n" +
    "        <!--md-list-item ng-click=\"sidenavrightCtl.doSetMobile($event)\">\n" +
    "            <ng-md-icon icon=\"phone_iphone\"></ng-md-icon>\n" +
    "            <p>绑定手机 {{ $root.user.mobile }}</p>\n" +
    "        </md-list-item>\n" +
    "        <md-list-item ng-click=\"sidenavrightCtl.doSetEmail($event)\">\n" +
    "            <ng-md-icon icon=\"email\"></ng-md-icon>\n" +
    "            <p>绑定邮箱 {{ $root.user.email }}</p>\n" +
    "        </md-list-item>\n" +
    "        <md-divider></md-divider>\n" +
    "        <md-subheader class=\"md-no-sticky\">服务器</md-subheader>\n" +
    "        <md-list-item ng-click=\"sidenavrightCtl.doSetComputer($event)\">\n" +
    "            <ng-md-icon icon=\"computer\"></ng-md-icon>\n" +
    "            <p>{{ $root.server.serName }}</p>\n" +
    "        </md-list-item-->\n" +
    "    </md-list>\n" +
    "</md-content>\n" +
    "\n" +
    "<md-divider></md-divider>\n" +
    "<div layout=\"row\" layout-align=\"start center\">\n" +
    "    <!--<h4 style=\"padding-left:10px;\" flex>上海萌义网络科技有限公司</h4>-->\n" +
    "    <md-button ng-click=\"sidenavrightCtl.doExitSystem($event)\" flex class=\"md-warn\">\n" +
    "        <md-tooltip>\n" +
    "            退出\n" +
    "        </md-tooltip>\n" +
    "        <ng-md-icon icon=\"settings_power\"></ng-md-icon>\n" +
    "        退出\n" +
    "    </md-button>\n" +
    "</div>\n" +
    "");
}]);

angular.module("client/js/partials/controllers/permission/actors/manager_group_form.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("client/js/partials/controllers/permission/actors/manager_group_form.html",
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
    "            <md-list layout-padding>\n" +
    "                <md-list-item ng-repeat=\"group in formCtl.clientData.datas\"\n" +
    "                              ng-click=\"formCtl.toggleAction(group)\"\n" +
    "                              layout=\"row\">\n" +
    "                    <span flex>{{ group.groupTitle }}</span>\n" +
    "                    <ng-md-icon ng-show=\"formCtl.checked(group)\" icon=\"done\"></ng-md-icon>\n" +
    "                </md-list-item>\n" +
    "            </md-list>\n" +
    "        </md-content>\n" +
    "    </md-dialog-content>\n" +
    "    <md-dialog-actions layout=\"row\">\n" +
    "        <span flex></span>\n" +
    "        <md-button ng-disabled=\"formCtl.isBusy\"\n" +
    "                   aria-label=\"formCtl.title\"\n" +
    "                   ng-click=\"formCtl.save()\">\n" +
    "            决定了\n" +
    "        </md-button>\n" +
    "    </md-dialog-actions>\n" +
    "</md-dialog>");
}]);

angular.module("client/js/partials/controllers/permission/groups/manager_permiss_form.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("client/js/partials/controllers/permission/groups/manager_permiss_form.html",
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
    "            <section ng-repeat=\"menu in formCtl.clientData.datas\">\n" +
    "                <md-subheader class=\"md-primary\">{{ menu.menuTitle }}</md-subheader>\n" +
    "                <md-list layout-padding>\n" +
    "                    <md-list-item ng-repeat=\"action in menu.actions\"\n" +
    "                                  ng-click=\"formCtl.toggleAction(action)\"\n" +
    "                                  layout=\"row\">\n" +
    "                        <ng-md-icon icon=\"{{action.actIcon}}\"></ng-md-icon>\n" +
    "                        <span flex>{{ action.actTitle }}</span>\n" +
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
    "                   ng-click=\"formCtl.update()\">\n" +
    "            决定了\n" +
    "        </md-button>\n" +
    "    </md-dialog-actions>\n" +
    "</md-dialog>\n" +
    "\n" +
    "");
}]);

angular.module("client/js/partials/decorator/material/datepicker.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("client/js/partials/decorator/material/datepicker.html",
    "<div aria-label=\"{{ form.title }}\"\n" +
    "     class=\"{{form.htmlClass}} md-input-has-messages schema-form-jsoneditor\">\n" +
    "    <!--<h3 ng-show=\"form.title && form.notitle !== true\">{{ form.title }}</h3>-->\n" +
    "\n" +
    "    <md-datepicker class=\"{{form.htmlClass}} flex\"\n" +
    "                   md-theme=\"dark\"\n" +
    "                   ng-model=\"$$value$$\"\n" +
    "                   sf-field-model\n" +
    "                   md-placeholder=\"{{ form.title }}\"\n" +
    "                   schema-validate=\"form\"\n" +
    "                   md-min-date=\"evalInScope(form.mdMinDate)\"\n" +
    "                   md-max-date=\"evalInScope(form.mdMaxDate)\"\n" +
    "                   md-date-filter=\"form.filter\"></md-datepicker>\n" +
    "    <md-input-container>\n" +
    "        <div ng-messages=\"ngModel.$error\">\n" +
    "            <div sf-message ng-message></div>\n" +
    "        </div>\n" +
    "    </md-input-container>\n" +
    "</div>\n" +
    "");
}]);

angular.module("client/js/partials/decorator/material/datetimepicker.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("client/js/partials/decorator/material/datetimepicker.html",
    "<div class=\"form-group {{form.htmlClass}} schema-form-datetime\" sf-layout>\n" +
    "    <!--<md-date-picker date=\"$$value$$\" ng-model=\"$$value$$\" title=\"form.title\" sf-field-model=\"all\"></md-date-picker>-->\n" +
    "    <div md-date-picker\n" +
    "         md-no-float=\"true\"\n" +
    "         title=\"form.title\"\n" +
    "         ng-model=\"$$value$$\"\n" +
    "         id=\"{{form.key.slice(-1)[0]}}\"\n" +
    "         name=\"{{form.key.slice(-1)[0]}}\"\n" +
    "         sf-field-model\n" +
    "         schema-validate=\"form\">\n" +
    "        <div ng-messages=\"ngModel.$error\">\n" +
    "            <div class=\"md-char-counter\">{{ form.description }}</div>\n" +
    "            <div sf-message ng-message></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("client/js/partials/decorator/material/jsoneditor.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("client/js/partials/decorator/material/jsoneditor.html",
    "<md-input-container aria-label=\"{{ form.title }}\"\n" +
    "                    class=\"{{form.htmlClass}} md-input-has-messages schema-form-jsoneditor\">\n" +
    "    <h3 ng-show=\"form.title && form.notitle !== true\">{{ form.title }}</h3>\n" +
    "    <div ng-jsoneditor class=\"{{form.htmlClass}}\"\n" +
    "         style=\"height: 500px;\"\n" +
    "         flex\n" +
    "         sf-field-model\n" +
    "         prefer-text=\"form.preferText\"\n" +
    "         sf-changed=\"form\"\n" +
    "         schema-validate=\"form\"\n" +
    "         ng-model=\"$$value$$\" options=\"form.jsonOptions\"></div>\n" +
    "\n" +
    "    <div ng-messages=\"ngModel.$error\">\n" +
    "        <div class=\"md-char-counter\">{{ form.description }}</div>\n" +
    "        <div sf-message ng-message></div>\n" +
    "    </div>\n" +
    "</md-input-container>\n" +
    "");
}]);

angular.module("client/js/partials/decorator/material/linkbutton.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("client/js/partials/decorator/material/linkbutton.html",
    "<section class=\"schema-form-submit {{form.htmlClass}}\">\n" +
    "    <md-button ui-sref=\"{{form.sref}}\" flex class=\"{{ form.style || 'md-primary' }} {{form.fieldHtmlClass}}\"\n" +
    "               ng-disabled=\"form.readonly\">\n" +
    "        {{form.title}}\n" +
    "    </md-button>\n" +
    "</section>");
}]);

angular.module("client/js/partials/decorator/material/uploader-single.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("client/js/partials/decorator/material/uploader-single.html",
    "<div class=\"schema-form-uploader-single\" ng-class=\"form.htmlClass\" flex>\n" +
    "    <qiniu-uploader schema-validate=\"form\"\n" +
    "                    sf-field-model\n" +
    "                    ng-model=\"$$value$$\"\n" +
    "                    name=\"{{form.key.slice(-1)[0]}}\"\n" +
    "                    form=\"form\"\n" +
    "                    flex\n" +
    "                    schema=\"schema\"></qiniu-uploader>\n" +
    "    <md-input-container>\n" +
    "        <div ng-messages=\"ngModel.$error\">\n" +
    "            <div sf-message ng-message></div>\n" +
    "        </div>\n" +
    "    </md-input-container>\n" +
    "</div>");
}]);

angular.module("client/js/partials/decorator/material/uploader.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("client/js/partials/decorator/material/uploader.html",
    "<div class=\"btn-group schema-form-actions\" ng-class=\"form.htmlClass\" layout=\"column\">\n" +
    "    <qiniu-uploader schema-validate=\"form\"\n" +
    "                    sf-field-model\n" +
    "                    id=\"{{form.key.slice(-1)[0]}}\"\n" +
    "                    name=\"{{form.key.slice(-1)[0]}}\"\n" +
    "                    form=\"form\"\n" +
    "                    flex\n" +
    "                    schema=\"schema\"></qiniu-uploader>\n" +
    "    <md-input-container>\n" +
    "        <div ng-messages=\"ngModel.$error\">\n" +
    "            <div sf-message ng-message></div>\n" +
    "        </div>\n" +
    "    </md-input-container>\n" +
    "</div>\n" +
    "");
}]);

angular.module("client/js/partials/directives/mdPickers.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("client/js/partials/directives/mdPickers.html",
    "<div layout=\"row\">\n" +
    "    <div class=\"am-fade-and-scale md-dialog-container\"\n" +
    "         ng-show=\"datepicker.showPopup\"\n" +
    "         style=\"top: 0px;position: fixed;\">\n" +
    "        <md-dialog aria-label=\"\" class=\"mdp-datepicker \"\n" +
    "                   md-theme=\"dark\"\n" +
    "                   ng-class=\"{ 'md-transition-in':datepicker.showPopup,  'portrait': !$mdMedia('gt-sm') }\">\n" +
    "            <md-dialog-content layout=\"row\">\n" +
    "                <div layout=\"column\" layout-align=\"start center\">\n" +
    "                    <md-toolbar layout-align=\"center center\" class=\"mdp-datepicker-dow md-primary\"><span>{{ datepicker.currentMoment.format(\"dddd\") }}</span>\n" +
    "                    </md-toolbar>\n" +
    "                    <md-toolbar layout-align=\"center center\" class=\"mdp-datepicker-date md-primary\"\n" +
    "                                layout=\"column\">\n" +
    "                        <div class=\"mdp-datepicker-month\">{{ datepicker.currentMoment.format(\"MMM\") }}</div>\n" +
    "                        <div class=\"mdp-datepicker-day\">{{ datepicker.currentMoment.format(\"DD\") }}</div>\n" +
    "                        <md-select class=\"mdp-datepicker-year\"\n" +
    "                                   placeholder=\"{{ datepicker.currentMoment.format('YYYY') }}\"\n" +
    "                                   ng-model=\"year\" ng-change=\"datepicker.setYear()\">\n" +
    "                            <md-option ng-value=\"year\" ng-repeat=\"year in yearsOptions\">{{ year }}</md-option>\n" +
    "                        </md-select>\n" +
    "                    </md-toolbar>\n" +
    "                </div>\n" +
    "                <div layout=\"column\" layout-align=\"start center\" class=\"mdp-datepicker-calendar\">\n" +
    "                    <div layout=\"row\" layout-align=\"space-between center\" class=\"mdp-datepicker-monthyear\">\n" +
    "                        <md-button aria-label=\"previous month\" class=\"md-icon-button\" ng-click=\"datepicker.prevMonth()\">\n" +
    "                            <!--<md-icon md-font-set=\"material-icons\"> chevron_left</md-icon>-->\n" +
    "                            <ng-md-icon icon=\"arrow_back\"></ng-md-icon>\n" +
    "                        </md-button>\n" +
    "\n" +
    "                        {{ datepicker.currentMoment.format(\"MMMM YYYY\") }}\n" +
    "                        <md-button aria-label=\"next month\" class=\"md-icon-button\" ng-click=\"datepicker.nextMonth()\">\n" +
    "                            <!--<md-icon md-font-set=\"material-icons\"> chevron_right</md-icon>-->\n" +
    "                            <ng-md-icon icon=\"arrow_forward\"></ng-md-icon>\n" +
    "                        </md-button>\n" +
    "                    </div>\n" +
    "                    <div layout=\"row\" layout-align=\"space-around center\" class=\"mdp-datepicker-week-days\">\n" +
    "                        <div layout layout-align=\"center center\" ng-repeat=\"d in datepicker.weekDays track by $index\">{{\n" +
    "                            d\n" +
    "                            }}\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div layout=\"row\" layout-wrap class=\"mdp-datepicker-days\">\n" +
    "                        <div layout layout-align=\"center center\"\n" +
    "                             ng-repeat-start=\"n in datepicker.getDaysInMonth() track by $index\">\n" +
    "                            <md-button class=\"md-icon-button md-raised\" aria-label=\"seleziona giorno\"\n" +
    "                                       ng-if=\"n !== false\"\n" +
    "                                       ng-class=\"{'md-accent': datepicker.currentMoment.date() == n}\"\n" +
    "                                       ng-click=\"datepicker.selectDate(n)\">{{ n }}\n" +
    "                            </md-button>\n" +
    "                        </div>\n" +
    "                        <div flex ng-if=\"($index + 1) % 7 == 0\" ng-repeat-end></div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </md-dialog-content>\n" +
    "\n" +
    "            <div layout=\"row\" flex-order=\"2\">\n" +
    "                <div flex=\"10\" layout=\"row\" layout-align=\"center center\">\n" +
    "                    <span class=\"md-body-1\">小时</span>\n" +
    "                </div>\n" +
    "                <md-slider aria-label=\"小时\" flex ng-model=\"datepicker.hour\" min=\"0\" max=\"23\" class=\"md-accent\">\n" +
    "                </md-slider>\n" +
    "                <span flex=\"10\" layout=\"row\" layout-align=\"center center\">{{ datepicker.hour }}</span>\n" +
    "            </div>\n" +
    "            <div layout=\"row\" flex-order=\"2\">\n" +
    "                <div flex=\"10\" layout layout-align=\"center center\">\n" +
    "                    <span class=\"md-body-1\">分钟</span>\n" +
    "                </div>\n" +
    "                <md-slider aria-label=\"分钟\" flex ng-model=\"datepicker.minute\" min=\"0\" max=\"59\" class=\"md-accent\">\n" +
    "                </md-slider>\n" +
    "                <span flex=\"10\" layout=\"row\" layout-align=\"center center\">{{ datepicker.minute }}</span>\n" +
    "            </div>\n" +
    "            <div layout=\"row\" flex-order=\"2\">\n" +
    "                <div flex=\"10\" layout layout-align=\"center center\">\n" +
    "                    <span class=\"md-body-1\">秒</span>\n" +
    "                </div>\n" +
    "                <md-slider aria-label=\"秒\" flex ng-model=\"datepicker.second\" min=\"0\" max=\"59\" class=\"md-accent\">\n" +
    "                </md-slider>\n" +
    "                <span flex=\"10\" layout=\"row\" layout-align=\"center center\">{{ datepicker.second }}</span>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"md-actions\" layout=\"row\">\n" +
    "                <md-button ng-click=\"datepicker.cancel()\" aria-label=\"LABEL_CANCEL\">取消</md-button>\n" +
    "                <md-button ng-click=\"datepicker.confirm()\" aria-label=\"LABEL_OK\">确定</md-button>\n" +
    "            </div>\n" +
    "        </md-dialog>\n" +
    "    </div>\n" +
    "    <md-input-container flex>\n" +
    "        <label>{{datepicker.title}}</label>\n" +
    "        <input type=\"text\" ng-readonly=\"true\" ng-model=\"datepicker.strDate\">\n" +
    "        <ng-transclude flex-order=\"2\"></ng-transclude>\n" +
    "    </md-input-container>\n" +
    "    <md-button class=\"md-icon-button\"\n" +
    "               aria-label=\"\"\n" +
    "               ng-click=\"datepicker.togglePopup()\">\n" +
    "        <md-icon class=\"md-datepicker-calendar-icon md-18\" md-svg-icon=\"md-calendar\" aria-label=\"md-calendar\"\n" +
    "                 role=\"img\"></md-icon>\n" +
    "    </md-button>\n" +
    "</div>\n" +
    "");
}]);

angular.module("client/js/partials/form/editpsw_form.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("client/js/partials/form/editpsw_form.html",
    "<md-dialog aria-label=\"{{formCtl.popup.description}}\"\n" +
    "           md-theme=\"dark\"\n" +
    "           flex-gt-sm=\"80\"\n" +
    "           flex=\"100\">\n" +
    "    <md-toolbar>\n" +
    "        <div class=\"md-toolbar-tools\">\n" +
    "            <h2>{{formCtl.schema.description}}</h2>\n" +
    "            <span flex></span>\n" +
    "            <md-button class=\"md-icon-button\"\n" +
    "                       ng-show=\"!formCtl.isBusy\"\n" +
    "                       ng-click=\"formCtl.close()\">\n" +
    "                <ng-md-icon icon=\"close\"></ng-md-icon>\n" +
    "            </md-button>\n" +
    "        </div>\n" +
    "    </md-toolbar>\n" +
    "    <!--<md-dialog-content flex class=\"md-padding\" style=\"min-height:250px;\">-->\n" +
    "        <form name=\"editPswForm\"\n" +
    "              layout=\"column\"\n" +
    "              sf-schema=\"formCtl.schema\"\n" +
    "              sf-form=\"formCtl.form\"\n" +
    "              sf-model=\"formCtl.formData\"\n" +
    "              equalsome=\"password,passwordAgain\">\n" +
    "        </form>\n" +
    "    <!--</md-dialog-content>-->\n" +
    "    <md-dialog-actions layout=\"row\">\n" +
    "        <span flex></span>\n" +
    "        <md-button ng-disabled=\"formCtl.isBusy\"\n" +
    "                   ng-click=\"formCtl.submit(editPswForm)\">\n" +
    "            修改密码\n" +
    "        </md-button>\n" +
    "    </md-dialog-actions>\n" +
    "</md-dialog>\n" +
    "\n" +
    "");
}]);

angular.module("client/js/partials/form/set_computer_form.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("client/js/partials/form/set_computer_form.html",
    "<md-dialog aria-label=\"{{formCtl.popup.description}}\"\n" +
    "           md-theme=\"dark\"\n" +
    "           flex-gt-sm=\"80\"\n" +
    "           flex=\"100\">\n" +
    "    <md-toolbar>\n" +
    "        <div class=\"md-toolbar-tools\">\n" +
    "            <h2>选择服务器</h2>\n" +
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
    "        <md-radio-group ng-model=\"formCtl.formData\">\n" +
    "            <div ng-repeat=\"server in formCtl.servers\" layout=\"row\">\n" +
    "                <div flex layout=\"row\" layout-padding layout-align=\"start center\" >\n" +
    "                    <md-radio-button flex\n" +
    "                                     ng-value=\"server\"\n" +
    "                                     class=\"md-primary\" >\n" +
    "                        {{server.serName}} {{server.serProtocol}}://{{server.serAddress}}:{{server.serPort}}\n" +
    "                    </md-radio-button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </md-radio-group>\n" +
    "        {{ formCtl.selectedIndex }}\n" +
    "    </md-dialog-content>\n" +
    "    <md-dialog-actions layout=\"row\">\n" +
    "        <span flex></span>\n" +
    "        <md-button ng-disabled=\"formCtl.isBusy\"\n" +
    "                   ng-click=\"formCtl.submit()\">\n" +
    "            选择服务器\n" +
    "        </md-button>\n" +
    "    </md-dialog-actions>\n" +
    "</md-dialog>\n" +
    "\n" +
    "");
}]);

angular.module("client/js/partials/form/setaliasname_form.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("client/js/partials/form/setaliasname_form.html",
    "<md-dialog aria-label=\"{{formCtl.schema.description}}\"\n" +
    "           md-theme=\"dark\"\n" +
    "           flex-gt-sm=\"80\"\n" +
    "           flex=\"100\">\n" +
    "    <md-toolbar>\n" +
    "        <div class=\"md-toolbar-tools\">\n" +
    "            <h2>{{formCtl.schema.description}}</h2>\n" +
    "            <span flex></span>\n" +
    "            <md-button class=\"md-icon-button\"\n" +
    "                       ng-show=\"!formCtl.isBusy\"\n" +
    "                       ng-click=\"formCtl.close()\">\n" +
    "                <ng-md-icon icon=\"close\"></ng-md-icon>\n" +
    "            </md-button>\n" +
    "        </div>\n" +
    "    </md-toolbar>\n" +
    "    <!--<md-dialog-content flex class=\"md-padding\" style=\"min-height:180px;\">-->\n" +
    "        <form name=\"setNicknameForm\"\n" +
    "              layout=\"column\"\n" +
    "              sf-schema=\"formCtl.schema\"\n" +
    "              sf-form=\"formCtl.form\"\n" +
    "              sf-model=\"formCtl.formData\">\n" +
    "        </form>\n" +
    "    <!--</md-dialog-content>-->\n" +
    "    <md-dialog-actions layout=\"row\">\n" +
    "        <span flex></span>\n" +
    "        <md-button ng-disabled=\"formCtl.isBusy\"\n" +
    "                   ng-click=\"formCtl.submit(setNicknameForm)\">\n" +
    "            设置昵称\n" +
    "        </md-button>\n" +
    "    </md-dialog-actions>\n" +
    "</md-dialog>");
}]);

angular.module("client/js/partials/form/setemail_form.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("client/js/partials/form/setemail_form.html",
    "<script type=\"text/ng-template\" id=\"/setEmailFirst.html\">\n" +
    "    <form name=\"setEmailFirstForm\"\n" +
    "          layout=\"column\"\n" +
    "          sf-schema=\"formCtl.schema\"\n" +
    "          sf-form=\"formCtl.formFirst\"\n" +
    "          sf-model=\"formCtl.formData\"\n" +
    "          ng-submit=\"formCtl.doSendCode(setEmailFirstForm)\">\n" +
    "    </form>\n" +
    "</script>\n" +
    "<script type=\"text/ng-template\" id=\"/setEmailSecond.html\">\n" +
    "    <form name=\"setEmailSecondForm\"\n" +
    "          layout=\"column\"\n" +
    "          sf-schema=\"formCtl.schema\"\n" +
    "          sf-form=\"formCtl.formSecond\"\n" +
    "          sf-model=\"formCtl.formData\"\n" +
    "          ng-submit=\"formCtl.doBindPhone(setEmailSecondForm)\">\n" +
    "    </form>\n" +
    "</script>\n" +
    "\n" +
    "<md-dialog aria-label=\"{{formCtl.schema.description}}\"\n" +
    "           md-theme=\"dark\"\n" +
    "           flex-gt-sm=\"80\"\n" +
    "           flex=\"100\">\n" +
    "    <md-toolbar>\n" +
    "        <div class=\"md-toolbar-tools\">\n" +
    "            <h2>{{formCtl.schema.description}}</h2>\n" +
    "            <span flex></span>\n" +
    "            <md-button class=\"md-icon-button\"\n" +
    "                       ng-show=\"!formCtl.isBusy\"\n" +
    "                       ng-click=\"formCtl.close()\">\n" +
    "                <ng-md-icon icon=\"close\"></ng-md-icon>\n" +
    "            </md-button>\n" +
    "        </div>\n" +
    "    </md-toolbar>\n" +
    "    <md-dialog-content flex class=\"md-padding\">\n" +
    "        <md-tabs md-selected=\"formCtl.selectedIndex\"\n" +
    "                 md-dynamic-height=\"true\"\n" +
    "                 md-center-tabs=\"true\"\n" +
    "                 md-swipe-content\n" +
    "                 md-border-bottom>\n" +
    "            <md-tab ng-repeat=\"step in formCtl.steps\"\n" +
    "                    ng-disabled=\"true\"\n" +
    "                    label=\"{{step.title}}\">\n" +
    "                <div ng-include=\"step.templateUrl\"></div>\n" +
    "            </md-tab>\n" +
    "        </md-tabs>\n" +
    "\n" +
    "    </md-dialog-content>\n" +
    "</md-dialog>");
}]);

angular.module("client/js/partials/form/setmobile_form.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("client/js/partials/form/setmobile_form.html",
    "<script type=\"text/ng-template\" id=\"/setMobileFirst.html\">\n" +
    "    <form name=\"setMobileFirstForm\"\n" +
    "          layout=\"column\"\n" +
    "          sf-schema=\"formCtl.schema\"\n" +
    "          sf-form=\"formCtl.formFirst\"\n" +
    "          sf-model=\"formCtl.formData\"\n" +
    "          ng-submit=\"formCtl.doSendCode(setMobileFirstForm)\">\n" +
    "    </form>\n" +
    "</script>\n" +
    "<script type=\"text/ng-template\" id=\"/setMobileSecond.html\">\n" +
    "    <form name=\"setMobileSecondForm\"\n" +
    "          layout=\"column\"\n" +
    "          sf-schema=\"formCtl.schema\"\n" +
    "          sf-form=\"formCtl.formSecond\"\n" +
    "          sf-model=\"formCtl.formData\"\n" +
    "          ng-submit=\"formCtl.doBindPhone(setMobileSecondForm)\">\n" +
    "    </form>\n" +
    "</script>\n" +
    "<md-dialog aria-label=\"{{formCtl.schema.description}}\"\n" +
    "           md-theme=\"dark\"\n" +
    "           flex-gt-sm=\"80\"\n" +
    "           flex=\"100\">\n" +
    "    <md-toolbar>\n" +
    "        <div class=\"md-toolbar-tools\">\n" +
    "            <h2>{{formCtl.schema.description}}</h2>\n" +
    "            <span flex></span>\n" +
    "            <md-button class=\"md-icon-button\"\n" +
    "                       ng-show=\"!formCtl.isBusy\"\n" +
    "                       ng-click=\"formCtl.close()\">\n" +
    "                <ng-md-icon icon=\"close\"></ng-md-icon>\n" +
    "            </md-button>\n" +
    "        </div>\n" +
    "    </md-toolbar>\n" +
    "    <md-dialog-content flex class=\"md-padding\">\n" +
    "        <md-tabs md-selected=\"formCtl.selectedIndex\"\n" +
    "                 md-dynamic-height=\"true\"\n" +
    "                 md-center-tabs=\"true\"\n" +
    "                 md-swipe-content\n" +
    "                 md-border-bottom>\n" +
    "            <md-tab ng-repeat=\"step in formCtl.steps\"\n" +
    "                    ng-disabled=\"true\"\n" +
    "                    label=\"{{step.title}}\">\n" +
    "                <div ng-include=\"step.templateUrl\"></div>\n" +
    "            </md-tab>\n" +
    "        </md-tabs>\n" +
    "\n" +
    "    </md-dialog-content>\n" +
    "</md-dialog-9876");
}]);
