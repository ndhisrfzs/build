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
            .state('home.interface', {
            url: 'interfaces',
            data: {
                permissions: {
                    except: ['anonymous'],
                    only: ['user']
                }
            },
            views: {
                'content_main': {
                    templateUrl: 'js/partials/controllers/common/manager.html',
                    controller: 'InterfaceManagerController',
                    controllerAs: 'managerCtl'
                }
            }
        });
    };
});
//# sourceMappingURL=interfaces.js.map