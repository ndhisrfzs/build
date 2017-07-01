/**
 * Created by NICK on 15/6/17.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */


import aa = require('ref');
import base = require('../../../node_modules/nick_common_static/common/common/controller/popup_material_controller');
import loginModel = require('../../../node_modules/nick_common_static/common/models/passport/login_model');

export class Controller extends base.PopupController<Passport.LoginModel,any> {
    public static $inject = ['$rootScope', '$scope', 'config', 'PassportService', '$q', '$mdToast', '$cookieStore', '$mdDialog', '$state'];
    public static _name = 'LoginController';

    private PassportService:any;
    private $cookieStore:any;
    private config:any;


    constructor() {
        var _this = this;

        super(arguments);
        _this.$rootScope['mainClass'] = 'layout-column';

        _this.initSchema();

        _this.resolve = {
            "loginCheck": _this.PassportService.loginCheck
        };
        _this.dialogCloseFn = (datas)=> {
            //设置cookie
            _this.$cookieStore.put(_this.config.prefix + 'access_token', datas['loginCheck'].data.token);
            _this.$cookieStore.put(_this.config.prefix + 'refresh_token', datas['loginCheck'].data.token);
            _this.$cookieStore.put(_this.config.prefix + 'user_token', datas['loginCheck'].data.user_token);
            //登录成功提示
            _this.showMsg('登录成功');
            //成功后跳转
            _this.$state.go('home');
        };
    }

    initSchema() {
        this.schema = loginModel.Passport.LoginModel._schema;
        this.form = [
            {
                key: 'username',
                type: 'string',
                icon: {
                    icon: 'person',
                },
                htmlClass: 'md-icon-float md-has-icon',
                disableSuccessState: true
            }, {
                key: 'password',
                type: 'password',
                icon: {
                    icon: 'lock_outline'
                },
                htmlClass: 'md-icon-float md-has-icon',
                disableSuccessState: true
            }, {
                key: 'expireIn',
            }, {
                type: 'submit',
                title: '登录',
                readonly: false,
                fieldHtmlClass: 'layout-fill',
                icon: ''
            }];
        this.formData = new loginModel.Passport.LoginModel();
    }
}