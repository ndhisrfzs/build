/**
 * Created by NICK on 15/10/30.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.init = function ($urlRouterProvider, $stateProvider) {
        $stateProvider
            .state('home.command', {
            url: 'command/:key',
            data: {
                permissions: {
                    except: ['anonymous'],
                    only: ['user']
                }
            },
            views: {
                'content_main': {
                    templateUrl: 'js/partials/controllers/common/command.html',
                    controller: 'PageManagerController',
                    controllerAs: 'managerCtl'
                }
            }
        })
            .state('home.info', {
            url: 'info/:key',
            data: {
                permissions: {
                    except: ['anonymous'],
                    only: ['user']
                }
            },
            views: {
                'content_main': {
                    templateUrl: 'js/partials/controllers/common/info.html',
                    controller: 'PageManagerController',
                    controllerAs: 'managerCtl'
                }
            }
        })
            .state('home.page', {
            url: 'pages/:key',
            data: {
                permissions: {
                    except: ['anonymous'],
                    only: ['user']
                }
            },
            views: {
                'content_main': {
                    templateUrl: 'js/partials/controllers/common/manager.html',
                    controller: 'PageManagerController',
                    controllerAs: 'managerCtl'
                }
            }
        })
            .state('home.page1', {
            url: 'pages/:key/:one',
            data: {
                permissions: {
                    except: ['anonymous'],
                    only: ['user']
                }
            },
            views: {
                'content_main': {
                    templateUrl: 'js/partials/controllers/common/manager.html',
                    controller: 'PageManagerController',
                    controllerAs: 'managerCtl'
                }
            }
        })
            .state('home.page2', {
            url: 'pages/:key/:one/:two',
            data: {
                permissions: {
                    except: ['anonymous'],
                    only: ['user']
                }
            },
            views: {
                'content_main': {
                    templateUrl: 'js/partials/controllers/common/manager.html',
                    controller: 'PageManagerController',
                    controllerAs: 'managerCtl'
                }
            }
        })
            .state('home.page3', {
            url: 'pages/:key/:one/:two/:three',
            data: {
                permissions: {
                    except: ['anonymous'],
                    only: ['user']
                }
            },
            views: {
                'content_main': {
                    templateUrl: 'js/partials/controllers/common/manager.html',
                    controller: 'PageManagerController',
                    controllerAs: 'managerCtl'
                }
            }
        })
            .state('home.page4', {
            url: 'pages/:key/:one/:two/:three/:four',
            data: {
                permissions: {
                    except: ['anonymous'],
                    only: ['user']
                }
            },
            views: {
                'content_main': {
                    templateUrl: 'js/partials/controllers/common/manager.html',
                    controller: 'PageManagerController',
                    controllerAs: 'managerCtl'
                }
            }
        });
    };
});
//# sourceMappingURL=pages.js.map