/**
 * Created by NICK on 15/6/5.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "../../../../node_modules/nick_common_static/common/common/controller/popup_material_controller", "../../../../node_modules/nick_common_static/common/models/passport/user_model"], function (require, exports, base, usermodel) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller = (function (_super) {
        __extends(Controller, _super);
        function Controller() {
            var _this = _super.call(this, arguments) || this;
            _this.$http({
                method: 'GET',
                url: '/schema/person.json'
            }).success(function (data) {
                _this.initSchema(data);
            });
            return _this;
        }
        /*
         * 初始化schema数据
         * */
        Controller.prototype.initSchema = function (schema) {
            var getList = this.PassportService.nicknames.bind(this), getActors = this.Restangular.all('actors').getList.bind(this), self = this;
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
                    onItemChange: function (ngModel, item) {
                        if (item && item.nickname) {
                            self.formData['nickname'] = item.nickname;
                            self.formData['userToken'] = item.userToken;
                        }
                    },
                    querySearch: function (nickname) {
                        var deferred = self.$q.defer();
                        getList(nickname).success(function (data) {
                            deferred.resolve(data.nicknames.map(function (item) {
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
                    title: '搜索角色',
                    onItemChange: function (ngModel, item) {
                        if (item) {
                            self.formData['aorId'] = item.aorId;
                        }
                    },
                    querySearch: function (queryStr) {
                        var deferred = self.$q.defer();
                        getActors({
                            filters: {
                                where: {
                                    aorTitle: { 'like': queryStr }
                                }
                            }
                        }).then(function (data) {
                            deferred.resolve(data.map(function (item) {
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
                }
            ];
            this.resolve = {
                'result': this.Restangular.one('people').doPOST
            };
            this.content = this.schema.description + "成功!";
        };
        return Controller;
    }(base.PopupController));
    Controller.$inject = ['$rootScope', '$scope', '$q', '$http', '$mdDialog', '$mdToast', 'managerGrid', 'Restangular', 'menuId', 'PassportService'];
    Controller._name = 'PersonManagerAddController';
    Controller._templateUrl = 'js/partials/controllers/permission/persons/manager_add_form.html';
    exports.Controller = Controller;
});
//# sourceMappingURL=manager_add_controller.js.map