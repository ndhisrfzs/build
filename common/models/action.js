module.exports = function (Action) {
    Action.getAll = function (req, key, next) {
        var sql = [];

//        sqls.push('SELECT ga.actId FROM permiss.person as user');
//        sqls.push(' inner join actor as act on user.aorId = act.aorId');
//        sqls.push(' inner join actorgroup as actg on act.aorId = actg.aorId');
//        sqls.push(' inner join groupaction as ga on actg.groupId = ga.groupId');
//        sqls.push(' where user.userToken=?');

        sql.push(' select act.* from action as act');
        sql.push(' inner join menu as menu on menu.menuId = act.menuId');
        sql.push(' where menu.menuKey =?');
        sql.push(' and act.actId in (SELECT ga.actId FROM person as user');
        sql.push(' inner join actor as act on user.aorId = act.aorId');
        sql.push(' inner join actorgroup as actg on act.aorId = actg.aorId');
        sql.push(' inner join groupaction as ga on actg.groupId = ga.groupId');
        sql.push(' where  user.userToken=?)');

        Action.dataSource.connector.execute(sql.join(''), [key, req.query.user_token], next);
    };

    Action.remoteMethod(
        'getAll', {
            accepts: [
                {arg: 'req', type: 'object', http: {source: 'req'}},
                {arg: 'key', type: 'string', required: true}
            ],
            returns: {root: true, type: 'object'},
            http: {verb: 'get', path: '/:key/all'}
        }
    );
};
