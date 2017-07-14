/**
 * Created by NICK on 15/10/30.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */

import ref = require('ref');

export var init = ($q:ng.IQService, $cookieStore, Permission, passportService, config)=> {
    Permission.defineRole('anonymous', ($stateParams)=> {
        if (!$cookieStore.get(config.prefix + 'access_token')) {
            return true;
        }
        return false;
    });
};