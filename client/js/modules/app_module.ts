/**
 * Created by NICK on 15/10/13.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */

import ref = require('ref');
import setting = require('settings/settings');
import config = require('module');

class AppModule {
    public module:ng.IModule;
    public deps:Array<string> = config.config();

    constructor(name:string) {
        this.module = angular.module(name, this.deps);
        this.config();
        this.run();
    }

    config() {
        var _this = this;

        _this.module.config([
            '$stateProvider',
            '$urlRouterProvider',
            '$httpProvider',
            '$mdThemingProvider',
            '$mdDateLocaleProvider',
            'sfErrorMessageProvider',
            'schemaFormDecoratorsProvider',
            'schemaFormProvider',
            'sfPathProvider',
            'mdSideMenuSectionsProvider',
            function ($stateProvider, $urlRouterProvider, $httpProvider, $mdThemingProvider, $mdDateLocaleProvider, sfErrorMessageProvider, schemaFormDecoratorsProvider, schemaFormProvider, sfPathProvider, mdSideMenuSectionsProvider) {

                setting.settings.initSchemaForm(schemaFormDecoratorsProvider, schemaFormProvider, sfPathProvider);

                setting.settings.initRouter($urlRouterProvider, $stateProvider);
                setting.settings.initHttpInfo($httpProvider);
                setting.settings.initMessage(sfErrorMessageProvider);
                setting.settings.initMdTheme($mdThemingProvider, mdSideMenuSectionsProvider);
            }]);
    }

    run() {
        var _this = this;

        _this.module.run([
            '$rootScope',
            '$state',
            '$stateParams',
            '$q',
            '$cookieStore',
            'config',
            'Permission',
            'PassportService',
            'Restangular',
            ($rootScope, $state, $stateParams, $q, $cookieStore, config, Permission, passportService, Restangular) => {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
                setting.settings.initRoles($q, $cookieStore, Permission, passportService, config);
                setting.settings.initRest(Restangular, $cookieStore, config.prefix);
            }
        ]);
    }


}

export var module = new AppModule('app_module').module;