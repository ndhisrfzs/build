var winston = require('winston');
var _ = require('lodash');

module.exports = function () {
    return function logger(req, res, next) {
        res.once('finish', function () {
            winston.log('info', '后台日志', _.extend({
                timestamp: Date.now(),
                pid: process.pid,
                url: req.baseUrl,
                method: req.method,
                body: JSON.stringify(req.body),
                status: res.statusCode
            }, req.query));
        });
        next();
    };
};