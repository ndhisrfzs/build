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
define(["require", "exports", "../../../../node_modules/nick_common_static/common/common/controller/popup_material_controller"], function (require, exports, base) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller = (function (_super) {
        __extends(Controller, _super);
        function Controller() {
            var _this = _super.call(this, arguments) || this;
            _this.$http({
                method: 'GET',
                url: '/schema/actioninterface.json'
            }).success(function (data) {
                _this.initSchema(data);
            });
            return _this;
        }
        /*
         * 初始化schema数据
         * */
        Controller.prototype.initSchema = function (schema) {
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
                    onItemChange: function (ngModel, item) {
                        if (item) {
                            self.formData['interfaceId'] = item.interfaceId;
                        }
                    },
                    querySearch: function (queryStr) {
                        var deferred = self.$q.defer();
                        getInterfaces({
                            filters: {
                                where: {
                                    title: { 'like': queryStr }
                                }
                            }
                        }).then(function (data) {
                            deferred.resolve(data.map(function (item) {
                                item['label'] = item.title;
                                return item;
                            }));
                        });
                        return deferred.promise;
                    }
                }, {
                    key: 'key',
                    type: 'text'
                }
            ];
            this.resolve = {
                'result': this.Restangular.one('actioninterfaces').doPOST
            };
            this.content = this.schema.description + "成功!";
        };
        return Controller;
    }(base.PopupController));
    Controller.$inject = ['$rootScope', '$scope', '$q', '$http', '$mdDialog', '$mdToast', 'managerGrid', 'Restangular', 'actId'];
    Controller._name = 'ActionInterfaceManagerAddController';
    Controller._templateUrl = 'js/partials/controllers/common/manager_form.html';
    exports.Controller = Controller;
});
//# sourceMappingURL=manager_add_controller.js.map