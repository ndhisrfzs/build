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
    public static _name = 'GenreManagerAddController';
public static  _templateUrl='js/partials/controllers/permission/genres/manager_add_form.html';

    private Restangular:any;

    constructor() {
        super(arguments);
        this.$http({
            method: 'GET',
            url: '/schema/genre.json'
        }).success((data)=> {
            this.initSchema(data);
        });
    }

    /*
     * 初始化schema数据
     * */
    initSchema(schema:any) {
        this.schema = angular.extend(schema, {
            description: '创建键值'
        });
        this.formData = {
            genreId: 0,
        };
        this.form = [
            {
                key: 'genreTitle',
                type: 'text'
            },
            {
                key: 'genreVal',
                type: 'text'
            }, {
                key: 'genreType',
                type: 'number'
            }];
        this.resolve = {
            'result': this.Restangular.one('genres').doPOST
        };
        this.content = this.schema.description + "成功!";
    }
}