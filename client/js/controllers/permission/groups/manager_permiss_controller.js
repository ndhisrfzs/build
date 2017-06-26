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
define(["require", "exports", "../../../../node_modules/nick_common_static/common/common/controller/resource/grid_material_controller", "../../../../node_modules/nick_common_static/common/models/common/client_data", "../../../../node_modules/nick_common_static/common/models/common/query_base", "lodash"], function (require, exports, gridCon, client, query, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller = (function (_super) {
        __extends(Controller, _super);
        function Controller() {
            var _this = _super.call(this, arguments, false) || this;
            _this.title = '权限组权限设置';
            _this.groupActions = {};
            _this.init();
            return _this;
        }
        Controller.prototype.checked = function (item) {
            //return this.currentItem.groupactions && this.currentItem.groupactions
            return this.groupActions.hasOwnProperty(item['actId']);
        };
        Controller.prototype.toggleAction = function (item) {
            if (this.groupActions.hasOwnProperty(item['actId'])) {
                delete this.groupActions[item['actId']];
            }
            else {
                this.groupActions[item['actId']] = item;
            }
        };
        Controller.prototype.update = function () {
            var _this = this;
            this.currentItem.groupactions = [];
            _.forEach(this.groupActions, function (act) {
                _this.currentItem.groupactions.push({
                    actId: act['actId'],
                    groupId: _this.currentItem['groupId'],
                    gaId: 0
                });
            });
            this.Restangular.one('groupactions').one('save', this.currentItem.groupId).doPOST(this.currentItem.groupactions).then(function (data) {
                _this.alert(_this.title, '执行成功!');
                _this.managerGrid && _this.managerGrid.getServerData();
            });
        };
        Controller.prototype.init = function () {
            var _this = this;
            this.title = this.currentItem['groupTitle'] + '-' + this.title;
            this.groupActions = _.indexBy(this.currentItem.groupactions, 'actId');
            this.clientData = new client.Common.ClientData();
            this.queryData = new query.Common.QueryBase();
            this.queryData.include = ['actions'];
            this.queryData.order = 'lft';
            delete this.queryData.limit;
            delete this.queryData.offset;
            this.serverInterfaces = {
                query: this.Restangular.all('menus').getList.bind(this, { filter: this.queryData }),
                count: this.Restangular.one('menus', 'count').get.bind(this, { where: this.queryData.where })
            };
            this.dataFilter = function (serverData) {
                _this.clientData.datas.length = 0;
                _this.clientData.datas = serverData['query'] || [];
                _this.clientData.total = serverData['count'].count || 0;
                return _this.clientData;
            };
            this.getServerData();
        };
        return Controller;
    }(gridCon.GridController));
    Controller.$inject = ['$rootScope', '$scope', '$q', '$http', '$mdDialog', '$mdToast', 'managerGrid', 'Restangular', 'currentItem'];
    Controller._name = 'GroupManagerPermissController';
    Controller._templateUrl = 'js/partials/controllers/permission/groups/manager_permiss_form.html';
    exports.Controller = Controller;
});
//# sourceMappingURL=manager_permiss_controller.js.map