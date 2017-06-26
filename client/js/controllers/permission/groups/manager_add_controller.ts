/**
 * Created by NICK on 15/6/5.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */

import ref = require('ref');
import base = require('../../../../node_modules/nick_common_static/common/common/controller/popup_material_controller');

export class Controller extends base.PopupController<any,any> {
    public static $inject:Array<string> = ['$rootScope', '$scope', '$q', '$http', '$mdDialog', '$mdToast', 'managerGrid', 'Restangular'];
    public static _name = 'GroupManagerAddController';
    public static _templateUrl = 'js/partials/controllers/permission/groups/manager_add_form.html';

    private Restangular:any;

    constructor() {
        super(arguments);
        this.$http({
            method: 'GET',
            url: '/schema/group.json'
        }).success((data)=> {
            this.initSchema(data);
        });
    }

    /*
     * 初始化schema数据
     * */
    initSchema(schema:any) {
        this.schema = angular.extend(schema, {
            description: '创建权限组',
            type: 'object'
        });
        this.formData = {
            groupId: 0,
        };
        this.form = [
            {
                key: 'groupTitle',
                type: 'text'
            },{
                key: 'groupComment',
                type: 'textarea',
                rows: 1,
                cols: 0
            }];
        this.resolve = {
            'result': this.Restangular.one('groups').doPOST
        };
        this.content = this.schema.description + "成功!";
    }
}