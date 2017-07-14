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
    public static _name = 'SchemaManagerAddController';
    public static  _templateUrl = 'js/partials/controllers/common/manager_form.html';

    private Restangular:any;
    public title:string = "创建Schema";

    constructor() {
        super(arguments);
        this.$http({
            method: 'GET',
            url: '/schema/schema.json'
        }).success((data)=> {
            this.initSchema(data);
        });
    }

    /*
     * 初始化schema数据
     * */
    initSchema(schema:any) {
        this.schema = angular.extend(schema, {
            description: '创建Schema'
        });
        this.formData = {
        };
        this.form = [
            {
                key: 'key',
                type: 'text'
            }, {
                key: 'schema',
                type: 'jsoneditor',
                jsonOptions: {
                    modes: ['tree', 'code']
                }
            }];
        this.resolve = {
            'result': this.Restangular.one('schemas').doPOST
        };
        this.content = this.schema.description + "成功!";
    }
}