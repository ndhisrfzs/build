/**
 * Created by NICK on 15/6/5.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */

import ref = require('ref');
import base = require('../../../../node_modules/nick_common_static/common/common/controller/popup_material_controller');

export class Controller extends base.PopupController<any,any> {
    public static $inject:Array<string> = ['$rootScope', '$scope', '$q', '$http', '$mdDialog', '$mdToast', 'managerGrid', 'Restangular', 'currentItem'];
    public static _name = 'ActorManagerEditController';
    public static _templateUrl = 'js/partials/controllers/permission/actors/manager_add_form.html';

    private Restangular:any;
    private parent:any;

    constructor() {
        super(arguments);
        this.$http({
            method: 'GET',
            url: '/schema/actor.json'
        }).success((data)=> {
            this.initSchema(data);
        });
    }

    /*
     * 初始化schema数据
     * */
    initSchema(schema:any) {
        this.schema = angular.extend(schema, {
            description: '修改角色',
            type: 'object'
        });
        this.formData = angular.extend({}, this.currentItem);
        this.form = [
            {
                key: 'aorTitle',
                type: 'text'
            }, {
                key: 'aorComment',
                type: 'text'
            }];
        this.resolve = {
            'result': this.Restangular.one('actors').doPUT
        };
        this.content = this.schema.description + "成功!";
    }
}