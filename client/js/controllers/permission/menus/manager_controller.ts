/**
 * Created by NICK on 15/11/5.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */

import ref = require('ref');
import gridCon = require('../../../../node_modules/nick_common_static/common/common/controller/resource/grid_material_controller');
import client = require('../../../../node_modules/nick_common_static/common/models/common/client_data');
import query = require('../../../../node_modules/nick_common_static/common/models/common/query_base');
import toolbar = require('../../../../node_modules/nick_common_static/common/models/common/toolbar_item');
import _ = require('lodash');
import mmcadd = require('controllers/permission/menus/manager_add_controller');
import mmcedit = require('controllers/permission/menus/manager_edit_controller');
import atc = require('controllers/permission/actions/manager_controller');

export class Controller extends gridCon.GridController<any> {
    public static _name:string = 'MenuManagerController';
    public static $inject:Array<any> = ['$rootScope', '$scope', '$mdToast', '$mdDialog', 'Restangular', '$http', '$q', '$state', '$stateParams'];

    public title:string = '菜单列表';
    public Restangular:any;

    constructor() {
        super(arguments);
        this.init();
    }

    initToolbar() {
        var self = this;

        self.rootToolbars.push(new toolbar.Common.ToolbarItem({
            title: '新建模块',
            icon: 'add',
            onClick: ($event)=> {
                self.add(null, $event)
            }
        }));
        self.rootToolbars.push(new toolbar.Common.ToolbarItem({
            title: '刷新',
            icon: 'refresh',
            onClick: ($event)=> {
                self.getServerData();
            }
        }));
        self.rootToolbars.push(new toolbar.Common.ToolbarItem({
            title: '搜索',
            icon: 'search',
            onClick: ($event)=> {
                self.toggleSearchBar();
            }
        }));
        self.itemToolbars.push(new toolbar.Common.ToolbarItem({
            title: '新建子模块',
            icon: 'add',
            onClick: function (item, $event) {
                self.add(item, $event);
            }
        }));
        self.itemToolbars.push(new toolbar.Common.ToolbarItem({
            title: '修改模块',
            icon: 'edit',
            onClick: function (item, $event) {
                self.edit(item, $event);
            }
        }));
        self.itemToolbars.push(new toolbar.Common.ToolbarItem({
            title: '删除模块',
            icon: 'delete',
            onClick: function (item, $event) {
                self.del(item, $event);
            }

        }));
        self.itemToolbars.push(new toolbar.Common.ToolbarItem({
            title: '管理操作',
            icon: 'note_add',
            onClick: function (item, $event) {
                self.$state.go('home.action', {menuId: item.menuId, menuTitle: item.menuTitle});
            }
        }))
    }

    initSearch() {
        this.$http({
            method: 'GET',
            url: '/schema/menu.json'
        }).success((data)=> {
            this.schema = data;
            this.searchForm = [
                {
                    key: 'menuTitle',
                    required: false,
                    copyValueTo: ["r-menuTitle.like"],
                    type: 'text'
                }
            ];
        });
    }

    init() {
        this.clientData = new client.Common.ClientData<any>();
        this.queryData = new query.Common.QueryBase();
        this.queryData.pageCount = 50;
        this.queryData.order = 'lft';
        this.serverInterfaces = {
            query: this.Restangular.all('menus').getList.bind(this, {filter: this.queryData}),
            count: this.Restangular.one('menus', 'count').get.bind(this, {where: this.queryData.where})
        };

        this.dataFilter = (serverData:any)=> {
            this.clientData.datas.length = 0;
            this.clientData.datas = serverData['query'] || [];
            this.clientData.total = serverData['count'].count || 0;
            return this.clientData;
        };
        this.getServerData();
        this.initToolbar();
        this.initColumns();
    }

    add(item, $event) {
        var dialogOptions:ng.material.IDialogOptions = {};

        dialogOptions.controller = mmcadd.Controller._name;
        dialogOptions.controllerAs = 'formCtl';
        dialogOptions.templateUrl = mmcadd.Controller._templateUrl;
        dialogOptions.targetEvent = $event;
        dialogOptions.clickOutsideToClose = false;
        dialogOptions.resolve = {
            'managerGrid': ()=> {
                return this;
            },
            'parent': ()=> {
                return item;
            }
        };
        this.$mdDialog.show(dialogOptions);
    }

    edit(item, $event) {
        var dialogOptions:ng.material.IDialogOptions = {};

        dialogOptions.controller = mmcedit.Controller._name;
        dialogOptions.controllerAs = 'formCtl';
        dialogOptions.templateUrl = mmcedit.Controller._templateUrl;
        dialogOptions.targetEvent = $event;
        dialogOptions.clickOutsideToClose = false;
        dialogOptions.resolve = {
            'managerGrid': ()=> {
                return this;
            },
            'currentItem': ()=> {
                return item;
            }
        };
        this.$mdDialog.show(dialogOptions);
    }

    del(item, $event) {
        var content = "";
        if (item.rgt - item.lft > 1) {
            content = "删除当前节点,后同时删除此节点下的所有子节点!";
        }
        this.confirm({
            title: '删除菜单',
            content: content + '确认吗?',
            $event: $event,
            isRefresh: true,
            ignoreSelection: true
        }, {menu: this.Restangular.one('menus', item.menuId).doDELETE.bind(this)});
    }
}
