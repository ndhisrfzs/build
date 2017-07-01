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
            .state('home.action', {
            url: 'actions/:menuId/:menuTitle',
            data: {
                permissions: {
                    except: ['anonymous'],
                    only: ['user']
                }
            },
            views: {
                'content_main': {
                    templateUrl: 'js/partials/controllers/permission/actions/manager.html',
                    controller: 'ActionManagerController',
                    controllerAs: 'managerCtl'
                }
            }
        });
    };
});
//# sourceMappingURL=actions.js.map