/**
 * Created by NICK on 15/10/13.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */

import ref = require('ref');
import common = require('../../node_modules/nick_common_static/common/common/controller/base_material_controller');
import userModel = require('../../node_modules/nick_common_static/common/models/passport/user_model');

export class Directive extends common.BaseController {
    public static _name:string = "root";

    public static directive:Array<any> = ['$rootScope', '$timeout', '$state', 'config', '$cookieStore', '$mdSidenav', '$mdToast', '$mdUtil', '$mdDialog', ($rootScope, $timeout, $state, config, $cookieStore, $mdSidenav, $mdToast, $mdUtil, $mdDialog) => {
        var directive:ng.IDirective = {}, con;

        common.BaseController.$inject = ['$rootScope', '$timeout', '$state', 'config', '$cookieStore', '$mdSidenav', '$mdToast', '$mdUtil'];
        con = new common.BaseController(arguments);

        directive.link = ($scope)=> {
            /**
             * Supplies a function that will continue to operate until the
             * time is up.
             */
            function debounce(func, wait, context) {
                var timer;
                return function debounced() {
                    var context = $scope,
                        args = Array.prototype.slice.call(arguments);
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
                }
            }

            $rootScope.doOpenMenu = buildToggler('left');
            $rootScope.doOpenRightMenu = buildToggler('right');
            $rootScope.$on("userIntercepted", (state, ename, data)=> {
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
            $rootScope.$on('userInfo', (event, data) => {
                //for (var k in data) {
                //    if ($rootScope.user.hasOwnProperty(k)) {
                //        data[k] && ($rootScope.user[k] = data[k]);
                //    }
                //}
                $rootScope.user.username = data.role_info.username
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
            }
        };

        return directive;
    }];
}