/**
 * Created by NICK on 15/10/30.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */

import ref = require('ref');

export var init = ($urlRouterProvider, $stateProvider)=>{
    //默认路由
    $urlRouterProvider.otherwise(function ($injector) {
        var $state = $injector.get("$state");

        $state.go('home');
    });
};