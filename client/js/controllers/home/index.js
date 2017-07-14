/**
 * Created by NICK on 15/10/30.
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
            var _this = _super.call(this, arguments) || this;
            _this.$rootScope['title'] = "牛通天代理管理系统";
            _this.$rootScope['systitle'] = "系统功能";
            return _this;
        }
        Controller.prototype.doSetComputer = function ($event) {
            var dialogOptions = {};
            dialogOptions.controller = 'SetComputerController';
            dialogOptions.controllerAs = 'formCtl';
            dialogOptions.templateUrl = 'js/partials/form/set_computer_form.html';
            dialogOptions.targetEvent = $event;
            dialogOptions.clickOutsideToClose = false;
            this.$mdDialog.show(dialogOptions);
        };
        return Controller;
    }(base.BaseController));
    Controller._name = 'HomeIndexController';
    Controller.$inject = ['$rootScope', '$scope', '$state', '$stateParams', '$mdBottomSheet', '$mdToast', '$mdDialog'];
    exports.Controller = Controller;
});
//# sourceMappingURL=index.js.map