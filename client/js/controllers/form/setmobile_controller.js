/**
 * Created by NICK on 15/7/3.
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
define(["require", "exports", "../../../node_modules/nick_common_static/common/common/controller/popup_material_controller", "../../../node_modules/nick_common_static/common/models/passport/bind_model", "../../../node_modules/nick_common_static/common/models/passport/user_model"], function (require, exports, base, bindModel, userModel) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller = (function (_super) {
        __extends(Controller, _super);
        function Controller() {
            var _this = _super.call(this, arguments) || this;
            _this.selectedIndex = 0;
            _this.steps = [
                { title: '发送验证码', templateUrl: '/setMobileFirst.html' },
                { title: '修改密码', templateUrl: '/setMobileSecond.html' }
            ];
            _this.initSchema();
            return _this;
        }
        Controller.prototype.initSchema = function () {
            this.formData = new bindModel.Passport.BindModel(new userModel.Passport.UserModel({
                userToken: this.$rootScope['user'].userToken
            }));
            this.schema = bindModel.Passport.BindModel._schema;
            this.formFirst = [
                {
                    key: 'mobile',
                    type: 'text',
                    title: '手机号码'
                },
                {
                    type: 'submit',
                    title: '发送验证码',
                    fieldHtmlClass: 'pull-right'
                }
            ];
            this.formSecond = [
                {
                    key: 'smsToken',
                    type: 'text',
                    title: '手机验证码'
                },
                {
                    type: 'submit',
                    title: '绑定手机',
                    fieldHtmlClass: 'pull-right'
                }
            ];
        };
        Controller.prototype.doSendCode = function ($form) {
            var _this = this;
            _this.resolve = {
                "sendMobileConfirmCode": _this.PassportService.sendMobileConfirmCode
            };
            _this.dialogCloseFn = function (datas) {
                _this.$cookieStore.put(Controller.cookieName, Date.now());
                _this.selectedIndex = 1;
            };
            _this.submit($form);
        };
        Controller.prototype.doBindPhone = function ($form) {
            var _this = this;
            _this.resolve = {
                "confirmMobile": _this.PassportService.confirmMobile
            };
            _this.dialogCloseFn = null;
            _this.content = '绑定手机成功';
            _this.submit($form);
        };
        return Controller;
    }(base.PopupController));
    Controller.$inject = ['$rootScope', '$scope', 'PassportService', '$q', '$mdToast', '$cookieStore', '$mdDialog', '$state'];
    Controller._name = 'SetMobileController';
    Controller.cookieName = 'forgetMobileCookie';
    exports.Controller = Controller;
});
//# sourceMappingURL=setmobile_controller.js.map