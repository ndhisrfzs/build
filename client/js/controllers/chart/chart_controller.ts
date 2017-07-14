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
    public static _name:string = 'ChartController';
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

    initSearch1(action) {
        if (action && action.schema) {
            this.schema = JSON.parse(action.schema.schema);
            this.searchForm = action.schemaForm ? JSON.parse(action.schemaForm.schema).form : null;
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
        this.rootToolbars.push(new toolbar.Common.ToolbarItem({
            title: '刷新',
            icon: 'refresh',
            onClick: function ($event) {
                this.getServerData();
            }.bind(this)
        }));
        this.rootToolbars.push(new toolbar.Common.ToolbarItem({
            title: '搜索',
            icon: 'search',
            onClick: function ($event) {
                this.toggleSearchBar();
            }.bind(this)
        }));
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

    public labels:any[] = [];
    public series:any[] = [];
    public data:any[];
    public onClick:any;
    public options:any;
    public datasetOverride:any;

    /*
    [{"series":"dau", "data":[{"time":"2017-6-29", "count":7},{"time":"2017-6-30", "count":10}]},{"series":"dnu", "data":[{"time":"2017-6-30", "count":8}]}]
     */
    initChartData(datas){
        /*
        datas = [
            {"series":"dau", "data":[
                    {"time":"2017-6-25 00:00:00", "count":100},
                    {"time":"2017-6-26 00:00:00", "count":200},
                    {"time":"2017-6-27 00:00:00", "count":250},
                    {"time":"2017-6-28 00:00:00", "count":280},
                    {"time":"2017-6-29 00:00:00", "count":300},
                    {"time":"2017-6-30 00:00:00", "count":500}
                ]
            },
            {"series":"dnu", "data":[
                    {"time":"2017-6-25 00:00:00", "count":100},
                    {"time":"2017-6-26 00:00:00", "count":50},
                    {"time":"2017-6-27 00:00:00", "count":48},
                    {"time":"2017-6-28 00:00:00", "count":25},
                    {"time":"2017-6-29 00:00:00", "count":15},
                    {"time":"2017-6-30 00:00:00", "count":5}
                ]
            }
        ];
        */
        this.series = [];//['Series A', 'Series B'];
        this.labels = [];//["January", "February", "March", "April", "May", "June", "July"];
        this.data = [];/*[
            [65, 59, 80, 81, 56, 55, 82],
            [82, 55, 56, 0, 80, 59, 62]
        ];*/

        _.forEach(datas, (data) => {
            this.series.push(data['series']);
            var temp_data:any[] = []
            _.forEach(data["data"], (value) => {
                var time = value["time"];
                time = time.substring(0, time.indexOf(" "));
                var index = this.labels.indexOf(time);
                if(index < 0) {
                    this.labels.push(time);
                }
                temp_data.push(value["count"]);
            });
            this.data.push(temp_data);
        });
        
        this.onClick = function (points, evt) {
            console.log(points, evt);
        };
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
                        if (key.search('count') == 0) {
                            this.clientData.total = serverData[p] || 0;
                            if (key.substring(key.indexOf(':') + 1)) {
                                this.clientData.total = serverData[p][key.substring(key.indexOf(':') + 1)] || 0;
                            }
                        }
                    });
                }
                this.initChartData(this.clientData.datas);
                return this.clientData;
            };

            this.initToolbar();
            this.initSearch1(action);
            this.getServerData();
        });
    }
}