/**
 * Created by NICK on 15/10/13.
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
define(["require", "exports", "../../node_modules/nick_common_static/common/directives/directives", "directives/root_directive"], function (require, exports, common, root) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //import sidemenu = require('directives/sidemenu_directive');
    var Directives = (function (_super) {
        __extends(Directives, _super);
        function Directives(module) {
            var _this = _super.call(this, module) || this;
            module.directive(root.Directive._name, root.Directive.directive);
            return _this;
            //module.directive(sidemenu.SideMenuDirective._name, sidemenu.SideMenuDirective.directive);
            //module.directive(sidemenu.SideMenuChildDirective._name, sidemenu.SideMenuChildDirective.directive);
            //module.directive(sidemenu.SideMenuContentTransclude._name, sidemenu.SideMenuContentTransclude.directive);
            //
            //module.provider(sidemenu.mdSideMenuSections._name, sidemenu.mdSideMenuSections.provider);
            //module.directive(sidemenu.mdStyleDirective._name, sidemenu.mdStyleDirective.directive);
            //module.factory(sidemenu.mdSideMenuFactory._name, sidemenu.mdSideMenuFactory.factory);
        }
        return Directives;
    }(common.Directives));
    exports.Directives = Directives;
});
//# sourceMappingURL=directives.js.map