/**
 * Created by NICK on 15/6/8.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Factory = (function () {
        function Factory() {
        }
        return Factory;
    }());
    Factory._name = 'GiftInterceptorFactory';
    Factory.factory = [function () {
            return {
                'response': function (response) {
                    var win;
                    if (response.data && response.status == 200) {
                        if (response.data.url) {
                            win = window.open();
                            win.location.href = response.data.url;
                        }
                    }
                    return response;
                }
            };
        }];
    exports.Factory = Factory;
});
//# sourceMappingURL=gift_response_service.js.map