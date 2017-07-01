/**
 * Created by NICK on 15/10/30.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */


import ref = require('ref');

export var init = ($mdThemingProvider:angular.material.IThemingProvider)=>{
    $mdThemingProvider.theme('white-cyan').primaryPalette('blue', {
        'default': '700'
    });
    //$mdThemingProvider.alwaysWatchTheme(true);
};