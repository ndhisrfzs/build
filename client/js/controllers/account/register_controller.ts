/**
 * Created by NICK on 15/6/24.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */

import aa = require('ref');
import base = require('../../../node_modules/nick_common_static/common/common/controller/popup_material_controller');
import regModel = require('../../../node_modules/nick_common_static/common/models/passport/register_model');

export class Controller extends base.PopupController<Passport.RegisterModel,any> {
    public static $inject = ['$rootScope', '$scope', 'PassportService', '$q', '$mdToast', '$cookieStore', '$mdDialog', '$state'];
    public static _name = 'RegisterController';

    private PassportService:any;
    private $cookieStore:any;


    constructor() {
        var _this = this;

        super(arguments);
        _this.$rootScope['mainClass'] = 'layout-column';
        _this.initSchema();
        _this.resolve = {
            "register": _this.PassportService.register
        };
        _this.dialogCloseFn = (datas)=> {
            _this.showMsg('注册成功');
            _this.$rootScope.$emit("userIntercepted", "register");
        };
    }

    initSchema() {
        this.schema = regModel.Passport.RegisterModel._schema;
        this.form = [
            {
                key: 'username',
                type: 'text',
                title: '用户名',
                icon: {
                    icon: 'person'
                },
                htmlClass: 'md-icon-float md-has-icon',
            },
            {
                key: 'password',
                type: 'password',
                title: '密码',
                icon: {
                    icon: 'lock_outline'
                },
                htmlClass: 'md-icon-float md-has-icon',
            },
            {
                key: 'passwordAgain',
                type: 'password',
                title: '重复密码',
                icon: {
                    icon: 'lock_outline'
                },
                htmlClass: 'md-icon-float md-has-icon',
            },
            {
                type: 'submit',
                title: '注册',
                fieldHtmlClass: 'layout-fill'
            }
        ];
        this.formData = new regModel.Passport.RegisterModel();
    }
}