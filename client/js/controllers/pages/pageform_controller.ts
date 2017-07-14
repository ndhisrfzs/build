/**
 * Created by NICK on 15/10/30.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */

import ref = require('ref');
import gridCon = require('../../../node_modules/nick_common_static/common/common/controller/resource/grid_material_controller');
import client = require('../../../node_modules/nick_common_static/common/models/common/client_data');
import query = require('../../../node_modules/nick_common_static/common/models/common/query_base');
import toolbar = require('../../../node_modules/nick_common_static/common/models/common/toolbar_item');
import _ = require('lodash');

import pageform = require('controllers/pages/manager_form_controller');

export class Controller extends gridCon.GridController<any> {
    public static _name:string = 'PageFormController';
    public static $inject:Array<any> = ['$rootScope', '$scope', '$mdToast', '$mdDialog', 'Restangular', '$http', '$q', '$state', '$stateParams'];

    public Restangular:any;
    public menu:any;

    constructor() {
        super(arguments);
       
        this.isBusy = true;
        this.$q.all({
            menu: this.Restangular.one('menus', 'findOne').get({
                filter: {
                    //include: ['actions'],
                    where: {
                        menuKey: this.$stateParams['key']
                    }
                }
            }),
            actions: this.Restangular.one('actions', this.$stateParams['key']).all('all').doGET()
        }).then((datas)=> {
            this.menu = datas['menu'];
            this.menu.actions = datas['actions']
            this.icon = this.menu.menuIcon;
            document.title = this.title = this.menu.menuTitle;
            this.isBusy = false;
            this.init();
        }).finally(()=> {
            this.isBusy = false;
        });
    }

    submit($form:ng.IFormController) {
        var promises:{[index: string]: ng.IPromise<any>} = {};

        this.$rootScope.$broadcast('schemaFormValidate');
        if ($form.$dirty && $form.$valid && !this.isBusy) {
            this.doSearch($form);
        }
        if (!$form.$valid) {
            this.showErrMsg("表单填写不正确,请查看红色的表单项!");
            console.log($form.$error);
        }
    }

    initSearch1(action) {
        if (action && action.schema) {
            this.schema = JSON.parse(action.schema.schema);
            this.searchForm = action.schemaForm ? JSON.parse(action.schemaForm.schema).form : null;
            this.searchData = action.schemaData ? JSON.parse(action.schemaData.schema) : {};
            this.defQuery = {
                //menuId: this.$stateParams['menuId']
            };
            _.forEach(this.schema.query, (d, key)=> {
                this.defQuery[key] = this.$stateParams[d] || d;
            });
            if (!this.searchForm) {
                this.rootToolbars.pop();
            }
            this.searchMode = this.schema.searchMode;
            this.queryData.order = this.schema.order || "";
            this.queryData.include = this.schema.include || [];
            this.schema.limit && (this.queryData.pageCount = this.queryData.limit = this.schema.limit);
        }
    }

    initToolbar() {
        _.forEach(this.menu.actions, (action)=> {
            switch (~~action['actType']) {
                case 1:
                    this.rootToolbars.push(new toolbar.Common.ToolbarItem({
                        title: action['actTitle'],
                        icon: action['actIcon'],
                        onClick: function (action, $event) {
                            this.doAction(action, null, $event);
                        }.bind(this, action)
                    }));
                    break;
                case 2:
                    this.itemToolbars.push(new toolbar.Common.ToolbarItem({
                        title: action['actTitle'],
                        icon: action['actIcon'],
                        onClick: function (action, item, $event) {
                            this.doAction(action, item, $event);
                        }.bind(this, action)
                    }));
                    break;
            }
        });
    }

    /*
     * 获取接口详细信,解析接口信息
     * d:接口数据,
     * item:当前controller的数据
     * needParam:是否需要参数
     * */
    detailInterface(d, item, needParam) {
        var inteface = null, paramArray;
        var params = {};
        _.forEach(d['interface']['interface'].split('/'), (k)=> {
            if (d['interface']['isLocal']) {
                if (k.search(':') == 0) {
                    k = item[k.substring(1)];
                }
                if (inteface) {
                    inteface = inteface.all(k);
                } else {
                    inteface = this.Restangular.all(k);
                }
            } else {
                inteface = this.Restangular.one('interfaces', d['interface']['interfaceId']).all('execute');
            }
        });

        if (d['interface']['isLocal']) {
            if (d['interface']['params']) {
                paramArray = d['interface']['params'].split(':');
                params[paramArray[0]] = paramArray[1] ? this.queryData[paramArray[1]] : this.queryData;
                inteface = inteface['do' + d['interface']['type']].bind(this, "", params);
            } else {
                inteface = inteface['do' + d['interface']['type']].bind(this);
            }
        } else {
            inteface = needParam ? inteface.doPOST.bind(this, this.queryData) : inteface.doPOST.bind(this);
        }

        return inteface;
    }

    getServerFns(action, item, needParam, callback) {
        var inteface, params, paramArray,
            serverInterfaces = {};

        this.$q.all({
            'actioninterface': this.Restangular.one('actions', action['actId']).all('actioninterfaces').getList({
                filter: {
                    include: ['interface']
                }
            }),
            'action': this.Restangular.one('actions', action['actId']).get({
                filter: {
                    include: ['schema', 'schemaForm', 'schemaData']
                }
            })
        }).then(function (results) {
            _.forEach(results['actioninterface'], (d)=> {
                serverInterfaces[d['key']] = this.detailInterface(d, item, needParam);
            });
            callback(results['action'], serverInterfaces);
        }.bind(this));
    }

    dealJump(){
        //"http://192.168.1.250?orderReq="
        if(this.schema.jumpUrl){
            window.location = this.schema.jumpUrl + this.clientData.datas;
        }
    }

    init() {
        var viewAct = _.find(this.menu.actions, (act)=> {
            return act['actKey'] == 'view';
        });

        var err = ()=> {
            this.alert(this.title, '没有配置带有view的操作!').finally(()=> {
                this.$state.go('home');
            });
            return;
        };

        if (!viewAct) {
            return err();
        }

        this.clientData = new client.Common.ClientData<any>();
        this.queryData = new query.Common.QueryBase();
        this.getServerFns(viewAct, {}, true, (action, serverInterfaces)=> {
            this.serverInterfaces = serverInterfaces;
            this.dataFilter = (serverData:any)=> {
                var keys;
                this.clientData.datas.length = 0;
                for (var p in serverData) {
                    keys = p.split(',');
                    _.forEach(keys, (key)=> {
                        if (key.search('query') == 0) {
                            this.clientData.datas = serverData[p];
                            if (key.substring(key.indexOf(':') + 1)) {
                                var value = serverData[p][key.substring(key.indexOf(':') + 1)] || [];
                                this.clientData.datas = value;
                            }
                        }
                    });
                }

                if(this.clientData.datas["message"]){
                    this.alert(this.title, this.clientData.datas["message"]);
                }

                this.dealJump();
                return this.clientData;
            };

            this.initToolbar();
            this.initSearch1(action);
            //this.getServerData();
        });
    }
}