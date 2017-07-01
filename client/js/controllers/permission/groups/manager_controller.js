/**
 * Created by NICK on 15/11/5.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "../../../../node_modules/nick_common_static/common/common/controller/resource/grid_material_controller", "../../../../node_modules/nick_common_static/common/models/common/client_data", "../../../../node_modules/nick_common_static/common/models/common/query_base", "../../../../node_modules/nick_common_static/common/models/common/toolbar_item", "controllers/permission/groups/manager_add_controller", "controllers/permission/groups/manager_edit_controller", "controllers/permission/groups/manager_permiss_controller"], function (require, exports, gridCon, client, query, toolbar, gpcadd, gpcedit, gpcpermiss) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller = (function (_super) {
        __extends(Controller, _super);
        function Controller() {
            var _this = _super.call(this, arguments) || this;
            _this.title = '权限组列表';
            _this.init();
            return _this;
        }
        Controller.prototype.initToolbar = function () {
            var self = this;
            self.rootToolbars.push(new toolbar.Common.ToolbarItem({
                title: '新建权限组',
                icon: 'add',
                onClick: function ($event) {
                    self.add(null, $event);
                }
            }));
            self.rootToolbars.push(new toolbar.Common.ToolbarItem({
                title: '刷新',
                icon: 'refresh',
                onClick: function ($event) {
                    self.getServerData();
                }
            }));
            self.rootToolbars.push(new toolbar.Common.ToolbarItem({
                title: '搜索',
                icon: 'search',
                onClick: function ($event) {
                    self.toggleSearchBar();
                }
            }));
            self.itemToolbars.push(new toolbar.Common.ToolbarItem({
                title: '修改权限组',
                icon: 'edit',
                onClick: function (item, $event) {
                    self.edit(item, $event);
                }
            }));
            self.itemToolbars.push(new toolbar.Common.ToolbarItem({
                title: '删除权限组',
                icon: 'delete',
                onClick: function (item, $event) {
                    self.del(item, $event);
                }
            }));
            self.itemToolbars.push(new toolbar.Common.ToolbarItem({
                title: '编辑菜单',
                icon: 'menu',
                onClick: function (item, $event) {
                    self.permiss(item, $event);
                }
            }));
        };
        Controller.prototype.initSearch = function () {
            var _this = this;
            this.$http({
                method: 'GET',
                url: '/schema/group.json'
            }).success(function (data) {
                _this.schema = data;
                _this.searchForm = [
                    {
                        key: 'groupTitle',
                        required: false,
                        copyValueTo: ["r-groupTitle.like"],
                        type: 'text'
                    }
                ];
            });
        };
        Controller.prototype.init = function () {
            var _this = this;
            this.clientData = new client.Common.ClientData();
            this.queryData = new query.Common.QueryBase();
            this.queryData.include = ['groupactions'];
            this.serverInterfaces = {
                query: this.Restangular.all('groups').getList.bind(this, { filter: this.queryData }),
                count: this.Restangular.one('groups', 'count').get.bind(this, { where: this.queryData.where })
            };
            this.dataFilter = function (serverData) {
                _this.clientData.datas.length = 0;
                _this.clientData.datas = serverData['query'] || [];
                _this.clientData.total = serverData['count'].count || 0;
                return _this.clientData;
            };
            this.getServerData();
            this.initToolbar();
            this.initColumns();
        };
        Controller.prototype.add = function (item, $event) {
            var _this = this;
            var dialogOptions = {};
            dialogOptions.controller = gpcadd.Controller._name;
            dialogOptions.controllerAs = 'formCtl';
            dialogOptions.templateUrl = gpcadd.Controller._templateUrl;
            dialogOptions.targetEvent = $event;
            dialogOptions.clickOutsideToClose = false;
            dialogOptions.resolve = {
                'managerGrid': function () {
                    return _this;
                }
            };
            this.$mdDialog.show(dialogOptions);
        };
        Controller.prototype.edit = function (item, $event) {
            var _this = this;
            var dialogOptions = {};
            dialogOptions.controller = gpcedit.Controller._name;
            dialogOptions.controllerAs = 'formCtl';
            dialogOptions.templateUrl = gpcedit.Controller._templateUrl;
            dialogOptions.targetEvent = $event;
            dialogOptions.clickOutsideToClose = false;
            dialogOptions.resolve = {
                'managerGrid': function () {
                    return _this;
                },
                'currentItem': function () {
                    return item;
                }
            };
            this.$mdDialog.show(dialogOptions);
        };
        Controller.prototype.del = function (item, $event) {
            this.confirm({
                title: '删除权限组',
                content: '确认吗?',
                $event: $event,
                isRefresh: true,
                ignoreSelection: true
            }, {
                groupactions: this.Restangular.one('groups', item.groupId).all('groupactions').doDELETE.bind(this),
                group: this.Restangular.one('groups', item.groupId).doDELETE.bind(this)
            });
        };
        Controller.prototype.permiss = function (item, $event) {
            var _this = this;
            var dialogOptions = {};
            dialogOptions.controller = gpcpermiss.Controller._name;
            dialogOptions.controllerAs = 'formCtl';
            dialogOptions.templateUrl = gpcpermiss.Controller._templateUrl;
            dialogOptions.targetEvent = $event;
            dialogOptions.clickOutsideToClose = false;
            dialogOptions.resolve = {
                'managerGrid': function () {
                    return _this;
                },
                'currentItem': function () {
                    return item;
                }
            };
            this.$mdDialog.show(dialogOptions);
        };
        return Controller;
    }(gridCon.GridController));
    Controller._name = 'GroupManagerController';
    Controller.$inject = ['$rootScope', '$scope', '$mdToast', '$mdDialog', 'Restangular', '$http', '$q'];
    exports.Controller = Controller;
});
//# sourceMappingURL=manager_controller.js.map