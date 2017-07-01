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
                url: '/schema/menu.json'
            }).success(function (data) {
                _this.initSchema(data);
            });
            return _this;
        }
        /*
         * 初始化schema数据
         * */
        Controller.prototype.initSchema = function (schema) {
            this.schema = angular.extend(schema, {
                description: '修改菜单',
                type: 'object'
            });
            this.formData = angular.extend({ columns: [] }, this.currentItem);
            if (!this.formData.columns) {
                this.formData.columns = [];
            }
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
                }
            ];
            this.resolve = {
                'result': this.Restangular.one('menus').doPUT
            };
            this.content = this.schema.description + "成功!";
        };
        return Controller;
    }(base.PopupController));
    Controller.$inject = ['$rootScope', '$scope', '$q', '$http', '$mdDialog', '$mdToast', 'managerGrid', 'Restangular', 'currentItem'];
    Controller._name = 'MenuManagerEditController';
    Controller._templateUrl = 'js/partials/controllers/permission/menus/manager_add_form.html';
    exports.Controller = Controller;
});
//# sourceMappingURL=manager_edit_controller.js.map