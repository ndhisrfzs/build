/**
 * Created by NICK on 15/6/5.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */

import ref = require('ref');
import base = require('../../../../node_modules/nick_common_static/common/common/controller/popup_material_controller');

export class Controller extends base.PopupController<any,any> {
    public static $inject:Array<string> = ['$rootScope', '$scope', '$q', '$http', '$mdDialog', '$mdToast', 'managerGrid', 'Restangular', 'httpType'];
    public static _name = 'InterfaceManagerAddController';
    public static  _templateUrl = 'js/partials/controllers/permission/interfaces/manager_add_form.html';

    private Restangular:any;
    private httpType:Array<any>;

    constructor() {
        super(arguments);
        this.$http({
            method: 'GET',
            url: '/schema/interface.json'
        }).success((data)=> {
            this.initSchema(data);
        });
    }

    /*
     * 初始化schema数据
     * */
    initSchema(schema:any) {
        this.schema = angular.extend(schema, {
            description: '创建接口信息'
        });
        this.formData = {
            interfaceId: 0
        };
        this.form = [
            {
                key: 'baseUrl',
                type: 'text'
            }, {
                key: 'interface',
                type: 'text'
            }, {
                key: 'type',
                type: 'select',
                titleMap: this.httpType
            }, {
                key: 'title',
                type: 'text'
            }, {
                key: 'params',
                type: 'text'
            }, {
                key: 'isLocal',
                type: 'checkbox'
            }];
        this.resolve = {
            'result': this.Restangular.one('interfaces').doPOST
        };
        this.content = this.schema.description + "成功!";
    }
}