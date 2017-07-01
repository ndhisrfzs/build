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
define(["require", "exports", "../../../node_modules/nick_common_static/common/common/controller/popup_material_controller", "../../../node_modules/nick_common_static/common/models/passport/user_model"], function (require, exports, base, userModel) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller = (function (_super) {
        __extends(Controller, _super);
        function Controller() {
            var _this = _super.call(this, arguments) || this;
            _this.initSchema();
            return _this;
        }
        Controller.prototype.initSchema = function () {
            this.schema = userModel.Passport.UserModel._schema;
            this.schema.description = "设置昵称";
            this.form = [
                {
                    key: 'nickname',
                    type: 'text',
                    title: '新昵称'
                },
                {
                    key: 'password',
                    type: 'password',
                    title: '密码'
                }
            ];
            this.resolve = {
                "setAliasName": this.PassportService.setAliasName
            };
            this.content = this.schema.description + '成功!';
            this.formData = new userModel.Passport.UserModel();
        };
        return Controller;
    }(base.PopupController));
    Controller.$inject = ['$rootScope', '$scope', 'PassportService', '$q', '$mdToast', '$cookieStore', '$mdDialog', '$state'];
    Controller._name = 'SetAliasNameController';
    exports.Controller = Controller;
});
//# sourceMappingURL=setaliasname_controller.js.map