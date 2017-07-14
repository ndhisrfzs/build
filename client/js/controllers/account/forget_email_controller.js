/**
 * Created by NICK on 15/6/25.
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
define(["require", "exports", "../../../node_modules/nick_common_static/common/common/controller/popup_material_controller", "../../../node_modules/nick_common_static/common/models/passport/forget_model"], function (require, exports, base, forgetModel) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller = (function (_super) {
        __extends(Controller, _super);
        function Controller() {
            var _this = _super.call(this, arguments) || this;
            _this.selectedIndex = 0;
            _this.steps = [
                { title: '发送验证码', templateUrl: '/forgetMailFirst.html' },
                { title: '修改密码', templateUrl: '/forgetMailSecond.html' }
            ];
            _this.$rootScope['mainClass'] = 'layout-column';
            _this.initSchema();
            return _this;
        }
        Controller.prototype.initSchema = function () {
            this.schema = forgetModel.Passport.ForgetModel._schema;
            this.formFirst = [
                {
                    key: 'username',
                    type: 'text',
                    htmlClass: 'md-icon-float md-has-icon',
                    icon: {
                        icon: 'person'
                    }
                }, {
                    type: 'submit',
                    title: '发送验证码',
                    cookie: Controller.cookieName,
                    timeSpan: 60
                }
            ];
            this.formSecond = [
                {
                    key: 'password',
                    type: 'password',
                    htmlClass: 'md-icon-float md-has-icon',
                    title: '密码',
                    icon: {
                        icon: 'lock_outline'
                    }
                },
                {
                    key: 'passwordAgain',
                    type: 'password',
                    htmlClass: 'md-icon-float md-has-icon',
                    title: '重复密码',
                    icon: {
                        icon: 'lock_outline'
                    }
                },
                {
                    key: 'smsToken',
                    type: 'text',
                    htmlClass: 'md-icon-float md-has-icon',
                    title: '邮箱验证码',
                    icon: {
                        icon: 'email'
                    }
                },
                {
                    type: 'submit',
                    title: '重置密码'
                }
            ];
            this.formData = new forgetModel.Passport.ForgetModel();
        };
        Controller.prototype.doSendCode = function ($form) {
            var _this = this;
            _this.resolve = {
                "sendResetPswMailCode": _this.PassportService.sendResetPswMailCode
            };
            _this.dialogCloseFn = function (datas) {
                _this.$cookieStore.put(Controller.cookieName, Date.now());
                _this.formData.userToken = datas['sendResetPswMailCode'].data.user_token;
                _this.selectedIndex = 1;
            };
            _this.submit($form);
        };
        Controller.prototype.doEditPassword = function ($form) {
            var _this = this;
            _this.resolve = {
                "resetMailPassword": _this.PassportService.resetMailPassword
            };
            _this.dialogCloseFn = function (datas) {
                _this.showMsg('重置密码成功');
                _this.$rootScope.$emit("userIntercepted", "findPassword");
            };
            _this.submit($form);
        };
        return Controller;
    }(base.PopupController));
    Controller.$inject = ['$rootScope', '$scope', 'PassportService', '$q', '$mdToast', '$cookieStore', '$mdDialog', '$state'];
    Controller._name = 'ForgetEmailController';
    Controller.cookieName = 'forgetMailCookie';
    exports.Controller = Controller;
});
//# sourceMappingURL=forget_email_controller.js.map