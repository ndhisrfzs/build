/**
 * Created by NICK on 15/7/3.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */

import aa = require('ref');
import base = require('../../../node_modules/nick_common_static/common/common/controller/popup_material_controller');
import userModel = require('../../../node_modules/nick_common_static/common/models/passport/user_model');


export class Controller extends base.PopupController<Passport.UserModel,any> {
    public static $inject = ['$rootScope', '$scope', 'PassportService', '$q', '$mdToast', '$cookieStore', '$mdDialog', '$state'];
    public static _name = 'SetAliasNameController';

    private PassportService:any;
    private $cookieStore:any;


    constructor() {
        super(arguments);
        this.initSchema();
    }

    initSchema() {
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
    }
}