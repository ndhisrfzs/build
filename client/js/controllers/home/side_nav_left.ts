/**
 * Created by NICK on 15/10/30.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */

import ref = require('ref');
import base = require('../../../node_modules/nick_common_static/common/common/controller/base_material_controller');
import _ = require('lodash');


export class Controller extends base.BaseController {
    public static _name:string = 'HomeSideNavLeftController';
    public static $inject:Array<string> = ['$rootScope', '$scope', '$http', 'Restangular', 'mdSideMenuSections', 'mdSideMenuFactory'];

    public treeOptions:any;
    public modules:Array<any>;
    public selectedNodes:any;
    public node:any;
    public filterExpression:string = '';
    public filterComparator:boolean = false;
    private mdSideMenuSections:any;
    private mdSideMenuFactory:any;

    private Restangular:any;

    constructor() {
        super(arguments);

        this.Restangular.all('servers').getList({filter: {"where": {"isDefault": true}}}).then((datas)=> {
            if (datas && datas.length) {
                this.$rootScope['server'] = datas[0];
            }
        });
        this.Restangular.one('menus', 'all').get().then((data)=> {
            if (!data.length) return;
            data = _.indexBy(data, 'menuId');
            function loop(datas:any, depth:number = 0) {
                var nodes = _.filter(datas, (d)=> {
                    return d['depth'] == depth;
                });

                _.forEach(nodes, (node)=> {
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
            this.modules = _.find(data, (d)=> {
                return d['depth'] == 0;
            })['nodes'];
            //
            this.selectedNodes = _.indexBy(_.filter(data, (d)=> {
                return d['depth'] == 1;
            }), 'menuId');
            this.mdSideMenuSections.sections = this.modules;
            this.mdSideMenuFactory.onStateChangeStart(null, null, null);
        });

        this.mdSideMenuSections.options = {
            children: "nodes",
            key: 'menuId',
            showSearchBar: true,
            dirSelectable: false,
            orderBy: 'menuId',
            filterField: 'menuTitle'
        };
    }
}