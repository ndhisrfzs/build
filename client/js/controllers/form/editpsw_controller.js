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
define(["require", "exports", "../../../node_modules/nick_common_static/common/common/controller/popup_material_controller", "../../../node_modules/nick_common_static/common/models/passport/edit_password_model"], function (require, exports, base, editpswModel) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller = (function (_super) {
        __extends(Controller, _super);
        function Controller() {
            var _this = this;
            var _this = _this;
            _this = _super.call(this, arguments) || this;
            _this.initSchema();
            _this.resolve = {
                "editpsw": _this.PassportService.editPsw
            };
            _this.dialogCloseFn = function (datas) {
                //登录成功提示
                _this.showMsg('修改密码成功');
                //成功后跳转
                _this.$rootScope.$emit("userIntercepted", "editpsw");
            };
            return _this;
        }
        Controller.prototype.initSchema = function () {
            this.schema = editpswModel.Passport.EditPasswordModel._schema;
            this.form = [
                {
                    key: 'oldPassword',
                    type: 'password'
                }, {
                    key: 'password',
                    type: 'password'
                }, {
                    key: 'passwordAgain',
                    type: 'password'
                }
            ];
            this.formData = new editpswModel.Passport.EditPasswordModel();
        };
        return Controller;
    }(base.PopupController));
    Controller.$inject = ['$rootScope', '$scope', 'PassportService', '$q', '$mdToast', '$cookieStore', '$mdDialog', '$state'];
    Controller._name = 'EditPswController';
    exports.Controller = Controller;
});
//# sourceMappingURL=editpsw_controller.js.map