var async = require('async');
var Promise = require('bluebird');
var _ = require('lodash');

module.exports = function (Server) {
    Server.setDefault = function (id, next) {
        async.auto({
            trans: function (cb) {
                Server.beginTransaction({isolationLevel: Server.Transaction.READ_COMMITTED}, cb);
            },
            delete: ['trans', function (cb, results) {
                Server.dataSource.connector.execute('update server set isDefault=false', [], {transaction: results.trans}, cb);
            }],
            insert: ['trans', 'delete', function (cb, results) {
                Server.dataSource.connector.execute('update server set isDefault=true where serID=?', [id], {transaction: results.trans}, cb);
            }],
            commit: ['insert', function (cb, results) {
                results.trans.commit(cb);
            }]
        }, function finish(err, results) {
            if (err) {
                next(err);
                return;
            }
            next(null, null);
        });

    };

    Server.remoteMethod(
        'setDefault', {
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: {root: true, type: 'object'},
            http: {verb: 'post', path: '/:id/set_default'}
        }
    );
};
