/**
 * Created by NICK on 15/10/30.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */


import ref  = require('ref');
import defaultRouter = require('settings/routers/default');
import homeRouter = require('settings/routers/home');
//import menuRouter = require('settings/routers/menus');
//import actionRouter = require('settings/routers/actions');
import loginRouter = require('settings/routers/login');
//import groupRouter = require('settings/routers/groups');
//import genreRouter = require('settings/routers/genres');
//import actorRouter = require('settings/routers/actors');
//import personRouter = require('settings/routers/persons');
//import interfaceRouter = require('settings/routers/interfaces');
//import schemaRouter = require('settings/routers/schemas');
//import actioninterfaceRouter = require('settings/routers/actioninterfaces');
import pageRouter = require('settings/routers/pages');

import anonymousUser = require('settings/roles/anonymous');
import userUser = require('settings/roles/user');

import defaultTheme = require('settings/themes/blue');
import darkTheme = require('settings/themes/dark');
import whiteCyanTheme = require('settings/themes/white_cyan');
import amazingTheme = require('settings/themes/amazing');

class Settings {
    /*路由配置*/
    initRouter($urlRouterProvider, $stateProvider) {
        defaultRouter.init.apply(this, arguments);
        homeRouter.init.apply(this, arguments);
        //menuRouter.init.apply(this, arguments);
        //actionRouter.init.apply(this, arguments);
        loginRouter.init.apply(this, arguments);
        pageRouter.init.apply(this, arguments);
        //groupRouter.init.apply(this, arguments);
        //genreRouter.init.apply(this, arguments);
        //actorRouter.init.apply(this, arguments);
        //personRouter.init.apply(this, arguments);
        //interfaceRouter.init.apply(this, arguments);
        //actioninterfaceRouter.init.apply(this, arguments);
        //schemaRouter.init.apply(this, arguments);
    }

    initRest(Restangular, $cookieStore, prefix) {
        Restangular.setBaseUrl('/api');
        Restangular.addFullRequestInterceptor((element, operation, what, url, headers, params, httpConfig)=> {
            //Restangular.setDefaultRequestParams({access_token: $cookieStore.get(prefix + 'access_token')});
            Restangular.setDefaultRequestParams({
                access_token: $cookieStore.get(prefix + 'access_token'),
                user_token: $cookieStore.get(prefix + 'user_token')
            });
            return {
                //element:element,
                //operation:operation,
                //what:what,
                //url:url
            };
        });
    }

    /*
    * 处理shcmeaform的自定义组件
    * */
    initSchemaForm(schemaFormDecoratorsProvider, schemaFormProvider, sfPathProvider){
        schemaFormDecoratorsProvider.addMapping('materialDecorator', 'jsoneditor', 'js/partials/decorator/material/jsoneditor.html');
        schemaFormDecoratorsProvider.addMapping('materialDecorator', 'datetimepicker', 'js/partials/decorator/material/datetimepicker.html');
        schemaFormDecoratorsProvider.addMapping('materialDecorator', 'datepicker', 'js/partials/decorator/material/datepicker.html');
        schemaFormDecoratorsProvider.addMapping('materialDecorator', 'uploader', 'js/partials/decorator/material/uploader.html');
        schemaFormDecoratorsProvider.addMapping('materialDecorator', 'uploader-single', 'js/partials/decorator/material/uploader-single.html');
        schemaFormDecoratorsProvider.addMapping('materialDecorator', 'linkbutton', 'js/partials/decorator/material/linkbutton.html');
    }

    /*http的初始化*/
    initHttpInfo($httpProvider:ng.IHttpProvider) {
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        // Override $http service's default transformRequest
        $httpProvider.defaults['transformRequest'] = [function (data) {
            /**
             * The workhorse; converts an object to x-www-form-urlencoded serialization.
             * @param {Object} obj
             * @return {String}
             */
            var param = function (obj) {
                var query = '';
                var name, value, fullSubName, subName, subValue, innerObj, i;

                for (name in obj) {
                    value = obj[name];

                    if (value instanceof Date) {
                        var newDate = new Date();
                        query += encodeURIComponent(name) + '='
                            + value.toISOString() + '&';
                            //+ '\/Date(' + value.getTime() + '-0000)\/' + '&';
                    }
                    else if (value instanceof Array) {
                        for (i = 0; i < value.length; ++i) {
                            subValue = value[i];
                            fullSubName = name + '[' + i + ']';
                            //fullSubName = name + '[]';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    } else if (value instanceof Object) {
                        for (subName in value) {
                            subValue = value[subName];
                            fullSubName = name + '[' + subName + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    } else if (value !== undefined && value !== null) {
                        query += encodeURIComponent(name) + '='
                            + encodeURIComponent(value) + '&';
                    }
                }

                return query.length ? query.substr(0, query.length - 1) : query;
            };

            return angular.isObject(data) && String(data) !== '[object File]'
                ? param(data)
                : data;
        }];
        //添加http拦截器
        $httpProvider.interceptors.push('HttpInterceptorFactory');
        //下载gift文件
        //$httpProvider.interceptors.push('GiftInterceptorFactory');
    }

    /*错误信息初始化*/
    initMessage(sfErrorMessage) {
        sfErrorMessage.setDefaultMessage(10000, '邮箱格式不正确');
        sfErrorMessage.setDefaultMessage(10001, '两次密码不一致');
        sfErrorMessage.setDefaultMessage(10002, '用户名中存在非法字符');
        sfErrorMessage.setDefaultMessage(10003, '手机格式不正确');
        sfErrorMessage.setDefaultMessage(10004, 'JSON格式不正确');
        sfErrorMessage.setDefaultMessage(302, '[{{title}}]是必填项');
        sfErrorMessage.setDefaultMessage('url', '[{{title}}]格式不正确');
        sfErrorMessage.setDefaultMessage('103', '[{{title}}]超过了最大值{{schema.maximum}}');
        sfErrorMessage.setDefaultMessage('101', '[{{title}}]小于最小值{{schema.minimum}}');
        sfErrorMessage.setDefaultMessage('200', '[{{title}}]字符长度小于最小值({{schema.minLength}})');
        sfErrorMessage.setDefaultMessage('201', '[{{title}}]字符长度大于最大值({{schema.maxLength}})');

    }

    /*角色配置*/
    initRoles($q:ng.IQService, $cookieStore, Permission, passportService, config) {
        anonymousUser.init.apply(this, arguments);
        userUser.init.apply(this, arguments);
    }

    /*ngMaterial默认配置*/
    initMdTheme($mdThemingProvider:angular.material.IThemingProvider,mdSideMenuSectionsProvider) {
        defaultTheme.init.apply(this, arguments);
        darkTheme.init.apply(this, arguments);
        whiteCyanTheme.init.apply(this, arguments);
        amazingTheme.init.apply(this, arguments);
        mdSideMenuSectionsProvider.initWithTheme($mdThemingProvider);
    }
}

export var settings = new Settings();