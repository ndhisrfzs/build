/**
 * Created by NICK on 15/6/5.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */

import ref = require('ref');
import base = require('../../../../node_modules/nick_common_static/common/common/controller/popup_material_controller');
import usermodel = require('../../../../node_modules/nick_common_static/common/models/passport/user_model');

export class Controller extends base.PopupController<any,any> {
    public static $inject:Array<string> = ['$rootScope', '$scope', '$q', '$http', '$mdDialog', '$mdToast', 'managerGrid', 'Restangular', 'menuId', 'PassportService'];
    public static _name = 'PersonManagerAddController';
    public static _templateUrl = 'js/partials/controllers/permission/persons/manager_add_form.html';

    private Restangular:any;
    private parent:any;
    private menuId:number;
    private PassportService:any;

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
        var getList = this.PassportService.nicknames.bind(this),
            getActors = this.Restangular.all('actors').getList.bind(this),
            self = this;

        this.schema = angular.extend(schema, {
            description: '添加用户',
            type: 'object'
        });
        this.formData = {
            personId: 0
        };

        this.form = [
            {
                type: 'autocomplete',
                title: '搜索用户',
                onItemChange: (ngModel:ng.INgModelController, item:Passport.UserModel) => {
                    if (item && item.nickname) {
                        self.formData['nickname'] = item.nickname;
                        self.formData['userToken'] = item.userToken;
                    }
                },
                querySearch: (nickname)=> {
                    var deferred = self.$q.defer();

                    getList(nickname).success((data)=> {
                        deferred.resolve(data.nicknames.map((item)=> {
                            var user = new usermodel.Passport.UserModel({
                                nickname: item.nickname,
                                avatarUrl: item.avatar_url,
                                userToken: item.user_token
                            });
                            user['label'] = user.nickname;

                            return user;
                        }));
                    });

                    return deferred.promise;
                }
            }, {
                key: 'nickname',
                type: 'text',
                readonly: true
            }, {
                type: 'autocomplete',
                title:'搜索角色',
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
            'result': this.Restangular.one('people').doPOST
        };
        this.content = this.schema.description + "成功!";
    }
}