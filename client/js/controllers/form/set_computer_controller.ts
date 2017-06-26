/**
 * Created by NICK on 15/6/5.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */


import aa = require('ref');
import base = require('../../../node_modules/nick_common_static/common/common/controller/popup_material_controller');

export class Controller extends base.PopupController<Passport.EditPasswordModel,any> {
    public static $inject = ['$rootScope', '$scope', 'Restangular', '$q', '$mdToast', '$cookieStore', '$mdDialog', '$state'];
    public static _name = 'SetComputerController';

    private $cookieStore:any;
    private Restangular:any;
    public servers:Array<any>;

    constructor() {
        super(arguments);
        this.getServers();
    }

    getServers() {
        this.isBusy = true;
        this.Restangular.all('servers').getList().then((datas)=> {
            this.servers = datas;
            angular.forEach(datas, (data)=> {
                data.isDefault && (this.formData = data);
            });
        }).finally(()=> {
            this.isBusy = false;
        });
    }

    submit() {
        if (this.formData) {
            this.isBusy = true;
            this.Restangular.one('servers', this.formData['serID']).all('set_default').doPOST()
                .then(()=> {
                    this.$rootScope['server'] = this.formData;
                    this.alert('设置服务器', '设置服务器成功!').then(()=> {
                        this.$state.go('home');
                    });
                })
                .finally(()=> {
                    this.isBusy = false;
                });
        }
    }
}