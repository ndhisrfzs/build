/**
 * Created by NICK on 15/10/30.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */


import ref = require('ref');

export var init = ($urlRouterProvider, $stateProvider)=> {
    $stateProvider.state('home', {
        url: '/',
        data: {
            permissions: {
                except: ['anonymous'],
                only: ['user']
            }
        },
        views: {
            '': {
                templateUrl: 'js/partials/controllers/home/index.html',
                controller: 'HomeIndexController',
                controllerAs: 'homeIndexCtl',
            },
            'sidenav_right@home': {
                templateUrl: 'js/partials/controllers/home/sidenav_right.html',
                controller: 'HomeSideNavRightController',
                controllerAs: 'sidenavrightCtl'
            },
            'sidenav_left@home': {
                templateUrl: 'js/partials/controllers/home/sidenav_left.html',
                controller: 'HomeSideNavLeftController',
                controllerAs: 'homeSideNavCtl'
            },
            'content_main@home': {
                templateUrl: 'js/partials/controllers/home/content.html'
            }
        }
    });

};