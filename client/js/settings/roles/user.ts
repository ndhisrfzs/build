/**
 * Created by NICK on 15/10/30.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */

import ref = require('ref');

export var init = ($q:ng.IQService, $cookieStore, Permission, passportService, config)=> {
    Permission.defineRole('user', function () {
        var deferred = $q.defer();

        passportService.getUser().success(function (data) {
            deferred.resolve();
        }).error(function () {
            deferred.reject();
        });

        return deferred.promise;
    });
};