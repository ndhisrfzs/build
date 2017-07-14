/**
 * Created by NICK on 15/7/10.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['tv4', 'validator'], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        // CommonJS. Define export.
        module.exports = factory(require('tv4'), require('validator'));
    } else {
        // Browser globals
        global.tv4Format = factory(global.tv4, global.validator);
    }
}(this, function (tv4, validator) {
    //邮箱验证
    tv4.tv4.addFormat('email', function (data, schema) {
        if (validator.isEmail(data)) {
            return null;
        }
        return 10000;
    });
    //手机验证
    tv4.tv4.addFormat('mobile', function (data, schema) {
        if (validator.isMobilePhone(data, 'zh-CN')) {
            return null;
        }

        return 10003;
    });
    //手机验证
    tv4.tv4.addFormat('json', function (data, schema) {
        if (validator.isJSON(data)) {
            return null;
        }

        return 10004;
    });
}));
