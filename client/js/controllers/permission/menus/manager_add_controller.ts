/**
 * Created by NICK on 15/6/5.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */

import ref = require('ref');
import base = require('../../../../node_modules/nick_common_static/common/common/controller/popup_material_controller');

export class Controller extends base.PopupController<any,any> {
    public static $inject:Array<string> = ['$rootScope', '$scope', '$q', '$http', '$mdDialog', '$mdToast', 'managerGrid', 'Restangular', 'parent'];
    public static _name = 'MenuManagerAddController';
    public static _templateUrl = 'js/partials/controllers/permission/menus/manager_add_form.html';

    private Restangular:any;
    private parent:any;

    constructor() {
        super(arguments);
        this.$http({
            method: 'GET',
            url: '/schema/menu.json'
        }).success((data)=> {
            this.initSchema(data);
        });
    }

    /*
     * 初始化schema数据
     * */
    initSchema(schema:any) {
        this.schema = angular.extend(schema, {
            description: '创建菜单',
            type: 'object'
        });
        this.formData = {
            menuId: 0,
            menuType: 0,
            menuParentId: this.parent ? this.parent.menuId : 0
        };
        this.form = [
            {
                key: 'menuTitle',
                type: 'text'
            }, {
                key: 'menuIcon',
                type: 'text'
            }, {
                key: 'menuLink',
                type: 'text',
            }, {
                key: 'menuParentId',
                readonly: true,
                type: 'number'
            }, {
                key: 'menuKey',
                maxLength: 10,
                type: 'string'
            }, {
                key: 'columns',
                type: 'array',
                startEmpty: true
            }, {
                key: 'menuShow',
                type: 'checkbox'
            }];
        this.resolve = {
            'result': this.Restangular.one('menus', 'add').doPOST
        };
        this.content = this.schema.description + "成功!";
    }
}