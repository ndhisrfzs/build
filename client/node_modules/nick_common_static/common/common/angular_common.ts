/**
 * Created by NICK on 15/9/16.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */


import ref = require('ref');
import angular = require('angular');

/*
 * controller的基类
 * */
export class AngularCommon {
    public static conName:string;

    public $rootScope:ng.IRootScopeService;
    public $scope:ng.IScope;
    public $q:ng.IQService;
    public $http:ng.IHttpService;

    constructor(args:IArguments) {
        this.initInvoke(this.constructor.$inject, args);
    }

    initInvoke($inject:Array<string>, args:IArguments) {
        var _this = this;

        angular.forEach($inject, function (value, key) {
            _this[value] = args[key];
        });
    }
}