/**
 * Created by NICK on 15/6/5.
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
define(["require", "exports", "../../../node_modules/nick_common_static/common/common/controller/popup_material_controller", "../../../node_modules/nick_common_static/common/models/common/query_base", "../../../node_modules/objectpath/lib/objectpath", "lodash"], function (require, exports, base, queryBase, objectPath, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller = (function (_super) {
        __extends(Controller, _super);
        function Controller() {
            var _this = _super.call(this, arguments) || this;
            if (_this.detailInterfaces && _this.currentItem) {
                _this.getDetailInfo(_this.detailInterfaces, _this.detailAction && _this.detailAction.needData).then(function (serverData) {
                    var keys;
                    for (var p in serverData) {
                        keys = p.split(',');
                        _.forEach(keys, function (key) {
                            if (key.search('detail') == 0) {
                                _this.currentItem = serverData[p];
                                if (key.indexOf(':') > 0 && key.substring(key.indexOf(':') + 1)) {
                                    _this.currentItem = serverData[p][key.substring(key.indexOf(':') + 1)] || {};
                                }
                            }
                        });
                    }
                    _this.init();
                }, function () {
                    _this.close();
                });
            }
            else {
                _this.init();
            }
            return _this;
        }
        Controller.prototype.init = function () {
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
                    }
                    else {
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
                var _this = this;
                this.alert(this.title, this.content).finally(function () {
                    _this.managerGrid && _this.managerGrid.getServerData && _this.managerGrid.getServerData();
                });
            }.bind(this);
        };
        Controller.prototype.initAutoCompleteParams = function (query, params, arrayModle, arrayIndex, $parent) {
            var _this = this;
            if (params) {
                //objectPath.parse("where.id");
                _.each(params, function (param, key) {
                    if (param.top) {
                        var val = null;
                        _.each(objectPath.parse(param.key), function (k) {
                            if (!val) {
                                val = _this.formData[k];
                            }
                            else {
                                val = val[k];
                            }
                        });
                        query[key] = val;
                    }
                    else if (param.parent) {
                        _.each(objectPath.parse(param.key), function (k) {
                            if (!val) {
                                val = $parent[k];
                            }
                            else {
                                val = val[k];
                            }
                        });
                        query[key] = val;
                    }
                    else if (param.static) {
                        query[key] = param.val;
                    }
                    else {
                        var val = null;
                        _.each(objectPath.parse(param.key), function (k) {
                            if (!val) {
                                val = arrayModle[arrayIndex][k];
                            }
                            else {
                                val = val[k];
                            }
                        });
                        query[key] = val;
                    }
                });
            }
        };
        Controller.prototype.initAutoComplete = function (form) {
            var its;
            if (form.interfaceId) {
                this.Restangular.one('interfaces', form.interfaceId).doGET().then(function (data) {
                    data.params = '';
                    its = this.managerGrid.detailInterface({ 'interface': data }, {}, false);
                    form.query1 = function (searchText, arrayModle, arrayIndex, $parent) {
                        var promise = null, params = {}, query, defer = this.$q.defer();
                        if (data.isLocal) {
                            query = new queryBase.Common.QueryBase();
                            query.where[form.searchField] = {};
                            query.where[form.searchField]['like'] = searchText;
                            promise = its("", { filter: query });
                        }
                        else {
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
                            }
                            else {
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
                        }
                        else {
                            this.formData[d] = item[key];
                        }
                    }
                }.bind(this));
            }.bind(this);
        };
        Controller.prototype.initForm = function (forms) {
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
                    form.items && this.initForm(form.items);
                }
            }.bind(this));
        };
        Controller.prototype.deleteNullProperty = function () {
            _.each(this.formData, function (d, key) {
                if (d == null || d == undefined) {
                    delete this.formData[key];
                }
            }.bind(this));
        };
        return Controller;
    }(base.PopupController));
    Controller.$inject = ['$rootScope', '$scope', '$q', '$http', '$mdDialog', '$mdToast', 'managerGrid', 'Restangular', 'currentItem', 'action', 'serverInterfaces', '$state', '$stateParams', 'detailAction', 'detailInterfaces'];
    Controller._name = 'PageManagerFormController';
    Controller._templateUrl = 'js/partials/controllers/common/manager_form.html';
    exports.Controller = Controller;
});
//# sourceMappingURL=manager_form_controller.js.map