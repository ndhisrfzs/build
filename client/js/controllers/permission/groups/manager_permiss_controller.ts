/**
 * Created by NICK on 15/6/5.
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
import {GridController} from "../../../../node_modules/nick_common_static/common/common/controller/resource/grid_material_controller";

export class Controller extends gridCon.GridController<any> {
    public static $inject:Array<string> = ['$rootScope', '$scope', '$q', '$http', '$mdDialog', '$mdToast', 'managerGrid', 'Restangular', 'currentItem'];
    public static _name = 'GroupManagerPermissController';
    public static _templateUrl = 'js/partials/controllers/permission/groups/manager_permiss_form.html';

    public title:string = '权限组权限设置';
    private Restangular:any;
    private currentItem:any;
    private groupActions:any = {};
    private managerGrid:GridController<any>;

    constructor() {
        super(arguments, false);
        this.init();
    }

    checked(item) {
        //return this.currentItem.groupactions && this.currentItem.groupactions
        return this.groupActions.hasOwnProperty(item['actId']);
    }

    toggleAction(item) {
        if (this.groupActions.hasOwnProperty(item['actId'])) {
            delete this.groupActions[item['actId']];
        } else {
            this.groupActions[item['actId']] = item;
        }
    }

    update() {
        this.currentItem.groupactions = [];
        _.forEach(this.groupActions, (act)=> {
            this.currentItem.groupactions.push({
                actId: act['actId'],
                groupId: this.currentItem['groupId'],
                gaId: 0
            });
        });
        this.Restangular.one('groupactions').one('save', this.currentItem.groupId).doPOST(this.currentItem.groupactions).then((data)=> {
            this.alert(this.title, '执行成功!');
            this.managerGrid && this.managerGrid.getServerData();
        });
    }

    init() {
        this.title = this.currentItem['groupTitle'] + '-' + this.title;
        this.groupActions = _.indexBy(this.currentItem.groupactions, 'actId');
        this.clientData = new client.Common.ClientData<any>();
        this.queryData = new query.Common.QueryBase();
        this.queryData.include = ['actions'];
        this.queryData.order = 'lft';
        delete this.queryData.limit;
        delete this.queryData.offset;
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
    }
}