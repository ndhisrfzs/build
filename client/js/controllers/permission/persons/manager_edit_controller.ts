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
    public static _name = 'PersonManagerEditController';
    public static _templateUrl = 'js/partials/controllers/permission/persons/manager_add_form.html';

    private Restangular:any;
    private parent:any;

    constructor() {
        super(arguments);
        this.$http({
            method: 'GET',
            url: '/schema/person.json'
        }).success((data)=> {
            this.initSchema(data);
        });
    }

    /*
     * 初始化schema数据
     * */
    initSchema(schema:any) {
        var getActors = this.Restangular.all('actors').getList.bind(this),
            self = this;

        this.schema = angular.extend(schema, {
            description: '修改用户',
            type: 'object'
        });
        this.formData = angular.extend({}, this.currentItem);
        this.form = [
            {
                key: 'nickname',
                type: 'text',
                readonly: true
            }, {
                type: 'autocomplete',
                title: '搜索角色',
                onItemChange: (ngModel:ng.INgModelController, item:any) => {
                    if (item) {
                        self.formData['aorId'] = item.aorId;
                    }
                },
                querySearch: (queryStr)=> {
                    var deferred = self.$q.defer();

                    getActors({
                        filters: {
                            where: {
                                aorTitle: {'like': queryStr}
                            }
                        }
                    }).then((data)=> {
                        deferred.resolve(data.map((item)=> {
                            item['label'] = item.aorTitle;

                            return item;
                        }));
                    });

                    return deferred.promise;
                }
            }, {
                key: 'aorId',
                type: 'number',
                readonly: true
            }];
        this.resolve = {
            'result': this.Restangular.one('people').doPUT
        };
        this.content = this.schema.description + "成功!";
    }
}