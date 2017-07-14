/**
 * Created by NICK on 15/6/24.
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
define(["require", "exports", "../../../node_modules/nick_common_static/common/common/controller/popup_material_controller", "../../../node_modules/nick_common_static/common/models/passport/register_model"], function (require, exports, base, regModel) {
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
                "register": _this.PassportService.register
            };
            _this.dialogCloseFn = function (datas) {
                _this.showMsg('注册成功');
                _this.$rootScope.$emit("userIntercepted", "register");
            };
            return _this;
        }
        Controller.prototype.initSchema = function () {
            this.schema = regModel.Passport.RegisterModel._schema;
            this.form = [
                {
                    key: 'username',
                    type: 'text',
                    title: '用户名',
                    icon: {
                        icon: 'person'
                    },
                    htmlClass: 'md-icon-float md-has-icon',
                },
                {
                    key: 'password',
                    type: 'password',
                    title: '密码',
                    icon: {
                        icon: 'lock_outline'
                    },
                    htmlClass: 'md-icon-float md-has-icon',
                },
                {
                    key: 'passwordAgain',
                    type: 'password',
                    title: '重复密码',
                    icon: {
                        icon: 'lock_outline'
                    },
                    htmlClass: 'md-icon-float md-has-icon',
                },
                {
                    type: 'submit',
                    title: '注册',
                    fieldHtmlClass: 'layout-fill'
                }
            ];
            this.formData = new regModel.Passport.RegisterModel();
        };
        return Controller;
    }(base.PopupController));
    Controller.$inject = ['$rootScope', '$scope', 'PassportService', '$q', '$mdToast', '$cookieStore', '$mdDialog', '$state'];
    Controller._name = 'RegisterController';
    exports.Controller = Controller;
});
//# sourceMappingURL=register_controller.js.map