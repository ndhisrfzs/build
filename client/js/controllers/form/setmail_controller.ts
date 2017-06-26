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
    public static _name = 'SetMailController';

    static cookieName:string = 'bindmailCookie';

    private PassportService:any;
    private $cookieStore:any;

    public formFirst:Array<any>;
    public formSecond:Array<any>;

    public selectedIndex:number = 0;

    public steps:Array<any> = [
        {title: '发送验证码', templateUrl: '/setEmailFirst.html'},
        {title: '绑定邮箱', templateUrl: '/setEmailSecond.html'}
    ];

    constructor() {
        super(arguments);
        this.initSchema();
    }

    initSchema() {
        this.schema = bindModel.Passport.BindModel._schema;
        this.formFirst = [
            {
                key: 'email',
                type: 'text',
                title: '邮箱地址'
            },
            {
                type: 'submit',
                title: '发送验证码',
                fieldHtmlClass: 'pull-right',
                timespan: 60,
                cookie: Controller.cookieName
            }
        ];
        this.formSecond = [
            {
                key: 'smsToken',
                type: 'input',
                title: '验证码',
            },
            {
                type: 'submit',
                title: '绑定邮箱',
                fieldHtmlClass: 'pull-right'
            }
        ];
        this.formData = new bindModel.Passport.BindModel(new userModel.Passport.UserModel({
            userToken: this.$rootScope['user'].userToken
        }));
        this.content = "绑定邮箱成功";
    }

    doSendCode($form:angular.IFormController) {
        var _this = this;

        _this.resolve = {
            "sendEmailCode": _this.PassportService.sendEmailCode
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
            "confirmEmail": _this.PassportService.confirmEmail
        };
        _this.dialogCloseFn = null;
        _this.content = '绑定邮箱成功';
        _this.submit($form);
    }
}