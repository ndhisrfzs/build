/**
 * Created by NICK on 15/6/8.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */

import ref = require('ref');
import base = require('../../../node_modules/nick_common_static/common/common/controller/base_material_controller');

export class Controller extends base.BaseController {
    public static $inject:Array<string> = ['$rootScope', '$scope', '$mdDialog', 'PassportService'];
    public static _name = 'HomeSideNavRightController';

    private PassportService:any;

    constructor() {
        super(arguments);
    }

    doEditPsw($event:MouseEvent) {
        var dialogOptions:angular.material.IDialogOptions = {};

        dialogOptions.controller = 'EditPswController';
        dialogOptions.controllerAs = 'formCtl';
        dialogOptions.templateUrl = 'js/partials/form/editpsw_form.html';
        dialogOptions.targetEvent = $event;
        dialogOptions.clickOutsideToClose = false;

        this.$mdDialog.show(dialogOptions);
    }

    doSetAliasName($event:MouseEvent) {
        var dialogOptions:angular.material.IDialogOptions = {};

        dialogOptions.controller = 'SetAliasNameController';
        dialogOptions.controllerAs = 'formCtl';
        dialogOptions.templateUrl = 'js/partials/form/setaliasname_form.html';
        dialogOptions.targetEvent = $event;
        dialogOptions.clickOutsideToClose = false;

        this.$mdDialog.show(dialogOptions);
    }

    doSetEmail($event:MouseEvent) {
        var dialogOptions:angular.material.IDialogOptions = {};

        dialogOptions.controller = 'SetMailController';
        dialogOptions.controllerAs = 'formCtl';
        dialogOptions.templateUrl = 'js/partials/form/setemail_form.html';
        dialogOptions.targetEvent = $event;
        dialogOptions.clickOutsideToClose = false;

        this.$mdDialog.show(dialogOptions);
    }

    doSetMobile($event:MouseEvent) {
        var dialogOptions:angular.material.IDialogOptions = {};

        dialogOptions.controller = 'SetMobileController';
        dialogOptions.controllerAs = 'formCtl';
        dialogOptions.templateUrl = 'js/partials/form/setmobile_form.html';
        dialogOptions.targetEvent = $event;
        dialogOptions.clickOutsideToClose = false;

        this.$mdDialog.show(dialogOptions);
    }

    doSetComputer($event:MouseEvent){
        var dialogOptions:angular.material.IDialogOptions = {};

        dialogOptions.controller = 'SetComputerController';
        dialogOptions.controllerAs = 'formCtl';
        dialogOptions.templateUrl = 'js/partials/form/set_computer_form.html';
        dialogOptions.targetEvent = $event;
        dialogOptions.clickOutsideToClose = false;

        this.$mdDialog.show(dialogOptions);
    }

    doExitSystem($event:MouseEvent) {
        var _this = this,
            confirm = _this.$mdDialog.confirm()
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
    }
}