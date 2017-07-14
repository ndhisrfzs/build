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
import gpcadd = require('controllers/permission/groups/manager_add_controller');
import gpcedit= require('controllers/permission/groups/manager_edit_controller');
import gpcpermiss= require('controllers/permission/groups/manager_permiss_controller');

export class Controller extends gridCon.GridController<any> {
    public static _name:string = 'GroupManagerController';
    public static $inject:Array<any> = ['$rootScope', '$scope', '$mdToast', '$mdDialog', 'Restangular', '$http', '$q'];

    public title:string = '权限组列表';
    public Restangular:any;

    constructor() {
        super(arguments);
        this.init();
    }

    initToolbar() {
        var self = this;

        self.rootToolbars.push(new toolbar.Common.ToolbarItem({
            title: '新建权限组',
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
    }

    initSearch() {
        this.$http({
            method: 'GET',
            url: '/schema/group.json'
        }).success((data)=> {
            this.schema = data;
            this.searchForm = [
                {
                    key: 'groupTitle',
                    required: false,
                    copyValueTo: ["r-groupTitle.like"],
                    type: 'text'
                }
            ];
        });
    }

    init() {
        this.clientData = new client.Common.ClientData<any>();
        this.queryData = new query.Common.QueryBase();
        this.queryData.include = ['groupactions'];
        this.serverInterfaces = {
            query: this.Restangular.all('groups').getList.bind(this, {filter: this.queryData}),
            count: this.Restangular.one('groups', 'count').get.bind(this, {where: this.queryData.where})
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

        dialogOptions.controller = gpcadd.Controller._name;
        dialogOptions.controllerAs = 'formCtl';
        dialogOptions.templateUrl = gpcadd.Controller._templateUrl;
        dialogOptions.targetEvent = $event;
        dialogOptions.clickOutsideToClose = false;
        dialogOptions.resolve = {
            'managerGrid': ()=> {
                return this;
            }
        };
        this.$mdDialog.show(dialogOptions);
    }

    edit(item, $event) {
        var dialogOptions:ng.material.IDialogOptions = {};

        dialogOptions.controller = gpcedit.Controller._name;
        dialogOptions.controllerAs = 'formCtl';
        dialogOptions.templateUrl = gpcedit.Controller._templateUrl;
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
    }

    permiss(item, $event) {
        var dialogOptions:ng.material.IDialogOptions = {};

        dialogOptions.controller = gpcpermiss.Controller._name;
        dialogOptions.controllerAs = 'formCtl';
        dialogOptions.templateUrl = gpcpermiss.Controller._templateUrl;
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
}
