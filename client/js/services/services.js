/**
 * Created by NICK on 15/9/2.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "../../node_modules/nick_common_static/common/services/services", "services/gift_response_service"], function (require, exports, commonService, gift) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Services = (function (_super) {
        __extends(Services, _super);
        function Services(module) {
            var _this = _super.call(this, module) || this;
            module.factory(gift.Factory._name, gift.Factory.factory);
            return _this;
        }
        return Services;
    }(commonService.Services));
    exports.Services = Services;
});
//# sourceMappingURL=services.js.map