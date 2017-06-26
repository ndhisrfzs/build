/**
 * Created by NICK on 15/6/5.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */

import ref = require('ref');
import base = require('../../../../node_modules/nick_common_static/common/common/controller/popup_material_controller');

export class Controller extends base.PopupController<any,any> {
    public static $inject:Array<string> = ['$rootScope', '$scope', '$q', '$http', '$mdDialog', '$mdToast', 'managerGrid', 'Restangular', 'actId'];
    public static _name = 'ActionInterfaceManagerAddController';
    public static _templateUrl = 'js/partials/controllers/common/manager_form.html';

    private Restangular:any;
    private actId:number;

    constructor() {
        super(arguments);
        this.$http({
            method: 'GET',
            url: '/schema/actioninterface.json'
        }).success((data)=> {
            this.initSchema(data);
        });
    }

    /*
     * 初始化schema数据
     * */
    initSchema(schema:any) {
        var self = this;
        var getInterfaces = this.Restangular.all('interfaces').getList.bind(this);

        this.schema = angular.extend(schema, {
            description: '创建操作',
            type: 'object'
        });
        this.formData = {
            id: 0,
            actId: this.actId
        };

        this.form = [
            {
                key: 'interfaceId',
                readonly: true,
                type: 'number'
            }, {
                type: 'autocomplete',
                title: '搜索接口',
                onItemChange: (ngModel:ng.INgModelController, item:any) => {
                    if (item) {
                        self.formData['interfaceId'] = item.interfaceId;
                    }
                },
                querySearch: (queryStr)=> {
                    var deferred = self.$q.defer();

                    getInterfaces({
                        filters: {
                            where: {
                                title: {'like': queryStr}
                            }
                        }
                    }).then((data)=> {
                        deferred.resolve(data.map((item)=> {
                            item['label'] = item.title;
                            return item;
                        }));
                    });

                    return deferred.promise;
                }
            }, {
                key: 'key',
                type: 'text'
            }];
        this.resolve = {
            'result': this.Restangular.one('actioninterfaces').doPOST
        };
        this.content = this.schema.description + "成功!";
    }
}