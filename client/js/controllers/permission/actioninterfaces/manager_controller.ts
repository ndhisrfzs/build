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

import addcon = require('controllers/permission/actioninterfaces/manager_add_controller');
import editcon = require('controllers/permission/actioninterfaces/manager_edit_controller');

export class Controller extends gridCon.GridController<any> {
    public static _name:string = 'ActionInterfaceManagerController';
    public static $inject:Array<any> = ['$rootScope', '$scope', '$mdToast', '$mdDialog', 'Restangular', '$http', '$q', '$state', '$stateParams'];

    public title:string = '操作列表';
    public Restangular:any;

    constructor() {
        super(arguments);
        this.init();
    }

    initColumns() {
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
        }]
    }

    initToolbar() {
        var self = this;

        self.rootToolbars.push(new toolbar.Common.ToolbarItem({
            title: '返回菜单',
            icon: 'arrow_back',
            onClick: ($event)=> {
                self.$state.go('home.action', {
                    menuId: self.$stateParams['menuId'],
                    menuTitle: self.$stateParams['menuTitle']
                });
            }
        }));
        self.rootToolbars.push(new toolbar.Common.ToolbarItem({
            title: '新建操作',
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
    }

    init() {
        this.title = this.$stateParams['actTitle'] + '--接口列表';
        this.clientData = new client.Common.ClientData<any>();
        this.queryData = new query.Common.QueryBase();

        this.defQuery = {
            actId: this.$stateParams['actId']
        };

        this.serverInterfaces = {
            query: this.Restangular.all('actioninterfaces').getList.bind(this, {filter: this.queryData}),
            count: this.Restangular.one('actioninterfaces', 'count').get.bind(this, {where: this.queryData.where})
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

        dialogOptions.controller = addcon.Controller._name;
        dialogOptions.controllerAs = 'formCtl';
        dialogOptions.templateUrl = addcon.Controller._templateUrl;
        dialogOptions.targetEvent = $event;
        dialogOptions.clickOutsideToClose = false;
        dialogOptions.resolve = {
            'managerGrid': ()=> {
                return this;
            },
            'actId': ()=> {
                return this.$stateParams['actId'];
            }
        };
        this.$mdDialog.show(dialogOptions);
    }

    edit(item, $event) {
        var dialogOptions:ng.material.IDialogOptions = {};

        dialogOptions.controller = editcon.Controller._name;
        dialogOptions.controllerAs = 'formCtl';
        dialogOptions.templateUrl = editcon.Controller._templateUrl;
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
            title: '删除操作',
            content: '确认吗?',
            $event: $event,
            isRefresh: true,
            ignoreSelection: true
        }, {action: this.Restangular.one('actioninterfaces', item.id).doDELETE.bind(this)});
    }
}
