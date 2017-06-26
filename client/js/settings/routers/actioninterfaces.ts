/**
 * Created by NICK on 15/10/30.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */


import ref = require('ref');

export var init = ($urlRouterProvider, $stateProvider)=> {
    $stateProvider
        .state('home.actioninterface', {
            url: 'actioninterfaces/:menuId/:menuTitle/:actId/:actTitle',
            data: {
                permissions: {
                    except: ['anonymous'],
                    only: ['user']
                }
            },
            views: {
                'content_main': {
                    templateUrl: 'js/partials/controllers/common/manager.html',
                    controller: 'ActionInterfaceManagerController',
                    controllerAs: 'managerCtl'
                }
            }
        });
};