/**
 * Created by NICK on 15/10/30.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */


import ref = require('ref');

export var init = ($urlRouterProvider, $stateProvider)=> {
    $stateProvider
        .state('account', {
            url: '/account',
            data: {
                permissions: {
                    only: ['anonymous']
                }
            },
            views: {
                '': {
                    templateUrl: 'js/partials/account/index.html',
                },
                'accountView@account': {
                    templateUrl: 'js/partials/account/login.html',
                    controller: 'LoginController',
                    controllerAs: 'loginCtl'
                }
            }
        })
        .state('account.forget_email', {
            url: '/forget_email',
            data: {
                permissions: {
                    only: ['anonymous']
                }
            },
            views: {
                'accountView@account': {
                    templateUrl: 'js/partials/account/forget_email.html',
                    controller: 'ForgetEmailController',
                    controllerAs: 'forgetCtl'
                }
            }
        })
        .state('account.forget_phone', {
            url: '/forget_phone',
            data: {
                permissions: {
                    only: ['anonymous']
                }
            },
            views: {
                'accountView@account': {
                    templateUrl: 'js/partials/account/forget_phone.html',
                    controller: 'ForgetPhoneController',
                    controllerAs: 'forgetCtl'
                }
            }
        })
        .state('account.register', {
            url: '/register',
            data: {
                permissions: {
                    only: ['anonymous']
                }
            },
            views: {
                'accountView@account': {
                    templateUrl: 'js/partials/account/register.html',
                    controller: 'RegisterController',
                    controllerAs: 'regCtl',
                }
            }
        });
};