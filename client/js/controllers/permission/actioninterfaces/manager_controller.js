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
define(["require", "exports", "../../../../node_modules/nick_common_static/common/common/controller/resource/grid_material_controller", "../../../../node_modules/nick_common_static/common/models/common/client_data", "../../../../node_modules/nick_common_static/common/models/common/query_base", "../../../../node_modules/nick_common_static/common/models/common/toolbar_item", "controllers/permission/actioninterfaces/manager_add_controller", "controllers/permission/actioninterfaces/manager_edit_controller"], function (require, exports, gridCon, client, query, toolbar, addcon, editcon) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller = (function (_super) {
        __extends(Controller, _super);
        function Controller() {
            var _this = _super.call(this, arguments) || this;
            _this.title = '操作列表';
            _this.init();
            return _this;
        }
        Controller.prototype.initColumns = function () {
            this.columns = [{
                    name: 'ID',
                    template: 'item.id'
                }, {
                    name: '操作ID',
                    template: 'item.actId'
                }, {
                    name: '接口ID',
                    template: 'item.interfaceId'
                }, {
                    name: 'KEY',
                    template: 'item.key'
                }];
        };
        Controller.prototype.initToolbar = function () {
            var self = this;
            self.rootToolbars.push(new toolbar.Common.ToolbarItem({
                title: '返回菜单',
                icon: 'arrow_back',
                onClick: function ($event) {
                    self.$state.go('home.action', {
                        menuId: self.$stateParams['menuId'],
                        menuTitle: self.$stateParams['menuTitle']
                    });
                }
            }));
            self.rootToolbars.push(new toolbar.Common.ToolbarItem({
                title: '新建操作',
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
            self.itemToolbars.push(new toolbar.Common.ToolbarItem({
                title: '修改操作',
                icon: 'edit',
                onClick: function (item, $event) {
                    self.edit(item, $event);
                }
            }));
            self.itemToolbars.push(new toolbar.Common.ToolbarItem({
                title: '删除操作',
                icon: 'delete',
                onClick: function (item, $event) {
                    self.del(item, $event);
                }
            }));
        };
        Controller.prototype.init = function () {
            var _this = this;
            this.title = this.$stateParams['actTitle'] + '--接口列表';
            this.clientData = new client.Common.ClientData();
            this.queryData = new query.Common.QueryBase();
            this.defQuery = {
                actId: this.$stateParams['actId']
            };
            this.serverInterfaces = {
                query: this.Restangular.all('actioninterfaces').getList.bind(this, { filter: this.queryData }),
                count: this.Restangular.one('actioninterfaces', 'count').get.bind(this, { where: this.queryData.where })
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
            dialogOptions.controller = addcon.Controller._name;
            dialogOptions.controllerAs = 'formCtl';
            dialogOptions.templateUrl = addcon.Controller._templateUrl;
            dialogOptions.targetEvent = $event;
            dialogOptions.clickOutsideToClose = false;
            dialogOptions.resolve = {
                'managerGrid': function () {
                    return _this;
                },
                'actId': function () {
                    return _this.$stateParams['actId'];
                }
            };
            this.$mdDialog.show(dialogOptions);
        };
        Controller.prototype.edit = function (item, $event) {
            var _this = this;
            var dialogOptions = {};
            dialogOptions.controller = editcon.Controller._name;
            dialogOptions.controllerAs = 'formCtl';
            dialogOptions.templateUrl = editcon.Controller._templateUrl;
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
                title: '删除操作',
                content: '确认吗?',
                $event: $event,
                isRefresh: true,
                ignoreSelection: true
            }, { action: this.Restangular.one('actioninterfaces', item.id).doDELETE.bind(this) });
        };
        return Controller;
    }(gridCon.GridController));
    Controller._name = 'ActionInterfaceManagerController';
    Controller.$inject = ['$rootScope', '$scope', '$mdToast', '$mdDialog', 'Restangular', '$http', '$q', '$state', '$stateParams'];
    exports.Controller = Controller;
});
//# sourceMappingURL=manager_controller.js.map