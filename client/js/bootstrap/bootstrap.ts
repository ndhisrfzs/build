/**
 * Created by NICK on 15/6/5.
 * email:nick121212@126.com
 * copyright NICK
 */

import ref = require('ref');
import angular = require('angular');
import appModule = require('modules/app_module');
import services = require('services/services');
import controller = require('controllers/controllers');
import directive = require('directives/directives');
import filter = require('../../node_modules/nick_common_static/common/filters/filters');

 var init = ()=>{
    new services.Services(appModule.module);
    new controller.Controllers(appModule.module);
    new directive.Directives(appModule.module);
    new filter.Filters(appModule.module);

    /*
     * 启动angular
     * */
    angular.bootstrap(document, [appModule.module.name]);
};

init();