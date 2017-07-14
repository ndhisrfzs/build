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
define(["require", "exports", "../../node_modules/nick_common_static/common/common/controller/base_material_controller", "../../node_modules/nick_common_static/common/models/passport/user_model"], function (require, exports, common, userModel) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Directive = (function (_super) {
        __extends(Directive, _super);
        function Directive() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Directive;
    }(common.BaseController));
    Directive._name = "root";
    Directive.directive = ['$rootScope', '$timeout', '$state', 'config', '$cookieStore', '$mdSidenav', '$mdToast', '$mdUtil', '$mdDialog', function ($rootScope, $timeout, $state, config, $cookieStore, $mdSidenav, $mdToast, $mdUtil, $mdDialog) {
            var directive = {}, con;
            common.BaseController.$inject = ['$rootScope', '$timeout', '$state', 'config', '$cookieStore', '$mdSidenav', '$mdToast', '$mdUtil'];
            con = new common.BaseController(arguments);
            directive.link = function ($scope) {
                /**
                 * Supplies a function that will continue to operate until the
                 * time is up.
                 */
                function debounce(func, wait, context) {
                    var timer;
                    return function debounced() {
                        var context = $scope, args = Array.prototype.slice.call(arguments);
                        $timeout.cancel(timer);
                        timer = $timeout(function () {
                            timer = undefined;
                            func.apply(context, args);
                        }, wait || 10);
                    };
                }
                /**
                 * Build handler to open/close a SideNav; when animation finishes
                 * report completion in console
                 */
                function buildDelayedToggler(navID) {
                    return debounce(function () {
                        $mdSidenav(navID)
                            .toggle()
                            .then(function () {
                            //$log.debug("toggle " + navID + " is done");
                        });
                    }, 200, null);
                }
                function buildToggler(navID) {
                    return function () {
                        $mdSidenav(navID)
                            .toggle()
                            .then(function () {
                            //$log.debug("toggle " + navID + " is done");
                        });
                    };
                }
                $rootScope.doOpenMenu = buildToggler('left');
                $rootScope.doOpenRightMenu = buildToggler('right');
                $rootScope.$on("userIntercepted", function (state, ename, data) {
                    //清除登录标志
                    $cookieStore.remove(config.prefix + 'access_token');
                    $cookieStore.remove(config.prefix + 'refresh_token');
                    $mdDialog.cancel(null);
                    $state.go('account');
                });
                //当前登录的用户信息
                $rootScope.user = new userModel.Passport.UserModel({
                    username: '',
                    nickname: '未设置',
                    agent_level: -1
                });
                //更新用户信息
                $rootScope.$on('userInfo', function (event, data) {
                    //for (var k in data) {
                    //    if ($rootScope.user.hasOwnProperty(k)) {
                    //        data[k] && ($rootScope.user[k] = data[k]);
                    //    }
                    //}
                    $rootScope.user.username = data.role_info.username;
                    $rootScope.user.nickname = data.role_info.nichen;
                    $rootScope.user.agent_level = data.role_info.agent_level;
                    //$rootScope.user.avatarUrl = data.avatar_url;
                    //$rootScope.user.email = data.email;
                    //$rootScope.user.mobile = data.mobile;
                    //$rootScope.user.userToken = data.user_token;
                });
                $rootScope.$on('showError', function (state, ename, data) {
                    con.showErrMsg(data);
                });
                $rootScope.isEmptyObject = function (obj) {
                    for (var name in obj) {
                        return false;
                    }
                    return true;
                };
            };
            return directive;
        }];
    exports.Directive = Directive;
});
//# sourceMappingURL=root_directive.js.map