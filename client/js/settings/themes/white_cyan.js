/**
 * Created by NICK on 15/10/30.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.init = function ($mdThemingProvider) {
        $mdThemingProvider.theme('white-cyan').primaryPalette('blue', {
            'default': '700'
        });
        //$mdThemingProvider.alwaysWatchTheme(true);
    };
});
//# sourceMappingURL=white_cyan.js.map