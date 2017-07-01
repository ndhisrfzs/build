/**
 * Created by NICK on 15/10/30.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */

import ref = require('ref');
import base = require('../../../node_modules/nick_common_static/common/common/controller/base_material_controller');

export class Controller extends base.BaseController {
    public static _name:string = 'HomeIndexController';
    public static $inject:Array<any> = ['$rootScope', '$scope', '$state', '$stateParams', '$mdBottomSheet', '$mdToast', '$mdDialog'];

    public $mdBottomSheet:angular.material.IBottomSheetService;

    constructor() {
        super(arguments);
        this.$rootScope['title'] = "牛通天代理管理系统";
        this.$rootScope['systitle'] = "系统功能";
    }

    doSetComputer($event:MouseEvent) {
        var dialogOptions:angular.material.IDialogOptions = {};

        dialogOptions.controller = 'SetComputerController';
        dialogOptions.controllerAs = 'formCtl';
        dialogOptions.templateUrl = 'js/partials/form/set_computer_form.html';
        dialogOptions.targetEvent = $event;
        dialogOptions.clickOutsideToClose = false;

        this.$mdDialog.show(dialogOptions);
    }
}