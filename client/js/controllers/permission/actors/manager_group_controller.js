/**
 * Created by NICK on 15/11/5.
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
            _this.title = '权限组设置';
            _this.actorGroups = {};
            _this.init();
            return _this;
        }
        Controller.prototype.init = function () {
            var _this = this;
            this.actorGroups = _.indexBy(this.currentItem.actorgroups, 'groupId');
            this.clientData = new client.Common.ClientData();
            this.queryData = new query.Common.QueryBase();
            this.serverInterfaces = {
                query: this.Restangular.all('groups').getList.bind(this, { filter: this.queryData }),
                count: this.Restangular.one('groups', 'count').get.bind(this, { where: this.queryData.where })
            };
            this.dataFilter = function (serverData) {
                _this.clientData.datas.length = 0;
                _this.clientData.datas = serverData['query'] || [];
                _this.clientData.total = serverData['count'].count || 0;
                return _this.clientData;
            };
            this.getServerData();
        };
        Controller.prototype.checked = function (item) {
            return this.actorGroups.hasOwnProperty(item['groupId']);
        };
        Controller.prototype.toggleAction = function (item) {
            if (this.actorGroups.hasOwnProperty(item['groupId'])) {
                delete this.actorGroups[item['groupId']];
            }
            else {
                this.actorGroups[item['groupId']] = item;
            }
        };
        Controller.prototype.save = function () {
            var _this = this;
            this.currentItem.actorgroups.length = 0;
            _.forEach(this.actorGroups, function (group) {
                _this.currentItem.actorgroups.push({
                    aorId: _this.currentItem['aorId'],
                    groupId: group['groupId'],
                    agId: 0
                });
            });
            this.Restangular.one('actorgroups').one('save', this.currentItem.aorId).doPOST(this.currentItem.actorgroups).then(function (data) {
                _this.alert(_this.title, '执行成功!');
                _this.managerGrid && _this.managerGrid.getServerData();
            });
        };
        return Controller;
    }(gridCon.GridController));
    Controller._name = 'ActorManagerGroupController';
    Controller.$inject = ['$rootScope', '$scope', '$mdToast', '$mdDialog', 'Restangular', '$http', '$q', '$state', '$stateParams', 'currentItem', 'managerGrid'];
    Controller._templateUrl = 'js/partials/controllers/permission/actors/manager_group_form.html';
    exports.Controller = Controller;
});
//# sourceMappingURL=manager_group_controller.js.map