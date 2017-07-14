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
define(["require", "exports", "../../node_modules/nick_common_static/common/services/services"], function (require, exports, commonService) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //import gift = require('services/gift_response_service');
    var Services = (function (_super) {
        __extends(Services, _super);
        function Services(module) {
            return _super.call(this, module) || this;
            //module.factory(gift.Factory._name, gift.Factory.factory);
        }
        return Services;
    }(commonService.Services));
    exports.Services = Services;
});
//# sourceMappingURL=services.js.map