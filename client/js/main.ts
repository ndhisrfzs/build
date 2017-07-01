/**
 * Created by NICK on 15/10/13.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */

import ref = require('ref');

var config:RequireConfig = {
    baseUrl: 'js',
    shim: {
        'angular': {
            deps: ['jquery'],
            exports: 'angular'
        },
        'angular-animate': {
            deps: ['angular']
        },
        'angular-ui-route': {
            deps: ['angular']
        },
        'angular-aria': {
            deps: ['angular']
        },
        'angular-permission': {
            deps: ['angular']
        },
        'angular-material': {
            deps: ['angular-aria', 'angular-animate']
        },
        'angular-sanitize': {
            deps: ['angular']
        },
        'schemaForm': {
            deps: ['angular', 'objectpath', 'tv4', 'angular-sanitize']
        },
        'angular-cookies': {
            deps: ['angular']
        },
        'angular-schema-form-material': {
            deps: ['schemaForm']
        },
        'angular-material-datatable': {
            deps: ['angular-material']
        },
        'angular-loading-bar': {
            deps: ['angular']
        },
        'angular-meterial-icons': {
            deps: ['angular', 'angular-material']
        },
        'angular-touch': {
            deps: ['angular']
        },
        'template': {
            deps: ['angular']
        },
        'angular-tree-control': {
            deps: ['angular']
        },
        'angular-resource': {
            deps: ['angular']
        },
        'lbServices': {
            deps: ['angular-resource']
        },
        'angular-restangular': {
            deps: ['angular', 'lodash']
        },
        'angular-json-edit': {
            deps: ['angular']
        },
        'angular-jsoneditor': {
            deps: ['angular', 'jsoneditor']
        },
        'mdpickers': {
            deps: ['angular', 'angular-material', 'angular-meterial-icons', 'moment']
        },
        'angular-material-datepicker': {
            deps: ['angular', 'angular-material', 'angular-meterial-icons', 'moment']
        },
        'angular-moment': {
            deps: ['angular', 'moment']
        },
        'angular-strap': {
            deps: ['angular']
        },
        'angular-schema-form-datetimepicker': {
            deps: ['angular', 'angular-strap', 'schemaForm']
        },
        'angular-datetime-picker': {
            deps: ['angular']
        },
        'angular-material-datetime-picker': {
            deps: ['angular']
        },
        'angular-datepicker': {
            deps: ['angular']
        },
        'rangepicker': {
            deps: ['angular-material']
        },
        'jquery-ui': {
            deps: ['jquery']
        },
        'ui-sortable': {
            deps: ['angular', 'jquery-ui']
        },
        'angular-chart': {
            deps: ['angular', 'chart']
        }
    },
    paths: {
        'text': '../node_modules/requirejs-plugins/lib/text',
        'json': '../node_modules/requirejs-plugins/src/json',
        'angular': '../node_modules/angular/angular',
        'angular-ui-route': '../node_modules/ui-router/release/angular-ui-router',
        'angular-permission': '../node_modules/angular-permission/dist/angular-permission',
        'angular-resource': '../node_modules/angular-resource/angular-resource',
        'angular-animate': '../node_modules/angular-animate/angular-animate',
        'angular-aria': '../node_modules/angular-aria/angular-aria',
        'angular-cookies': '../node_modules/angular-cookies/angular-cookies',
        'angular-material': '../node_modules/angular-material/angular-material',
        'schemaForm': '../node_modules/angular-schema-form/dist/schema-form',
        'angular-sanitize': '../node_modules/angular-sanitize/angular-sanitize',
        'objectpath': '../node_modules/objectpath/lib/objectpath',
        'tv4': '../node_modules/tv4/tv4',
        'validator': '../bower_components/validator-js/validator',
        'angular-meterial-icons': '../node_modules/angular-material-icons/angular-material-icons',
        'angular-schema-form-material': 'libs/material-decorator',
        'angular-loading-bar': '../node_modules/angular-loading-bar/build/loading-bar',
        'angular-touch': '../node_modules/angular-touch/angular-touch',
        'common': '../node_modules/nick_common_static/common/',
        'template': 'partials/partials',
        'angular-tree-control': '../bower_components/angular-tree-control/angular-tree-control',
        'lodash': '../node_modules/lodash/index',
        'angular-material-datatable': '../node_modules/nick_common_static/common/libs/angular-material-datatable',
        'angular-restangular': '../node_modules/restangular/dist/restangular',
        'jsoneditor': '../bower_components/jsoneditor/dist/jsoneditor',
        'angular-jsoneditor': '../bower_components/ng-jsoneditor/ng-jsoneditor',
        'mdpickers': 'libs/mdPickers/dist/mdPickers',
        'moment': '../bower_components/moment/min/moment-with-locales',
        'jquery': '../bower_components/jquery/dist/jquery',
        'jquery-ui': '../bower_components/jquery-ui/jquery-ui',
        'ui-sortable': '../bower_components/angular-ui-sortable/sortable.min',
        'chart': '../node_modules/chart.js/dist/Chart',
        'angular-chart': '../node_modules/angular-chart.js/dist/angular-chart'
        //'rangepicker':'../bower_components/smDateTimeRangePicker/dist/sm-picker-min'
    },
    deps: [
        'angular-ui-route',
        'angular-permission',
        'angular-material',
        'mdpickers',
        'moment',
        'angular-schema-form-material',
        'angular-cookies',
        'angular-loading-bar',
        'angular-meterial-icons',
        //'angular-touch',
        'common/libs/svg-morpheus',
        'angular-material-datatable',
        'libs/tv4-custom-formats',
        'template',
        'angular-restangular',
        'angular-jsoneditor',
        'lodash',
        'ui-sortable',
        'angular-chart'
        //'rangepicker'
    ],
    config: {
        'common/services/config_constant': 'pro',
        'modules/app_module': [
            'ui.router',
            'permission',
            'ngMaterial',
            'schemaForm',
            //'ngTouch',
            'ng.jsoneditor',
            'ngAnimate',
            'ngCookies',
            'ngMdIcons',
            'partialsModule',
            'md.data.table',
            'restangular',
            'angular-loading-bar',
            'mdPickers',
            'ui.sortable',
            'chart.js'
            //'smDateTimeRangePicker'
        ]
    },
    callback: function () {
        console.log("callback");
        requirejs(["bootstrap/bootstrap"]);
    },
    urlArgs: '@@version'
};
console.log("config");
requirejs.config(config);

//export var r = requirejs;