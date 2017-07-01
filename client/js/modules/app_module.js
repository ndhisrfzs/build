/**
 * Created by NICK on 15/10/13.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */
define(["require", "exports", "settings/settings", "module"], function (require, exports, setting, config) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AppModule = (function () {
        function AppModule(name) {
            this.deps = config.config();
            this.module = angular.module(name, this.deps);
            this.config();
            this.run();
        }
        AppModule.prototype.config = function () {
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
                }
            ]);
        };
        AppModule.prototype.run = function () {
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
                function ($rootScope, $state, $stateParams, $q, $cookieStore, config, Permission, passportService, Restangular) {
                    $rootScope.$state = $state;
                    $rootScope.$stateParams = $stateParams;
                    setting.settings.initRoles($q, $cookieStore, Permission, passportService, config);
                    setting.settings.initRest(Restangular, $cookieStore, config.prefix);
                }
            ]);
        };
        return AppModule;
    }());
    exports.module = new AppModule('app_module').module;
});
//# sourceMappingURL=app_module.js.map