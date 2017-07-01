/**
 * Created by NICK on 15/7/3.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */

import aa = require('ref');
import base = require('../../../node_modules/nick_common_static/common/common/controller/popup_material_controller');
import bindModel = require('../../../node_modules/nick_common_static/common/models/passport/bind_model');
import userModel = require('../../../node_modules/nick_common_static/common/models/passport/user_model');

export class Controller extends base.PopupController<Passport.BindModel,any> {
    public static $inject = ['$rootScope', '$scope', 'PassportService', '$q', '$mdToast', '$cookieStore', '$mdDialog', '$state'];
     public static _name = 'SetMobileController';

    static cookieName:string = 'forgetMobileCookie';

    private PassportService:any;
    private $cookieStore:any;

    public formFirst:Array<any>;
    public formSecond:Array<any>;

    public selectedIndex:number = 0;

    public steps:Array<any> = [
        {title: '发送验证码', templateUrl: '/setMobileFirst.html'},
        {title: '修改密码', templateUrl: '/setMobileSecond.html'}
    ];

    constructor() {
        super(arguments);

        this.initSchema();
    }

    initSchema() {
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
    }

    doSendCode($form:angular.IFormController) {
        var _this = this;

        _this.resolve = {
            "sendMobileConfirmCode": _this.PassportService.sendMobileConfirmCode
        };
        _this.dialogCloseFn = (datas)=> {
            _this.$cookieStore.put(Controller.cookieName, Date.now());
            _this.selectedIndex = 1;
        };

        _this.submit($form);
    }

    doBindPhone($form:angular.IFormController) {
        var _this = this;

        _this.resolve = {
            "confirmMobile": _this.PassportService.confirmMobile
        };
        _this.dialogCloseFn = null;
        _this.content = '绑定手机成功';
        _this.submit($form);
    }
}