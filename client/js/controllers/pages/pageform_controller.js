/**
 * Created by NICK on 15/10/30.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "../../../node_modules/nick_common_static/common/common/controller/resource/grid_material_controller", "../../../node_modules/nick_common_static/common/models/common/client_data", "../../../node_modules/nick_common_static/common/models/common/query_base", "../../../node_modules/nick_common_static/common/models/common/toolbar_item", "lodash"], function (require, exports, gridCon, client, query, toolbar, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller = (function (_super) {
        __extends(Controller, _super);
        function Controller() {
            var _this = _super.call(this, arguments) || this;
            _this.isBusy = true;
            _this.$q.all({
                menu: _this.Restangular.one('menus', 'findOne').get({
                    filter: {
                        //include: ['actions'],
                        where: {
                            menuKey: _this.$stateParams['key']
                        }
                    }
                }),
                actions: _this.Restangular.one('actions', _this.$stateParams['key']).all('all').doGET()
            }).then(function (datas) {
                _this.menu = datas['menu'];
                _this.menu.actions = datas['actions'];
                _this.icon = _this.menu.menuIcon;
                document.title = _this.title = _this.menu.menuTitle;
                _this.isBusy = false;
                _this.init();
            }).finally(function () {
                _this.isBusy = false;
            });
            return _this;
        }
        Controller.prototype.submit = function ($form) {
            var promises = {};
            this.$rootScope.$broadcast('schemaFormValidate');
            if ($form.$dirty && $form.$valid && !this.isBusy) {
                this.doSearch($form);
            }
            if (!$form.$valid) {
                this.showErrMsg("表单填写不正确,请查看红色的表单项!");
                console.log($form.$error);
            }
        };
        Controller.prototype.initSearch1 = function (action) {
            var _this = this;
            if (action && action.schema) {
                this.schema = JSON.parse(action.schema.schema);
                this.searchForm = action.schemaForm ? JSON.parse(action.schemaForm.schema).form : null;
                this.searchData = action.schemaData ? JSON.parse(action.schemaData.schema) : {};
                this.defQuery = {};
                _.forEach(this.schema.query, function (d, key) {
                    _this.defQuery[key] = _this.$stateParams[d] || d;
                });
                if (!this.searchForm) {
                    this.rootToolbars.pop();
                }
                this.searchMode = this.schema.searchMode;
                this.queryData.order = this.schema.order || "";
                this.queryData.include = this.schema.include || [];
                this.schema.limit && (this.queryData.pageCount = this.queryData.limit = this.schema.limit);
            }
        };
        Controller.prototype.initToolbar = function () {
            var _this = this;
            _.forEach(this.menu.actions, function (action) {
                switch (~~action['actType']) {
                    case 1:
                        _this.rootToolbars.push(new toolbar.Common.ToolbarItem({
                            title: action['actTitle'],
                            icon: action['actIcon'],
                            onClick: function (action, $event) {
                                this.doAction(action, null, $event);
                            }.bind(_this, action)
                        }));
                        break;
                    case 2:
                        _this.itemToolbars.push(new toolbar.Common.ToolbarItem({
                            title: action['actTitle'],
                            icon: action['actIcon'],
                            onClick: function (action, item, $event) {
                                this.doAction(action, item, $event);
                            }.bind(_this, action)
                        }));
                        break;
                }
            });
        };
        /*
         * 获取接口详细信,解析接口信息
         * d:接口数据,
         * item:当前controller的数据
         * needParam:是否需要参数
         * */
        Controller.prototype.detailInterface = function (d, item, needParam) {
            var _this = this;
            var inteface = null, paramArray;
            var params = {};
            _.forEach(d['interface']['interface'].split('/'), function (k) {
                if (d['interface']['isLocal']) {
                    if (k.search(':') == 0) {
                        k = item[k.substring(1)];
                    }
                    if (inteface) {
                        inteface = inteface.all(k);
                    }
                    else {
                        inteface = _this.Restangular.all(k);
                    }
                }
                else {
                    inteface = _this.Restangular.one('interfaces', d['interface']['interfaceId']).all('execute');
                }
            });
            if (d['interface']['isLocal']) {
                if (d['interface']['params']) {
                    paramArray = d['interface']['params'].split(':');
                    params[paramArray[0]] = paramArray[1] ? this.queryData[paramArray[1]] : this.queryData;
                    inteface = inteface['do' + d['interface']['type']].bind(this, "", params);
                }
                else {
                    inteface = inteface['do' + d['interface']['type']].bind(this);
                }
            }
            else {
                inteface = needParam ? inteface.doPOST.bind(this, this.queryData) : inteface.doPOST.bind(this);
            }
            return inteface;
        };
        Controller.prototype.getServerFns = function (action, item, needParam, callback) {
            var inteface, params, paramArray, serverInterfaces = {};
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
                var _this = this;
                _.forEach(results['actioninterface'], function (d) {
                    serverInterfaces[d['key']] = _this.detailInterface(d, item, needParam);
                });
                callback(results['action'], serverInterfaces);
            }.bind(this));
        };
        Controller.prototype.dealJump = function () {
            //"http://192.168.1.250?orderReq="
            if (this.schema.jumpUrl) {
                window.location = this.schema.jumpUrl + this.clientData.datas;
            }
        };
        Controller.prototype.init = function () {
            var _this = this;
            var viewAct = _.find(this.menu.actions, function (act) {
                return act['actKey'] == 'view';
            });
            var err = function () {
                _this.alert(_this.title, '没有配置带有view的操作!').finally(function () {
                    _this.$state.go('home');
                });
                return;
            };
            if (!viewAct) {
                return err();
            }
            this.clientData = new client.Common.ClientData();
            this.queryData = new query.Common.QueryBase();
            this.getServerFns(viewAct, {}, true, function (action, serverInterfaces) {
                _this.serverInterfaces = serverInterfaces;
                _this.dataFilter = function (serverData) {
                    var keys;
                    _this.clientData.datas.length = 0;
                    for (var p in serverData) {
                        keys = p.split(',');
                        _.forEach(keys, function (key) {
                            if (key.search('query') == 0) {
                                _this.clientData.datas = serverData[p];
                                if (key.substring(key.indexOf(':') + 1)) {
                                    var value = serverData[p][key.substring(key.indexOf(':') + 1)] || [];
                                    _this.clientData.datas = value;
                                }
                            }
                        });
                    }
                    if (_this.clientData.datas["message"]) {
                        _this.alert(_this.title, _this.clientData.datas["message"]);
                    }
                    _this.dealJump();
                    return _this.clientData;
                };
                _this.initToolbar();
                _this.initSearch1(action);
                //this.getServerData();
            });
        };
        return Controller;
    }(gridCon.GridController));
    Controller._name = 'PageFormController';
    Controller.$inject = ['$rootScope', '$scope', '$mdToast', '$mdDialog', 'Restangular', '$http', '$q', '$state', '$stateParams'];
    exports.Controller = Controller;
});
//# sourceMappingURL=pageform_controller.js.map