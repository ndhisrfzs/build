var async = require('async');
var app = require('../../server/server');

module.exports = function (Menu) {

//    Menu.beforeCreate = function (next, modelInstance) {
//        modelInstance.createAt = Date.now();
//        modelInstance.updateAt = Date.now();
//        next();
//    }
//
//    Menu.beforeUpdate = function (next, modelInstance) {
//        modelInstance.updateAt = Date.now();
//        next();
//    };

    Menu.disableRemoteMethod("create", true);
    Menu.disableRemoteMethod("deleteById", true);

    /*
     * 获取所有菜单
     * @param next 回调
     * */
    Menu.getAll = function (req, next) {
	async.auto({
	    person: [function (cb) {
            app.models.person.findOne({
                    where: {
                        userToken: req.query.user_token
                    }
                }, cb);
		    //Menu.dataSource.connector.execute("select * from permiss.person where userToken=?", [req.query.user_token], cb);
        }],
	    check_person: ['person', function(cb, results){
		var aorid = 3;
/*
	    if(req.query.agent_level == 0){
		aorid = 10;
	    } else if(req.query.agent_level == 1){
		aorid = 8;
	    } else if(req.query.agent_level == 2){
		aorid = 9;
	    }
*/
            if(aorid > 0 && req.query.user_token != null && results.person == null){
                Menu.dataSource.connector.execute("insert into person(aorid, nickname,userToken) values(?, ?, ?)", [aorid, req.query.username, req.query.user_token], cb);
            } else {
                cb(null, null);
            }
	    }],
	    allmenu:['check_person', function(cb, results){
            var sql = [];

            sql.push('SELECT node.*,(count(parent.menuId)-1) as depth');
            sql.push('  FROM menu as node, menu as parent');
            sql.push('  where node.lft between parent.lft and parent.rgt');
            sql.push('  and node.menuId in (select node.menuId from menu as node');
            sql.push('  inner join action as act on act.menuId = node.menuId');
            sql.push('  where act.actKey="view" and act.actId in (SELECT ga.actId FROM person as user');
            sql.push('  inner join actor as act on user.aorId = act.aorId');
            sql.push('  inner join actorgroup as actg on act.aorId = actg.aorId');
            sql.push('  inner join groupaction as ga on actg.groupId = ga.groupId');
            sql.push('  where  user.userToken=?))');
            sql.push('  group by node.menuId');
            sql.push('  order by node.lft');

	//        sql.push('SELECT node.*,(count(parent.menuId)-1) as depth');
	//        sql.push('  FROM permiss.Menu as node, permiss.Menu as parent');
	//        sql.push('  where node.lft between parent.lft and parent.rgt');
	//        sql.push('  group by node.menuId');
	//        sql.push('  order by node.lft;');
		    Menu.dataSource.connector.execute(sql.join(''), [req.query.user_token], cb);
	    }]
	}, function finish(err, results) {
            if (err) {
                next(err);
            } else {
                next(null, results.allmenu);
            }
        });
    };
    Menu.remoteMethod(
        'getAll', {
            accepts: [
                {arg: 'req', type: 'object', http: {source: 'req'}}
            ],
            returns: {root: true, type: 'object'},
            http: {verb: 'get', path: '/all'}
        }
    );

    /*
     * 添加一个菜单
     * @param data 数据模型
     * @param next 回调
     * */
    Menu.add = function (data, next) {
        var err;

        if (typeof data !== 'object') {
            err = new Error('数据没有填写完整!');
            err.status = 400;
            next(err);
            return;
        }
        async.auto({
            trans: function (cb) {
                Menu.beginTransaction({isolationLevel: Menu.Transaction.READ_COMMITTED}, cb);
            },
            parent: [function (cb) {
                Menu.findById(data.menuParentId || 0, cb);
            }],
            count: [function (cb) {
                Menu.count({'lft': 1}, cb);
            }],
            check: ['parent', 'count', function (cb, results) {
                if (results.count && !results.parent) {
                    var err = new Error('没有指定父级节点!');
                    err.status = 400;
                    cb(err);
                } else {
                    cb(null, null);
                }
            }],
            lft: ['check', 'parent', 'trans', function (cb, results) {
                if (results.parent) {
                    Menu.dataSource.connector.execute('update menu set lft=lft+2 where lft > ?;', [results.parent.rgt], {transaction: results.trans}, cb);
                } else {
                    cb(null, null);
                }
            }],
            rgt: ['check', 'parent', 'trans', function (cb, results) {
                if (results.parent) {
                    Menu.dataSource.connector.execute('update menu set rgt=rgt+2 where rgt >= ?;', [results.parent.rgt], {transaction: results.trans}, cb);
                } else {
                    cb(null, null);
                }
            }],
            add: ['lft', 'rgt', 'parent', 'count', function (cb, results) {
                if (!results.parent && !results.count) {
                    data.lft = 1;
                    data.rgt = 2;
                } else {
                    data.lft = results.parent.rgt;
                    data.rgt = results.parent.rgt + 1;
                }
                Menu.create(data, {transaction: results.trans}, cb);
            }],
            commit: ['add', 'trans', function (cb, results) {
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
                next(null, results.add);
            }
        });
    };
    Menu.remoteMethod(
        'add', {
            accepts: [
                {arg: 'data', type: 'object', http: {source: 'body'}}
            ],
            returns: {root: true, type: 'object'},
            http: {verb: 'post'}
        }
    );
    /*
     * 删除一个菜单
     * @param id ID
     * @param next 回调
     * */
    Menu.remove1 = function (id, next) {
        var err;

        if (typeof id !== 'number') {
            err = new Error('请填写正确的ID!');
            err.status = 400;
            next(err);
            return;
        }

        async.auto({
            model: function (cb) {
                Menu.findById(id, cb);
            },
//            children: ['model', function (cb, results) {
//                if (results.model) {
//                    Menu.find({
//                        where: {
//                            lft: {gt: results.model.lft},
//                            rgt: {lt: results.model.rgt}
//                        }
//                    }, cb);
//                } else {
//                    err = new Error('没有找到数据!');
//                    err.status = 400;
//                    cb(err);
//                }
//            }],
//            check1: ['model', 'children', function (cb, results) {
//                if (results.children.length) {
//                    err = new Error('此节点下存在子节点,不能删除!');
//                    err.status = 400;
//                    cb(err);
//                } else {
//                    cb();
//                }
//            }],
            trans: ['model', function (cb) {
                Menu.beginTransaction({isolationLevel: Menu.Transaction.READ_COMMITTED}, cb);
            }],
            del: ['trans', function (cb, results) {
//                Menu.destroyById(id, {transaction: results.trans}, cb);
                Menu.dataSource.connector.execute('delete from menu where lft between ? and ?;', [results.model.lft, results.model.rgt], {transaction: results.trans}, cb);
            }],
            lft: ['del', 'trans', 'model', function (cb, results) {
                Menu.dataSource.connector.execute('update menu set lft=lft-? where lft > ?;', [results.model.rgt - results.model.lft + 1, results.model.rgt], {transaction: results.trans}, cb);
            }],
            rgt: ['del', 'trans', 'model', function (cb, results) {
                Menu.dataSource.connector.execute('update menu set rgt=rgt-? where rgt > ?;', [results.model.rgt - results.model.lft + 1, results.model.rgt], {transaction: results.trans}, cb);
            }],
            commit: ['lft', 'rgt', function (cb, results) {
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
                next(null, results.model);
            }
        });
    };
    Menu.remoteMethod(
        'remove1', {
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: {root: true, type: 'object'},
            http: {verb: 'delete', path: '/:id'}
        }
    );
};
