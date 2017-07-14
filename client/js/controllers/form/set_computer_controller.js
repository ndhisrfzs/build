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
define(["require", "exports", "../../../node_modules/nick_common_static/common/common/controller/popup_material_controller"], function (require, exports, base) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller = (function (_super) {
        __extends(Controller, _super);
        function Controller() {
            var _this = _super.call(this, arguments) || this;
            _this.getServers();
            return _this;
        }
        Controller.prototype.getServers = function () {
            var _this = this;
            this.isBusy = true;
            this.Restangular.all('servers').getList().then(function (datas) {
                _this.servers = datas;
                angular.forEach(datas, function (data) {
                    data.isDefault && (_this.formData = data);
                });
            }).finally(function () {
                _this.isBusy = false;
            });
        };
        Controller.prototype.submit = function () {
            var _this = this;
            if (this.formData) {
                this.isBusy = true;
                this.Restangular.one('servers', this.formData['serID']).all('set_default').doPOST()
                    .then(function () {
                    _this.$rootScope['server'] = _this.formData;
                    _this.alert('设置服务器', '设置服务器成功!').then(function () {
                        _this.$state.go('home');
                    });
                })
                    .finally(function () {
                    _this.isBusy = false;
                });
            }
        };
        return Controller;
    }(base.PopupController));
    Controller.$inject = ['$rootScope', '$scope', 'Restangular', '$q', '$mdToast', '$cookieStore', '$mdDialog', '$state'];
    Controller._name = 'SetComputerController';
    exports.Controller = Controller;
});
//# sourceMappingURL=set_computer_controller.js.map