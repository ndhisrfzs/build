module.exports=function(a){a.getAll=function(b,c,d){var e=[];e.push(" select act.* from action as act"),e.push(" inner join menu as menu on menu.menuId = act.menuId"),e.push(" where menu.menuKey =?"),e.push(" and act.actId in (SELECT ga.actId FROM person as user"),e.push(" inner join actor as act on user.aorId = act.aorId"),e.push(" inner join actorgroup as actg on act.aorId = actg.aorId"),e.push(" inner join groupaction as ga on actg.groupId = ga.groupId"),e.push(" where  user.userToken=?)"),a.dataSource.connector.execute(e.join(""),[c,b.query.user_token],d)},a.remoteMethod("getAll",{accepts:[{arg:"req",type:"object",http:{source:"req"}},{arg:"key",type:"string",required:!0}],returns:{root:!0,type:"object"},http:{verb:"get",path:"/:key/all"}})};