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
import _ = require('lodash');
import {GridController} from "../../../../node_modules/nick_common_static/common/common/controller/resource/grid_material_controller";

export class Controller extends gridCon.GridController<any> {
    public static _name:string = 'ActorManagerGroupController';
    public static $inject:Array<any> = ['$rootScope', '$scope', '$mdToast', '$mdDialog', 'Restangular', '$http', '$q', '$state', '$stateParams', 'currentItem','managerGrid'];
    public static _templateUrl:string = 'js/partials/controllers/permission/actors/manager_group_form.html';

    public title:string = '权限组设置';
    public Restangular:any;
    private currentItem:any;
    private actorGroups:any = {};
    private managerGrid:GridController<any>;

    constructor() {
        super(arguments,false);
        this.init();
    }

    init() {
        this.actorGroups = _.indexBy(this.currentItem.actorgroups, 'groupId');
        this.clientData = new client.Common.ClientData<any>();
        this.queryData = new query.Common.QueryBase();
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
    }

    checked(item) {
        return this.actorGroups.hasOwnProperty(item['groupId']);
    }

    toggleAction(item) {
        if (this.actorGroups.hasOwnProperty(item['groupId'])) {
            delete this.actorGroups[item['groupId']];
        } else {
            this.actorGroups[item['groupId']] = item;
        }
    }

    save() {
        this.currentItem.actorgroups.length = 0;
        _.forEach(this.actorGroups, (group)=> {
            this.currentItem.actorgroups.push({
                aorId: this.currentItem['aorId'],
                groupId: group['groupId'],
                agId: 0
            });
        });
        this.Restangular.one('actorgroups').one('save', this.currentItem.aorId).doPOST(this.currentItem.actorgroups).then((data)=> {
            this.alert(this.title, '执行成功!');
            this.managerGrid && this.managerGrid.getServerData();
        });
    }
}
