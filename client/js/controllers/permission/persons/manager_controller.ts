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

import addcon = require('controllers/permission/persons/manager_add_controller');
import editcon = require('controllers/permission/persons/manager_edit_controller');

export class Controller extends gridCon.GridController<any> {
    public static _name:string = 'PersonManagerController';
    public static $inject:Array<any> = ['$rootScope', '$scope', '$mdToast', '$mdDialog', 'Restangular', '$http', '$q', '$state', '$stateParams'];

    public title:string = '用户列表';
    public Restangular:any;

    constructor() {
        super(arguments);
        this.init();
    }

    initToolbar() {
        var self = this;

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
        self.rootToolbars.push(new toolbar.Common.ToolbarItem({
            title: '搜索',
            icon: 'search',
            onClick: ($event)=> {
                self.toggleSearchBar();
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

    initSearch() {
        this.$http({
            method: 'GET',
            url: '/schema/person.json'
        }).success((data)=> {
            this.schema = data;
            this.searchForm = [
                {
                    key: 'nickname',
                    required: false,
                    copyValueTo: ["r-nickname.like"],
                    type: 'text'
                }
            ];
        });
    }


    init() {
        this.clientData = new client.Common.ClientData<any>();
        this.queryData = new query.Common.QueryBase();
        this.queryData.include = ['actor'];
        this.serverInterfaces = {
            query: this.Restangular.all('people').getList.bind(this, {filter: this.queryData}),
            count: this.Restangular.one('people', 'count').get.bind(this, {where: this.queryData.where})
        };

        this.dataFilter = (serverData:any)=> {
            this.clientData.datas.length = 0;
            this.clientData.datas = serverData['query'] || [];
            this.clientData.total = serverData['count'].count || 0;
            //console.log(this.serverInterfaces);
            return this.clientData;
        };
        this.getServerData();
        this.initToolbar();
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
            'menuId': ()=> {
                return this.$stateParams['menuId'];
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
        }, {action: this.Restangular.one('people', item.personId).doDELETE.bind(this)});
    }
}
