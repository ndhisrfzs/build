/**
 * Created by NICK on 15/6/5.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */

import ref = require('ref');
import base = require('../../../../node_modules/nick_common_static/common/common/controller/popup_material_controller');

export class Controller extends base.PopupController<any,any> {
    public static $inject:Array<string> = ['$rootScope', '$scope', '$q', '$http', '$mdDialog', '$mdToast', 'managerGrid', 'Restangular', 'menuId'];
    public static _name = 'ActionManagerAddController';
    public static _templateUrl = 'js/partials/controllers/permission/menus/manager_add_form.html';

    private Restangular:any;
    private parent:any;
    private menuId:number;

    constructor() {
        super(arguments);
        this.$http({
            method: 'GET',
            url: '/schema/action.json'
        }).success((data)=> {
            this.initSchema(data);
        });
    }

    /*
     * 初始化schema数据
     * */
    initSchema(schema:any) {
        var getList = this.Restangular.all('genres').getList.bind(this);

        this.schema = angular.extend(schema, {
            description: '创建操作',
            type: 'object'
        });
        this.formData = {
            actId: 0,
            menuId: this.menuId
        };

        this.$stateParams

        this.form = [
            {
                key: 'actTitle',
                type: 'text'
            }, {
                key: 'actKey',
                type: 'text'
            }, {
                key: 'actIcon',
                type: 'text'
            }, {
                key: 'actType',
                type: 'select',
                onOpen: (form)=> {
                    getList({
                        filter: {
                            where: {'genreType': 1}
                        }
                    }).then((data)=> {
                        angular.forEach(data, (d)=> {
                            d.name = d['genreTitle'];
                            d.value = ~~d['genreVal'];
                        });
                        form['titleMap'] = data;
                    });
                }
            }, {
                key: 'optType',
                type: 'select',
                onOpen: (form)=> {
                    getList({
                        filter: {
                            where: {'genreType': 2}
                        }
                    }).then((data)=> {
                        angular.forEach(data, (d)=> {
                            d.name = d['genreTitle'];
                            d.value = ~~d['genreVal'];
                        });
                        form['titleMap'] = data;
                    });
                }
            }, {
                key: 'schemaId',
                type: 'number'
            }, {
                key: 'schemaFormId',
                type: 'number'
            }, {
                key: 'schemaDataId',
                type: 'number'
            }];
        this.resolve = {
            'result': this.Restangular.one('actions').doPOST
        };
        this.content = this.schema.description + "成功!";
    }
}