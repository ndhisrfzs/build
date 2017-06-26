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
define(["require", "exports", "../../../node_modules/nick_common_static/common/common/controller/base_material_controller", "lodash"], function (require, exports, base, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller = (function (_super) {
        __extends(Controller, _super);
        function Controller() {
            var _this = _super.call(this, arguments) || this;
            _this.filterExpression = '';
            _this.filterComparator = false;
            _this.Restangular.all('servers').getList({ filter: { "where": { "isDefault": true } } }).then(function (datas) {
                if (datas && datas.length) {
                    _this.$rootScope['server'] = datas[0];
                }
            });
            _this.Restangular.one('menus', 'all').get().then(function (data) {
                if (!data.length)
                    return;
                data = _.indexBy(data, 'menuId');
                function loop(datas, depth) {
                    if (depth === void 0) { depth = 0; }
                    var nodes = _.filter(datas, function (d) {
                        return d['depth'] == depth;
                    });
                    _.forEach(nodes, function (node) {
                        if (datas[node['menuParentId']]) {
                            !datas[node['menuParentId']].nodes && (datas[node['menuParentId']].nodes = []);
                            node['menuShow'] && datas[node['menuParentId']].nodes.push(node);
                        }
                    });
                    if (nodes.length) {
                        loop(datas, depth + 1);
                    }
                }
                loop(data, 0);
                _this.modules = _.find(data, function (d) {
                    return d['depth'] == 0;
                })['nodes'];
                //
                _this.selectedNodes = _.indexBy(_.filter(data, function (d) {
                    return d['depth'] == 1;
                }), 'menuId');
                _this.mdSideMenuSections.sections = _this.modules;
                _this.mdSideMenuFactory.onStateChangeStart(null, null, null);
            });
            _this.mdSideMenuSections.options = {
                children: "nodes",
                key: 'menuId',
                showSearchBar: true,
                dirSelectable: false,
                orderBy: 'menuId',
                filterField: 'menuTitle'
            };
            return _this;
        }
        return Controller;
    }(base.BaseController));
    Controller._name = 'HomeSideNavLeftController';
    Controller.$inject = ['$rootScope', '$scope', '$http', 'Restangular', 'mdSideMenuSections', 'mdSideMenuFactory'];
    exports.Controller = Controller;
});
//# sourceMappingURL=side_nav_left.js.map