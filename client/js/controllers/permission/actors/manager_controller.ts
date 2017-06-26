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
import mmcadd = require('controllers/permission/actors/manager_add_controller');
import mmcedit = require('controllers/permission/actors/manager_edit_controller');
import group = require('controllers/permission/actors/manager_group_controller');

export class Controller extends gridCon.GridController<any> {
    public static _name:string = 'ActorManagerController';
    public static $inject:Array<any> = ['$rootScope', '$scope', '$mdToast', '$mdDialog', 'Restangular', '$http', '$q', '$state', '$stateParams'];

    public title:string = '角色列表';
    public Restangular:any;

    constructor() {
        super(arguments);
        this.init();
    }

    initToolbar() {
        var self = this;

        self.rootToolbars.push(new toolbar.Common.ToolbarItem({
            title: '新建角色',
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
            title: '修改角色',
            icon: 'edit',
            onClick: function (item, $event) {
                self.edit(item, $event);
            }

        }));
        self.itemToolbars.push(new toolbar.Common.ToolbarItem({
            title: '删除角色',
            icon: 'delete',
            onClick: function (item, $event) {
                self.del(item, $event);
            }

        }));
        self.itemToolbars.push(new toolbar.Common.ToolbarItem({
            title: '管理权限组',
            icon: 'note_add',
            onClick: function (item, $event) {
                self.actions(item, $event);
            }
        }))
    }

    initSearch() {
        this.$http({
            method: 'GET',
            url: '/schema/actor.json'
        }).success((data)=> {
            this.schema = data;
            this.searchForm = [
                {
                    key: 'aorTitle',
                    required: false,
                    copyValueTo: ["r-aorTitle.like"],
                    type: 'text'
                }
            ];
        });
    }

    init() {
        this.clientData = new client.Common.ClientData<any>();
        this.queryData = new query.Common.QueryBase();
        this.queryData.include = ['actorgroups'];
        this.serverInterfaces = {
            query: this.Restangular.all('actors').getList.bind(this, {filter: this.queryData}),
            count: this.Restangular.one('actors', 'count').get.bind(this, {where: this.queryData.where})
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
        this.confirm({
            title: '删除角色',
            content: '确认吗?',
            $event: $event,
            isRefresh: true,
            ignoreSelection: true
        }, {
            actorgroups: this.Restangular.one('actors', item.aorId).all('actorgroups').doDELETE.bind(this),
            actor: this.Restangular.one('actors', item.aorId).doDELETE.bind(this)
        });
    }

    actions(item, $event) {
        var dialogOptions:ng.material.IDialogOptions = {};

        dialogOptions.controller = group.Controller._name;
        dialogOptions.controllerAs = 'formCtl';
        dialogOptions.templateUrl = group.Controller._templateUrl;
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
