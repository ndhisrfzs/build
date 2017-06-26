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
            .state('home.group', {
            url: 'groups',
            data: {
                permissions: {
                    except: ['anonymous'],
                    only: ['user']
                }
            },
            views: {
                'content_main': {
                    templateUrl: 'js/partials/controllers/permission/groups/manager.html',
                    controller: 'GroupManagerController',
                    controllerAs: 'managerCtl'
                }
            }
        });
    };
});
//# sourceMappingURL=groups.js.map