var async = require('async');
var Promise = require('bluebird');
var _ = require('lodash');

module.exports = function (Groupaction) {
    Groupaction.saveAll = function (groupId, datas, next) {
        var gas = [];

        _.forEach(datas, function (data) {
            gas.push(data);
        });
        async.auto({
            trans: function (cb) {
                Groupaction.beginTransaction({isolationLevel: Groupaction.Transaction.READ_COMMITTED}, cb);
            },
            delete: ['trans', function (cb, results) {
                Groupaction.dataSource.connector.execute('delete from groupaction where groupId=?', [groupId], {transaction: results.trans}, cb);
            }],
            insert: ['trans', 'delete', function (cb, results) {
                Groupaction.create(gas, cb);
            }],
            commit: ['insert', function (cb, results) {
                results.trans.commit(cb);
            }]
        }, function finish(err, results) {
            if (err) {
                if (results.trans) {
                    results.trans.rollback(function () {
                        next(err);
                    });
                } else {
                    next(err);
                }
            } else {
                next(null, results.insert);
            }
        });

    };
    Groupaction.remoteMethod(
        'saveAll', {
            accepts: [
                {arg: 'groupId', type: 'number', required: true},
                {arg: 'datas', type: 'object', http: {source: 'body'}}
            ],
            returns: {root: true, type: 'object'},
            http: {verb: 'post', path: '/save/:groupId'}
        }
    );
};
