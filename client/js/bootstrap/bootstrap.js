/**
 * Created by NICK on 15/6/5.
 * email:nick121212@126.com
 * copyright NICK
 */
define(["require", "exports", "angular", "modules/app_module", "services/services", "controllers/controllers", "directives/directives", "../../node_modules/nick_common_static/common/filters/filters"], function (require, exports, angular, appModule, services, controller, directive, filter) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var init = function () {
        new services.Services(appModule.module);
        new controller.Controllers(appModule.module);
        new directive.Directives(appModule.module);
        new filter.Filters(appModule.module);
        /*
         * 启动angular
         * */
        angular.bootstrap(document, [appModule.module.name]);
    };
    init();
});
//# sourceMappingURL=bootstrap.js.map