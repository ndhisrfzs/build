/**
 * Created by NICK on 15/6/17.
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
define(["require", "exports", "../../../node_modules/nick_common_static/common/common/controller/popup_material_controller", "../../../node_modules/nick_common_static/common/models/passport/login_model"], function (require, exports, base, loginModel) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller = (function (_super) {
        __extends(Controller, _super);
        function Controller() {
            var _this = this;
            var _this = _this;
            _this = _super.call(this, arguments) || this;
            _this.$rootScope['mainClass'] = 'layout-column';
            _this.initSchema();
            _this.resolve = {
                "loginCheck": _this.PassportService.loginCheck
            };
            _this.dialogCloseFn = function (datas) {
                //设置cookie
                _this.$cookieStore.put(_this.config.prefix + 'access_token', datas['loginCheck'].data.token);
                _this.$cookieStore.put(_this.config.prefix + 'refresh_token', datas['loginCheck'].data.token);
                _this.$cookieStore.put(_this.config.prefix + 'user_token', datas['loginCheck'].data.user_token);
                //登录成功提示
                _this.showMsg('登录成功');
                //成功后跳转
                _this.$state.go('home');
            };
            return _this;
        }
        Controller.prototype.initSchema = function () {
            this.schema = loginModel.Passport.LoginModel._schema;
            this.form = [
                {
                    key: 'username',
                    type: 'string',
                    icon: {
                        icon: 'person',
                    },
                    htmlClass: 'md-icon-float md-has-icon',
                    disableSuccessState: true
                }, {
                    key: 'password',
                    type: 'password',
                    icon: {
                        icon: 'lock_outline'
                    },
                    htmlClass: 'md-icon-float md-has-icon',
                    disableSuccessState: true
                }, {
                    key: 'expireIn',
                }, {
                    type: 'submit',
                    title: '登录',
                    readonly: false,
                    fieldHtmlClass: 'layout-fill',
                    icon: ''
                }
            ];
            this.formData = new loginModel.Passport.LoginModel();
        };
        return Controller;
    }(base.PopupController));
    Controller.$inject = ['$rootScope', '$scope', 'config', 'PassportService', '$q', '$mdToast', '$cookieStore', '$mdDialog', '$state'];
    Controller._name = 'LoginController';
    exports.Controller = Controller;
});
//# sourceMappingURL=login_controller.js.map