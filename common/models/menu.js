var async=require("async"),app=require("../../server/server");module.exports=function(a){a.disableRemoteMethod("create",!0),a.disableRemoteMethod("deleteById",!0),a.getAll=function(b,c){async.auto({person:[function(a){app.models.person.findOne({where:{userToken:b.query.user_token}},a)}],check_person:["person",function(c,d){null!=b.query.user_token&&null==d.person?a.dataSource.connector.execute("insert into person(aorid, nickname,userToken) values(9, ?, ?)",[b.query.user_token,b.query.user_token],c):c(null,null)}],allmenu:["check_person",function(c,d){var e=[];e.push("SELECT node.*,(count(parent.menuId)-1) as depth"),e.push("  FROM permiss.menu as node, permiss.menu as parent"),e.push("  where node.lft between parent.lft and parent.rgt"),e.push("  and node.menuId in (select node.menuId from menu as node"),e.push("  inner join permiss.action as act on act.menuId = node.menuId"),e.push('  where act.actKey="view" and act.actId in (SELECT ga.actId FROM permiss.person as user'),e.push("  inner join actor as act on user.aorId = act.aorId"),e.push("  inner join actorgroup as actg on act.aorId = actg.aorId"),e.push("  inner join groupaction as ga on actg.groupId = ga.groupId"),e.push("  where  user.userToken=?))"),e.push("  group by node.menuId"),e.push("  order by node.lft"),a.dataSource.connector.execute(e.join(""),[b.query.user_token],c)}]},function(a,b){a?c(a):c(null,b.allmenu)})},a.remoteMethod("getAll",{accepts:[{arg:"req",type:"object",http:{source:"req"}}],returns:{root:!0,type:"object"},http:{verb:"get",path:"/all"}}),a.add=function(b,c){var d;return"object"!=typeof b?(d=new Error("数据没有填写完整!"),d.status=400,void c(d)):void async.auto({trans:function(b){a.beginTransaction({isolationLevel:a.Transaction.READ_COMMITTED},b)},parent:[function(c){a.findById(b.menuParentId||0,c)}],count:[function(b){a.count({lft:1},b)}],check:["parent","count",function(a,b){if(b.count&&!b.parent){var c=new Error("没有指定父级节点!");c.status=400,a(c)}else a(null,null)}],lft:["check","parent","trans",function(b,c){c.parent?a.dataSource.connector.execute("update menu set lft=lft+2 where lft > ?;",[c.parent.rgt],{transaction:c.trans},b):b(null,null)}],rgt:["check","parent","trans",function(b,c){c.parent?a.dataSource.connector.execute("update menu set rgt=rgt+2 where rgt >= ?;",[c.parent.rgt],{transaction:c.trans},b):b(null,null)}],add:["lft","rgt","parent","count",function(c,d){d.parent||d.count?(b.lft=d.parent.rgt,b.rgt=d.parent.rgt+1):(b.lft=1,b.rgt=2),a.create(b,{transaction:d.trans},c)}],commit:["add","trans",function(a,b){b.trans.commit(a)}]},function(a,b){a?b.trans?b.trans.rollback(function(){c(a)}):c(a):c(null,b.add)})},a.remoteMethod("add",{accepts:[{arg:"data",type:"object",http:{source:"body"}}],returns:{root:!0,type:"object"},http:{verb:"post"}}),a.remove1=function(b,c){var d;return"number"!=typeof b?(d=new Error("请填写正确的ID!"),d.status=400,void c(d)):void async.auto({model:function(c){a.findById(b,c)},trans:["model",function(b){a.beginTransaction({isolationLevel:a.Transaction.READ_COMMITTED},b)}],del:["trans",function(b,c){a.dataSource.connector.execute("delete from menu where lft between ? and ?;",[c.model.lft,c.model.rgt],{transaction:c.trans},b)}],lft:["del","trans","model",function(b,c){a.dataSource.connector.execute("update menu set lft=lft-? where lft > ?;",[c.model.rgt-c.model.lft+1,c.model.rgt],{transaction:c.trans},b)}],rgt:["del","trans","model",function(b,c){a.dataSource.connector.execute("update menu set rgt=rgt-? where rgt > ?;",[c.model.rgt-c.model.lft+1,c.model.rgt],{transaction:c.trans},b)}],commit:["lft","rgt",function(a,b){b.trans.commit(a)}]},function(a,b){a?b.trans?b.trans.rollback(function(){c(a)}):c(a):c(null,b.model)})},a.remoteMethod("remove1",{accepts:[{arg:"id",type:"number",required:!0}],returns:{root:!0,type:"object"},http:{verb:"delete",path:"/:id"}})};