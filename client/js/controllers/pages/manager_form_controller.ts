/**
 * Created by NICK on 15/6/5.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */

import ref = require('ref');
import base = require('../../../node_modules/nick_common_static/common/common/controller/popup_material_controller');
import queryBase = require('../../../node_modules/nick_common_static/common/models/common/query_base');
import objectPath = require('../../../node_modules/objectpath/lib/objectpath');
import _ = require("lodash");
import QueryBase = Common.QueryBase;

export class Controller extends base.PopupController<any,any> {
    public static $inject:Array<string> = ['$rootScope', '$scope', '$q', '$http', '$mdDialog', '$mdToast', 'managerGrid', 'Restangular', 'currentItem', 'action', 'serverInterfaces', '$state', '$stateParams', 'detailAction', 'detailInterfaces'];
    public static _name = 'PageManagerFormController';
    public static _templateUrl = 'js/partials/controllers/common/manager_form.html';

    //本地接口使用rest
    private Restangular:any;
    //操作的数据
    private action:any;
    //详情的接口
    private detailInterfaces:any;
    //提交的接口
    private serverInterfaces:any;
    //详情操作的数据
    private detailAction:any;

    constructor() {
        super(arguments);

        if (this.detailInterfaces && this.currentItem) {
            this.getDetailInfo(this.detailInterfaces, this.detailAction && this.detailAction.needData).then((serverData)=> {
                var keys;

                for (var p in serverData) {
                    keys = p.split(',');
                    _.forEach(keys, (key)=> {
                        if (key.search('detail') == 0) {
                            this.currentItem = serverData[p];
                            if (key.indexOf(':') > 0 && key.substring(key.indexOf(':') + 1)) {
                                this.currentItem = serverData[p][key.substring(key.indexOf(':') + 1)] || {};
                            }
                        }
                    });
                }
                this.init();
            }, ()=> {
                this.close();
            });
        } else {
            this.init();
        }
    }

    init() {
        this.currentItem = this.currentItem || {};
        this.title = this.action.actTitle;
        if (!this.action.schema || !this.action.schemaForm) {
            return;
        }

        this.formData = angular.extend({}, this.currentItem);
        if (this.action.clearCurrentItem) {
            this.formData = {};
        }
        this.deleteNullProperty();
        if (this.action.schemaData) {
            this.action.schemaData.schema = JSON.parse(this.action.schemaData.schema);
            _.forEach(this.action.schemaData.schema, function (d, key) {
                if (this[d['source']] && this[d['source']][d['key']] !== undefined) {
                    this.formData[key] = this[d['source']][d['key']];
                } else {
                    if (d['defaultTo'] !== undefined) {
                        this.formData[key] = d['defaultTo'];
                    }
                }
                switch (d['type']) {
                    case "number":
                        this.formData[key] = ~~this.formData[key];
                        break;
                    case "date":
                        if (typeof this.formData[key] == 'string') {
                            this.formData[key] = new Date(parseInt(this.formData[key].replace("/Date(", "").replace(")/", ""), 10));
                        }
                        break;
                    default:
                        break;
                }
            }.bind(this));
        }
        this.schema = JSON.parse(this.action.schema.schema);
        this.form = JSON.parse(this.action.schemaForm.schema).form || ['*'];
        this.initForm(this.form);
        this.resolve = this.serverInterfaces;
        this.content = this.action.actTitle + '成功!';
        this.dialogCloseFn = function () {
            this.alert(this.title, this.content).finally(()=> {
                this.managerGrid && this.managerGrid.getServerData && this.managerGrid.getServerData();
            });
        }.bind(this);
    }

    initAutoCompleteParams(query, params, arrayModle, arrayIndex, $parent) {
        if (params) {
            //objectPath.parse("where.id");
            _.each(params, (param, key)=> {
                if (param.top) {
                    var val = null;
                    _.each(objectPath.parse(param.key), (k)=> {
                        if (!val) {
                            val = this.formData[k];
                        } else {
                            val = val[k];
                        }
                    });
                    query[key] = val;
                } else if (param.parent) {
                    _.each(objectPath.parse(param.key), (k)=> {
                        if (!val) {
                            val = $parent[k];
                        } else {
                            val = val[k];
                        }
                    });
                    query[key] = val;
                } else if (param.static) {
                    query[key] = param.val;
                } else {
                    var val = null;
                    _.each(objectPath.parse(param.key), (k)=> {
                        if (!val) {
                            val = arrayModle[arrayIndex][k];
                        } else {
                            val = val[k];
                        }
                    });
                    query[key] = val;
                }
            });
        }
    }

    initAutoComplete(form) {
        var its;

        if (form.interfaceId) {
            this.Restangular.one('interfaces', form.interfaceId).doGET().then(function (data) {
                data.params = '';
                its = this.managerGrid.detailInterface({'interface': data}, {}, false);
                form.query1 = function (searchText, arrayModle, arrayIndex, $parent) {
                    var promise = null,
                        params = {},
                        query,
                        defer = this.$q.defer();
                    if (data.isLocal) {
                        query = new queryBase.Common.QueryBase();
                        query.where[form.searchField] = {};
                        query.where[form.searchField]['like'] = searchText;
                        promise = its("", {filter: query});
                    } else {
                        params[form.searchField] = searchText;
                        this.initAutoCompleteParams(params, form.params, arrayModle, arrayIndex, $parent);
                        promise = its(params);
                    }
                    form.data = [];
                    promise.then(function (results) {
                        //console.log(results);
                        if (form.queryField) {
                            form.data = results[form.queryField];
                            defer.resolve(results[form.queryField]);
                        } else {
                            defer.resolve(results);
                        }
                    }, function () {
                        defer.reject();
                    });

                    return defer.promise;
                }.bind(this);
            }.bind(this));
        }
        form.onChange = function (item, form, model, modelArray, $index) {
            _.forEach(form.clearList, function (key) {
                modelArray && (modelArray[key] = null);
            });
            _.forEach(form.copyValue, function (d, key) {
                if (item[key]) {
                    if (modelArray && modelArray[$index]) {
                        modelArray[$index][d] = item[key];
                    } else {
                        this.formData[d] = item[key]
                    }
                }
            }.bind(this));
        }.bind(this);
    }

    initForm(forms) {
        _.forEach(forms, function (form) {
            if (form.type === "autocomplete") {
                form.query = function (searchText, arrayModle, arrayIndex, $parent) {
                    if (form.query1) {
                        return form.query1(searchText, arrayModle, arrayIndex, $parent);
                    }
                    return form.data || [];
                };
                this.initAutoComplete(form);
            }
            else if (form.type === "checkboxes") {
                form.change = function (hash, modelArray) {
                    if (form.singleSelected) {
                        //console.log(model);
                        modelArray.length = 0;
                        modelArray.push(hash.value);
                    }
                };
            }
            else if (form.type == "array" || form.type == "tabarray" || form.type == "section") {
                form.items && this.initForm(form.items)
            }
        }.bind(this));
    }

    deleteNullProperty() {
        _.each(this.formData, function (d, key) {
            if (d == null || d == undefined) {
                delete this.formData[key];
            }
        }.bind(this));
    }

}