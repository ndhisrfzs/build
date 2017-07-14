var async = require('async');
var Promise = require('bluebird');
var _ = require('lodash');

module.exports = function(Actorgroup) {
    Actorgroup.saveAll = function (aorId, datas, next) {
        var gas = [];

        _.forEach(datas, function (data) {
            gas.push(data);
        });
        async.auto({
            trans: function (cb) {
                Actorgroup.beginTransaction({isolationLevel: Actorgroup.Transaction.READ_COMMITTED}, cb);
            },
            delete: ['trans', function (cb, results) {
                Actorgroup.dataSource.connector.execute('delete from actorgroup where aorId=?', [aorId], {transaction: results.trans}, cb);
            }],
            insert: ['trans', 'delete', function (cb, results) {
                Actorgroup.create(gas, cb);
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
    Actorgroup.remoteMethod(
        'saveAll', {
            accepts: [
                {arg: 'aorId', type: 'number', required: true},
                {arg: 'datas', type: 'object', http: {source: 'body'}}
            ],
            returns: {root: true, type: 'object'},
            http: {verb: 'post', path: '/save/:aorId'}
        }
    );
};
