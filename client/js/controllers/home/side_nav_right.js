/**
 * Created by NICK on 15/6/8.
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
define(["require", "exports", "../../../node_modules/nick_common_static/common/common/controller/base_material_controller"], function (require, exports, base) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller = (function (_super) {
        __extends(Controller, _super);
        function Controller() {
            return _super.call(this, arguments) || this;
        }
        Controller.prototype.doEditPsw = function ($event) {
            var dialogOptions = {};
            dialogOptions.controller = 'EditPswController';
            dialogOptions.controllerAs = 'formCtl';
            dialogOptions.templateUrl = 'js/partials/form/editpsw_form.html';
            dialogOptions.targetEvent = $event;
            dialogOptions.clickOutsideToClose = false;
            this.$mdDialog.show(dialogOptions);
        };
        Controller.prototype.doSetAliasName = function ($event) {
            var dialogOptions = {};
            dialogOptions.controller = 'SetAliasNameController';
            dialogOptions.controllerAs = 'formCtl';
            dialogOptions.templateUrl = 'js/partials/form/setaliasname_form.html';
            dialogOptions.targetEvent = $event;
            dialogOptions.clickOutsideToClose = false;
            this.$mdDialog.show(dialogOptions);
        };
        Controller.prototype.doSetEmail = function ($event) {
            var dialogOptions = {};
            dialogOptions.controller = 'SetMailController';
            dialogOptions.controllerAs = 'formCtl';
            dialogOptions.templateUrl = 'js/partials/form/setemail_form.html';
            dialogOptions.targetEvent = $event;
            dialogOptions.clickOutsideToClose = false;
            this.$mdDialog.show(dialogOptions);
        };
        Controller.prototype.doSetMobile = function ($event) {
            var dialogOptions = {};
            dialogOptions.controller = 'SetMobileController';
            dialogOptions.controllerAs = 'formCtl';
            dialogOptions.templateUrl = 'js/partials/form/setmobile_form.html';
            dialogOptions.targetEvent = $event;
            dialogOptions.clickOutsideToClose = false;
            this.$mdDialog.show(dialogOptions);
        };
        Controller.prototype.doSetComputer = function ($event) {
            var dialogOptions = {};
            dialogOptions.controller = 'SetComputerController';
            dialogOptions.controllerAs = 'formCtl';
            dialogOptions.templateUrl = 'js/partials/form/set_computer_form.html';
            dialogOptions.targetEvent = $event;
            dialogOptions.clickOutsideToClose = false;
            this.$mdDialog.show(dialogOptions);
        };
        Controller.prototype.doExitSystem = function ($event) {
            var _this = this, confirm = _this.$mdDialog.confirm()
                .title('退出登录')
                .content('确定要退出登录吗？')
                .ariaLabel('退出登录')
                .ok('确定退出')
                .cancel('取消')
                .targetEvent($event);
            _this.$mdDialog.show(confirm).then(function () {
                _this.PassportService.logout();
            }, function () {
            });
        };
        return Controller;
    }(base.BaseController));
    Controller.$inject = ['$rootScope', '$scope', '$mdDialog', 'PassportService'];
    Controller._name = 'HomeSideNavRightController';
    exports.Controller = Controller;
});
//# sourceMappingURL=side_nav_right.js.map