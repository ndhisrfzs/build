/**
 * Created by NICK on 15/6/5.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */


import aa = require('ref');
import base = require('../../../node_modules/nick_common_static/common/common/controller/popup_material_controller');
import editpswModel = require('../../../node_modules/nick_common_static/common/models/passport/edit_password_model');

export class Controller extends base.PopupController<Passport.EditPasswordModel,any> {
    public static $inject = ['$rootScope', '$scope', 'PassportService', '$q', '$mdToast', '$cookieStore', '$mdDialog', '$state'];
    public static _name = 'EditPswController';

    private PassportService:any;
    private $cookieStore:any;


    constructor() {
        var _this = this;

        super(arguments);

        _this.initSchema();
        _this.resolve = {
            "editpsw": _this.PassportService.editPsw
        };
        _this.dialogCloseFn = (datas)=> {
            //登录成功提示
            _this.showMsg('修改密码成功');
            //成功后跳转
            _this.$rootScope.$emit("userIntercepted", "editpsw");
        };
    }

    initSchema() {
        this.schema = editpswModel.Passport.EditPasswordModel._schema;
        this.form = [
            {
                key: 'oldPassword',
                type: 'password'
            }, {
                key: 'password',
                type: 'password'
            }, {
                key: 'passwordAgain',
                type: 'password'
            }
        ];
        this.formData = new editpswModel.Passport.EditPasswordModel();
    }
}