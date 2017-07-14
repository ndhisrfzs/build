/**
 * Created by NICK on 15/6/25.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */


import aa = require('ref');
import base = require('../../../node_modules/nick_common_static/common/common/controller/popup_material_controller');
import forgetModel = require('../../../node_modules/nick_common_static/common/models/passport/forget_model');

export class Controller extends base.PopupController<Passport.ForgetModel,any> {
    public static $inject = ['$rootScope', '$scope', 'PassportService', '$q', '$mdToast', '$cookieStore', '$mdDialog', '$state'];
    public static _name = 'ForgetEmailController';

    static cookieName:string = 'forgetMailCookie';

    private PassportService:any;
    private $cookieStore:any;

    public formFirst:Array<any>;
    public formSecond:Array<any>;

    public selectedIndex:number = 0;

    public steps:Array<any> = [
        {title: '发送验证码', templateUrl: '/forgetMailFirst.html'},
        {title: '修改密码', templateUrl: '/forgetMailSecond.html'}
    ];

    constructor() {
        super(arguments);
        this.$rootScope['mainClass'] = 'layout-column';
        this.initSchema();
    }

    initSchema() {
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
            }];
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
    }

    doSendCode($form:angular.IFormController) {
        var _this = this;

        _this.resolve = {
            "sendResetPswMailCode": _this.PassportService.sendResetPswMailCode
        };
        _this.dialogCloseFn = (datas)=> {
            _this.$cookieStore.put(Controller.cookieName, Date.now());
            _this.formData.userToken = datas['sendResetPswMailCode'].data.user_token;
            _this.selectedIndex = 1;
        };

        _this.submit($form);
    }

    doEditPassword($form:angular.IFormController) {
        var _this = this;

        _this.resolve = {
            "resetMailPassword": _this.PassportService.resetMailPassword
        };
        _this.dialogCloseFn = (datas)=> {
            _this.showMsg('重置密码成功');
            _this.$rootScope.$emit("userIntercepted", "findPassword");
        };

        _this.submit($form);
    }
}